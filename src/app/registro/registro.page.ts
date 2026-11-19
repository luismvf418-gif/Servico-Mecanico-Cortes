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

    this.tallerService.registrarUsuario({
      nombre: this.nombre.trim(),
      apellido_paterno: this.apellido_paterno.trim(),
      apellido_materno: this.apellido_materno.trim(),
      correo: this.correo.trim(),
      telefono: this.telefono.trim(),
    });

    this.router.navigateByUrl('/inicio', { replaceUrl: true });
  }
}