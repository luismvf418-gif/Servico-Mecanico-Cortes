import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonTitle,
  NavController,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  carOutline,
  homeOutline,
  cartOutline,
  calendarOutline,
  personOutline,
} from 'ionicons/icons';
import { TallerService } from '../core/services/taller';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
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
export class AgregarVehiculoPage {
  private tallerService = inject(TallerService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);

  marca: string = '';
  modelo: string = '';
  placas: string = '';
  anio: string = '';
  kilometraje: number | null = null;
  color: string = '';

  anios: number[] = Array.from({ length: 32 }, (_, i) => 2026 - i);
  colores: string[] = ['Blanco', 'Negro', 'Gris', 'Plata', 'Rojo', 'Azul'];

  constructor() {
    addIcons({
      chevronBackOutline,
      carOutline,
      homeOutline,
      cartOutline,
      calendarOutline,
      personOutline,
    });
  }

  async guardarVehiculo() {
    if (!this.marca.trim() || !this.modelo.trim() || !this.placas.trim() || !this.anio) {
      const toast = await this.toastCtrl.create({
        message: 'Completa al menos marca, modelo, matrícula y año.',
        duration: 2200,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    this.tallerService.agregarVehiculo({
      marca: this.marca.trim(),
      modelo: this.modelo.trim(),
      placas: this.placas.trim().toUpperCase(),
      anio: Number(this.anio),
      kilometraje: this.kilometraje ? Number(this.kilometraje) : undefined,
      color: this.color || undefined,
    });

    const toast = await this.toastCtrl.create({
      message: 'Automóvil registrado correctamente.',
      duration: 1800,
      color: 'success',
    });
    await toast.present();

    this.navCtrl.back();
  }

  cancelar() {
    this.navCtrl.back();
  }
}