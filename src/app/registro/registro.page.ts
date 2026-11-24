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
  callOutline,
  personOutline,
  eyeOutline,
  eyeOffOutline,
  arrowForwardOutline,
} from 'ionicons/icons';
import { TallerService } from '../core/services/taller';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
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
export class RegistroPage {
  correo: string = '';
  contrasena: string = '';
  telefono: string = '';
  nombre: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  verContrasena: boolean = false;

  private router = inject(Router);
  private tallerService = inject(TallerService);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  constructor() {
    addIcons({
      mailOutline,
      lockClosedOutline,
      callOutline,
      personOutline,
      eyeOutline,
      eyeOffOutline,
      arrowForwardOutline,
    });
  }

  async onRegister() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !this.correo.trim() ||
      !this.contrasena.trim() ||
      !this.nombre.trim() ||
      !this.apellido_paterno.trim()
    ) {
      const toast = await this.toastCtrl.create({
        message: 'Completa correo, contraseña, nombre y apellido paterno.',
        duration: 2500,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    if (!emailRegex.test(this.correo.trim())) {
      const toast = await this.toastCtrl.create({
        message: 'Ingresa un correo electrónico válido.',
        duration: 2500,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    if (this.contrasena.trim().length < 6) {
      const toast = await this.toastCtrl.create({
        message: 'La contraseña debe tener al menos 6 caracteres.',
        duration: 2500,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Registrando cuenta en la API...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      await this.tallerService.registrarUsuarioApi({
        nombre: this.nombre.trim(),
        apellido_paterno: this.apellido_paterno.trim(),
        apellido_materno: this.apellido_materno.trim(),
        correo: this.correo.trim(),
        telefono: this.telefono.trim(),
        contrasena: this.contrasena.trim(),
      });

      await loading.dismiss();

      const toast = await this.toastCtrl.create({
        message: 'Cuenta creada exitosamente.',
        duration: 2000,
        color: 'success',
      });
      await toast.present();

      this.router.navigateByUrl('/inicio', { replaceUrl: true });
    } catch (error: any) {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: error?.message || 'No se pudo completar el registro.',
        duration: 2800,
        color: 'danger',
      });
      await toast.present();
    }
  }
}