import { Component, inject } from '@angular/core';
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
  personOutline,
  chevronBackOutline,
  chevronForwardOutline,
  carOutline,
  calendarOutline,
  cardOutline,
  logOutOutline,
  homeOutline,
  cartOutline,
} from 'ionicons/icons';
import { TallerService } from '../core/services/taller';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
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
export class PerfilPage {
  private tallerService = inject(TallerService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  opcionesPerfil = [
    { titulo: 'Mis automóviles', icono: 'car-outline', ruta: '/vehiculos' },
    { titulo: 'Historial de citas', icono: 'calendar-outline', ruta: '/citas-lista' },
    { titulo: 'Métodos de pago', icono: 'card-outline', ruta: '/metodo-pago' },
  ];

  constructor() {
    addIcons({
      personOutline,
      chevronBackOutline,
      chevronForwardOutline,
      carOutline,
      calendarOutline,
      cardOutline,
      logOutOutline,
      homeOutline,
      cartOutline,
    });
  }

  get nombreCompleto(): string {
    const u = this.tallerService.getUsuarioActual();
    if (!u) return 'Carlos Cortés';
    return `${u.nombre} ${u.apellido_paterno} ${u.apellido_materno || ''}`.trim();
  }

  get correoUsuario(): string {
    return this.tallerService.getUsuarioActual()?.correo || 'carlos.cortes@email.com';
  }

  get telefonoUsuario(): string {
    return this.tallerService.getUsuarioActual()?.telefono || '+52 55 1234 5678';
  }

  async cerrarSesion() {
    this.tallerService.cerrarSesion();

    const toast = await this.toastCtrl.create({
      message: 'Sesión cerrada correctamente.',
      duration: 1800,
      color: 'dark',
    });
    await toast.present();

    this.router.navigateByUrl('/iniciar-sesion', { replaceUrl: true });
  }
}