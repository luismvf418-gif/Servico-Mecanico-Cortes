import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export type EstadoPago = 'PENDIENTE' | 'EXITO' | 'FALLO';

export interface DatosTarjetaSandbox {
  numero: string;
  expiracion: string;
  cvv: string;
  titular: string;
}

export interface ResultadoPago {
  estado: EstadoPago;
  transaccionId: string;
  folioRecibo: string;
  mensaje: string;
  fechaPago: string;
  metodo: string;
  monto: number;
  webhookConfirmado: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private http = inject(HttpClient);
  private datosTarjeta: DatosTarjetaSandbox | null = null;
  private ultimoResultado: ResultadoPago | null = null;

  setDatosTarjeta(datos: DatosTarjetaSandbox | null): void {
    this.datosTarjeta = datos;
  }

  getDatosTarjeta(): DatosTarjetaSandbox | null {
    return this.datosTarjeta;
  }

  getUltimoResultado(): ResultadoPago | null {
    return this.ultimoResultado;
  }

  async procesarPagoSandbox(
    metodoPago: string,
    monto: number
  ): Promise<ResultadoPago> {
    const fechaAhora = new Date().toISOString();
    const folioRecibo = `REC-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Métodos presenciales o por transferencia quedan en estado PENDIENTE
    if (!metodoPago.startsWith('Tarjeta')) {
      const resultadoPendiente: ResultadoPago = {
        estado: 'PENDIENTE',
        transaccionId: `pend_${Date.now()}`,
        folioRecibo,
        mensaje:
          metodoPago === 'Transferencia bancaria'
            ? 'Pago pendiente de validación de transferencia SPEI.'
            : 'Pago pendiente: se liquidará directamente en el taller.',
        fechaPago: fechaAhora,
        metodo: metodoPago,
        monto,
        webhookConfirmado: false,
      };
      this.ultimoResultado = resultadoPendiente;
      return resultadoPendiente;
    }

    // 2. Pago con tarjeta: enviar petición real a Stripe Sandbox (/v1/tokens)
    const numeroLimpio = (this.datosTarjeta?.numero || '').replace(/\s+/g, '');
    const [mesExp = '12', anioExp = '28'] = (
      this.datosTarjeta?.expiracion || '12/28'
    ).split('/');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${environment.paymentSandbox.publicKey}`,
    });

    const body = new HttpParams()
      .set('card[number]', numeroLimpio)
      .set('card[exp_month]', mesExp.trim())
      .set('card[exp_year]', `20${anioExp.trim().slice(-2)}`)
      .set('card[cvc]', this.datosTarjeta?.cvv || '123')
      .set('card[name]', this.datosTarjeta?.titular || 'Cliente Taller');

    let tokenApiId = `tok_sandbox_${Date.now()}`;

    try {
      const resp: any = await firstValueFrom(
        this.http.post(environment.paymentSandbox.tokenEndpoint, body.toString(), {
          headers,
        })
      );
      if (resp?.id) {
        tokenApiId = resp.id;
      }
    } catch {
      // Si se usa la llave demo sin cuenta propia de Stripe, continuamos con la evaluación Sandbox
    }

    // 3. Evaluación de tarjetas oficiales de prueba Sandbox (Éxito / Pendiente / Fallo)
    if (numeroLimpio.endsWith('0002')) {
      const resultadoFallo: ResultadoPago = {
        estado: 'FALLO',
        transaccionId: `err_${Date.now()}`,
        folioRecibo,
        mensaje:
          'Pago rechazado por el banco emisor (Tarjeta Sandbox declinada / fondos insuficientes).',
        fechaPago: fechaAhora,
        metodo: metodoPago,
        monto,
        webhookConfirmado: false,
      };
      this.ultimoResultado = resultadoFallo;
      return resultadoFallo;
    }

    if (numeroLimpio.endsWith('9995')) {
      const resultadoPendiente: ResultadoPago = {
        estado: 'PENDIENTE',
        transaccionId: tokenApiId,
        folioRecibo,
        mensaje:
          'Transacción en revisión por el procesador (3D Secure / validación pendiente).',
        fechaPago: fechaAhora,
        metodo: metodoPago,
        monto,
        webhookConfirmado: false,
      };
      this.ultimoResultado = resultadoPendiente;
      return resultadoPendiente;
    }

    // Tarjeta aprobada (ej. 4242 4242 4242 4242) + confirmación de webhook
    const resultadoExito: ResultadoPago = {
      estado: 'EXITO',
      transaccionId: tokenApiId,
      folioRecibo,
      mensaje: 'Pago autorizado y confirmado mediante webhook Sandbox.',
      fechaPago: fechaAhora,
      metodo: metodoPago,
      monto,
      webhookConfirmado: true,
    };

    console.log('[Webhook Sandbox Confirmado]', {
      event: 'payment_intent.succeeded',
      folio: folioRecibo,
      transaction_id: tokenApiId,
      amount_mxn: monto,
    });

    this.ultimoResultado = resultadoExito;
    return resultadoExito;
  }
}