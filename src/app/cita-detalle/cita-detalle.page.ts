import { Component, inject } from '@angular/core';
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
  AlertController,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  carOutline,
  calendarOutline,
  constructOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  documentTextOutline,
  homeOutline,
  cartOutline,
  personOutline,
  cardOutline,
} from 'ionicons/icons';
import { TallerService, Cita } from '../core/services/taller';

@Component({
  selector: 'app-cita-detalle',
  templateUrl: './cita-detalle.page.html',
  styleUrls: ['./cita-detalle.page.scss'],
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
export class CitaDetallePage {
  private tallerService = inject(TallerService);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);

  constructor() {
    addIcons({
      chevronBackOutline,
      carOutline,
      calendarOutline,
      constructOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      documentTextOutline,
      homeOutline,
      cartOutline,
      personOutline,
      cardOutline,
    });
  }

  get cita(): Cita | null {
    return this.tallerService.getCitaDetalle() || this.tallerService.getCitas()[0] || null;
  }

  get subtotal(): number {
    return this.cita ? this.cita.total : 0;
  }

  get iva(): number {
    return this.subtotal * 0.16;
  }

  get totalEstimado(): number {
    return this.subtotal + this.iva;
  }

  formatearEstado(estado: Cita['estado']): string {
    const mapa: Record<Cita['estado'], string> = {
      PENDIENTE: 'Pendiente',
      CONFIRMADA: 'Confirmada',
      COMPLETADA: 'Completada',
      CANCELADA: 'Cancelada',
    };
    return mapa[estado] || estado;
  }

  async cancelarCita() {
    if (!this.cita) return;

    const alerta = await this.alertCtrl.create({
      header: 'Cancelar cita',
      message: '¿Estás seguro de que deseas cancelar esta cita?',
      buttons: [
        { text: 'No, mantener', role: 'cancel' },
        {
          text: 'Sí, cancelar',
          role: 'destructive',
          handler: async () => {
            if (this.cita) {
              this.cita.estado = 'CANCELADA';
            }
            const toast = await this.toastCtrl.create({
              message: 'La cita ha sido cancelada.',
              duration: 2000,
              color: 'medium',
            });
            await toast.present();
            this.router.navigateByUrl('/citas-lista');
          },
        },
      ],
    });

    await alerta.present();
  }
}