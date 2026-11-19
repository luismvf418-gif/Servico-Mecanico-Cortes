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
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  metodos = [
    {
      titulo: 'Tarjeta de crédito/débito',
      descripcion: 'Pago de forma segura con tu tarjeta',
      icono: 'card-outline',
    },
    {
      titulo: 'Transferencia bancaria',
      descripcion: 'Realiza el pago desde tu banco',
      icono: 'business-outline',
    },
    {
      titulo: 'Pago en taller',
      descripcion: 'Realiza el pago al momento de tu cita',
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

  async continuar() {
    if (this.metodoSeleccionado === 'Tarjeta de crédito/débito') {
      if (
        !this.numeroTarjeta.trim() ||
        !this.expiracion.trim() ||
        !this.cvv.trim() ||
        !this.titular.trim()
      ) {
        const toast = await this.toastCtrl.create({
          message: 'Completa todos los datos de la tarjeta para continuar.',
          duration: 2200,
          color: 'warning',
        });
        await toast.present();
        return;
      }

      const digitos = this.numeroTarjeta.replace(/\s+/g, '');
      const terminacion = digitos.slice(-4);
      const etiqueta = terminacion.length === 4
        ? `Tarjeta •••• ${terminacion}`
        : 'Tarjeta de crédito/débito';

      this.tallerService.setMetodoPago(etiqueta);
    } else {
      this.tallerService.setMetodoPago(this.metodoSeleccionado);
    }

    this.router.navigateByUrl('/cita-resumen');
  }
}