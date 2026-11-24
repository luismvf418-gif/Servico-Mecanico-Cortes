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
  LoadingController,
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
  private loadingCtrl = inject(LoadingController);

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
        duration: 2200,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Autenticando con el servidor...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const usuario = await this.tallerService.iniciarSesionApi(
        this.correo.trim(),
        this.contrasena.trim()
      );
      await loading.dismiss();

      const toast = await this.toastCtrl.create({
        message: `Bienvenido, ${usuario.nombre}`,
        duration: 1800,
        color: 'success',
      });
      await toast.present();

      this.router.navigateByUrl('/inicio', { replaceUrl: true });
    } catch (error: any) {
      await loading.dismiss();
      const mensajeError =
        error?.status === 401
          ? 'Credenciales inválidas en la API.'
          : error?.message || 'Error al conectar con el servidor.';

      const toast = await this.toastCtrl.create({
        message: mensajeError,
        duration: 2800,
        color: 'danger',
      });
      await toast.present();
    }
  }

  async recuperarContrasena() {
    if (!this.correo.trim()) {
      const toast = await this.toastCtrl.create({
        message: 'Escribe tu correo arriba para enviar el enlace de recuperación.',
        duration: 2500,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    const toast = await this.toastCtrl.create({
      message: `Se enviaron instrucciones de recuperación a ${this.correo.trim()}.`,
      duration: 2500,
      color: 'dark',
    });
    await toast.present();
  }
}