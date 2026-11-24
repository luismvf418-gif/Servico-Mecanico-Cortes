import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  cardOutline,
  businessOutline,
  storefrontOutline,
  homeOutline,
  cartOutline,
  calendarOutline,
  personOutline,
} from 'ionicons/icons';
import { TallerService } from '../core/services/taller';
import { PagoService } from '../core/services/pago';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.page.html',
  styleUrls: ['./metodo-pago.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
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
export class MetodoPagoPage implements OnInit {
  private tallerService = inject(TallerService);
  private pagoService = inject(PagoService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  metodos = [
    {
      titulo: 'Tarjeta de crédito/débito',
      descripcion: 'Pago inmediato vía pasarela Sandbox',
      icono: 'card-outline',
    },
    {
      titulo: 'Transferencia bancaria',
      descripcion: 'Genera referencia SPEI (estado pendiente)',
      icono: 'business-outline',
    },
    {
      titulo: 'Pago en taller',
      descripcion: 'Liquida al momento de tu cita (estado pendiente)',
      icono: 'storefront-outline',
    },
  ];

  metodoSeleccionado: string = 'Tarjeta de crédito/débito';
  numeroTarjeta: string = '';
  expiracion: string = '';
  cvv: string = '';
  titular: string = '';

  constructor() {
    addIcons({
      chevronBackOutline,
      cardOutline,
      businessOutline,
      storefrontOutline,
      homeOutline,
      cartOutline,
      calendarOutline,
      personOutline,
    });
  }

  ngOnInit() {
    const actual = this.tallerService.getMetodoPago();
    if (actual.startsWith('Tarjeta')) {
      this.metodoSeleccionado = 'Tarjeta de crédito/débito';
    } else if (actual === 'Transferencia bancaria') {
      this.metodoSeleccionado = 'Transferencia bancaria';
    } else if (actual === 'Pago en taller' || actual === 'Efectivo en taller') {
      this.metodoSeleccionado = 'Pago en taller';
    }
  }

  rellenarTarjetaPrueba(tipo: 'exito' | 'pendiente' | 'fallo') {
    const tarjetas = {
      exito: '4242 4242 4242 4242',
      pendiente: '4000 0000 0000 9995',
      fallo: '4000 0000 0000 0002',
    };
    this.numeroTarjeta = tarjetas[tipo];
    this.expiracion = '12/28';
    this.cvv = '123';
    this.titular = 'Luis Mario Verastegui';
  }

  async continuar() {
    if (this.metodoSeleccionado === 'Tarjeta de crédito/débito') {
      const digitos = this.numeroTarjeta.replace(/\s+/g, '');

      if (
        digitos.length < 15 ||
        !this.expiracion.trim() ||
        this.cvv.trim().length < 3 ||
        !this.titular.trim()
      ) {
        const toast = await this.toastCtrl.create({
          message: 'Completa correctamente los datos de la tarjeta (16 dígitos, MM/AA, CVV y titular).',
          duration: 2400,
          color: 'warning',
        });
        await toast.present();
        return;
      }

      this.pagoService.setDatosTarjeta({
        numero: this.numeroTarjeta.trim(),
        expiracion: this.expiracion.trim(),
        cvv: this.cvv.trim(),
        titular: this.titular.trim(),
      });

      const terminacion = digitos.slice(-4);
      this.tallerService.setMetodoPago(`Tarjeta •••• ${terminacion}`);
    } else {
      this.pagoService.setDatosTarjeta(null);
      this.tallerService.setMetodoPago(this.metodoSeleccionado);
    }

    this.router.navigateByUrl('/cita-resumen');
  }
}