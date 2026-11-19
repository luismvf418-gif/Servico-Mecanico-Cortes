import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
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
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonTitle,
  ],
})
export class VehiculosPage implements OnInit {
  private tallerService = inject(TallerService);
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

  async seleccionar(vehiculo: Vehiculo) {
    this.tallerService.seleccionarVehiculo(vehiculo);
    const toast = await this.toastCtrl.create({
      message: `${vehiculo.marca} ${vehiculo.modelo} seleccionado`,
      duration: 1500,
      color: 'dark',
    });
    await toast.present();
  }
}