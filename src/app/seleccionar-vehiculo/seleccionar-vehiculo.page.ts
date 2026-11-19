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
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  carOutline,
  addOutline,
  chevronForwardOutline,
  homeOutline,
  cartOutline,
  calendarOutline,
  personOutline,
} from 'ionicons/icons';
import { TallerService, Vehiculo } from '../core/services/taller';

@Component({
  selector: 'app-seleccionar-vehiculo',
  templateUrl: './seleccionar-vehiculo.page.html',
  styleUrls: ['./seleccionar-vehiculo.page.scss'],
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
export class SeleccionarVehiculoPage implements OnInit {
  private tallerService = inject(TallerService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  constructor() {
    addIcons({
      chevronBackOutline,
      carOutline,
      addOutline,
      chevronForwardOutline,
      homeOutline,
      cartOutline,
      calendarOutline,
      personOutline,
    });
  }

  ngOnInit() {
    const lista = this.tallerService.getVehiculos();
    if (!this.tallerService.getVehiculoSeleccionado() && lista.length > 0) {
      this.tallerService.seleccionarVehiculo(lista[0]);
    }
  }

  get vehiculos(): Vehiculo[] {
    return this.tallerService.getVehiculos();
  }

  get vehiculoSeleccionado(): Vehiculo | null {
    return this.tallerService.getVehiculoSeleccionado();
  }

  seleccionar(vehiculo: Vehiculo): void {
    this.tallerService.seleccionarVehiculo(vehiculo);
  }

  async continuar() {
    if (!this.vehiculoSeleccionado) {
      const toast = await this.toastCtrl.create({
        message: 'Selecciona o registra un automóvil para continuar.',
        duration: 2000,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    this.router.navigateByUrl('/citas');
  }
}