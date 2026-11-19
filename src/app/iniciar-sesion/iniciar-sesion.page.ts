import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  arrowForwardOutline,
} from 'ionicons/icons';
import { TallerService } from '../core/services/taller';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
  ],
})
export class IniciarSesionPage {
  correo: string = '';
  contrasena: string = '';
  verContrasena: boolean = false;

  private router = inject(Router);
  private tallerService = inject(TallerService);
  private toastCtrl = inject(ToastController);

  constructor() {
    addIcons({
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      arrowForwardOutline,
    });
  }

  async onLogin() {
    if (!this.correo.trim() || !this.contrasena.trim()) {
      const toast = await this.toastCtrl.create({
        message: 'Ingresa tu correo y contraseña para continuar.',
        duration: 2000,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    this.tallerService.iniciarSesion(this.correo.trim());
    this.router.navigateByUrl('/inicio', { replaceUrl: true });
  }

  async recuperarContrasena() {
    const toast = await this.toastCtrl.create({
      message: 'Se enviarán instrucciones de recuperación al correo registrado.',
      duration: 2500,
      color: 'dark',
    });
    await toast.present();
  }
}