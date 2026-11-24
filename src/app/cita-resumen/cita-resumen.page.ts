import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonTitle,
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  carOutline,
  calendarOutline,
  cardOutline,
  constructOutline,
  informationCircleOutline,
  checkmarkCircleOutline,
  homeOutline,
  cartOutline,
  personOutline,
  copyOutline,
  receiptOutline,
} from 'ionicons/icons';
import { TallerService, Vehiculo, Servicio, Cita } from '../core/services/taller';
import { PagoService, ResultadoPago } from '../core/services/pago';

@Component({
  selector: 'app-cita-resumen',
  templateUrl: './cita-resumen.page.html',
  styleUrls: ['./cita-resumen.page.scss'],
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonTitle,
  ],
})
export class CitaResumenPage implements OnInit {
  private tallerService = inject(TallerService);
  private pagoService = inject(PagoService);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  private alertCtrl = inject(AlertController);
  private router = inject(Router);

  estaConfirmada: boolean = false;
  folioGenerado: string = '';
  citaConfirmada: Cita | null = null;
  resultadoPago: ResultadoPago | null = null;
  totalConfirmado: number = 0;

  constructor() {
    addIcons({
      chevronBackOutline,
      carOutline,
      calendarOutline,
      cardOutline,
      constructOutline,
      informationCircleOutline,
      checkmarkCircleOutline,
      homeOutline,
      cartOutline,
      personOutline,
      copyOutline,
      receiptOutline,
    });
  }

  ngOnInit() {
    const lista = this.tallerService.getVehiculos();
    if (!this.tallerService.getVehiculoSeleccionado() && lista.length > 0) {
      this.tallerService.seleccionarVehiculo(lista[0]);
    }
  }

  get vehiculoSeleccionado(): Vehiculo | null {
    return this.tallerService.getVehiculoSeleccionado();
  }

  get itemsCarrito(): Servicio[] {
    return this.tallerService.getCarrito();
  }

  get metodoPago(): string {
    return this.tallerService.getMetodoPago();
  }

  get fechaFormateada(): string {
    const fecha = this.tallerService.getFechaCita();
    if (!fecha) return 'Por confirmar en taller';
    return fecha.split('•')[0].trim();
  }

  get horaFormateada(): string {
    const fecha = this.tallerService.getFechaCita();
    if (!fecha || !fecha.includes('•')) return '';
    return fecha.split('•')[1].trim();
  }

  obtenerSubtotal(): number {
    return this.tallerService.getTotalCarrito();
  }

  obtenerIva(): number {
    return this.obtenerSubtotal() * 0.16;
  }

  obtenerTotal(): number {
    return this.obtenerSubtotal() + this.obtenerIva();
  }

  async confirmarCita() {
    if (!this.vehiculoSeleccionado || this.itemsCarrito.length === 0) {
      const toast = await this.toastCtrl.create({
        message: 'Asegúrate de tener un vehículo y al menos un servicio en el carrito.',
        duration: 2200,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    const totalConIva = this.obtenerTotal();

    const loading = await this.loadingCtrl.create({
      message: 'Procesando pago con pasarela Sandbox...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const pago = await this.pagoService.procesarPagoSandbox(
        this.metodoPago,
        totalConIva
      );
      await loading.dismiss();

      // Manejo de estado FALLO
      if (pago.estado === 'FALLO') {
        const alert = await this.alertCtrl.create({
          header: 'Pago rechazado (Fallo)',
          subHeader: `Folio intento: ${pago.folioRecibo}`,
          message: pago.mensaje,
          buttons: [
            { text: 'Reintentar', role: 'cancel' },
            {
              text: 'Cambiar método',
              handler: () => this.router.navigateByUrl('/metodo-pago'),
            },
          ],
        });
        await alert.present();
        return;
      }

      // Estados EXITO o PENDIENTE confirman la cita con su comprobante
      const nuevaCita = this.tallerService.confirmarCita(pago);

      if (nuevaCita) {
        this.citaConfirmada = nuevaCita;
        this.resultadoPago = pago;
        this.totalConfirmado = totalConIva;
        this.folioGenerado = `AC-2026-${nuevaCita.id_cita}`;
        this.estaConfirmada = true;
      }
    } catch {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Error de comunicación con la pasarela de pago.',
        duration: 2500,
        color: 'danger',
      });
      await toast.present();
    }
  }

  async copiarFolio() {
    if (!this.folioGenerado) return;
    const texto = this.resultadoPago
      ? `${this.folioGenerado} | Recibo: ${this.resultadoPago.folioRecibo}`
      : this.folioGenerado;
    navigator.clipboard?.writeText(texto);

    const toast = await this.toastCtrl.create({
      message: `Comprobante copiado: ${texto}`,
      duration: 1800,
      color: 'dark',
    });
    await toast.present();
  }
}