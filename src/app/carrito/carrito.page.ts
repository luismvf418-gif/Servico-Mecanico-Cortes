import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
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
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  trashOutline,
  cartOutline,
  homeOutline,
  calendarOutline,
  personOutline,
  chevronBackOutline,
  constructOutline,
  waterOutline,
  discOutline,
  speedometerOutline,
} from 'ionicons/icons';
import { TallerService, Servicio } from '../core/services/taller';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
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
export class CarritoPage {
  private tallerService = inject(TallerService);

  constructor() {
    addIcons({
      trashOutline,
      cartOutline,
      homeOutline,
      calendarOutline,
      personOutline,
      chevronBackOutline,
      constructOutline,
      waterOutline,
      discOutline,
      speedometerOutline,
    });
  }

  get items(): Servicio[] {
    return this.tallerService.getCarrito();
  }

  get total(): number {
    return this.tallerService.getTotalCarrito();
  }

  eliminar(id_servicio: number): void {
    this.tallerService.eliminarDelCarrito(id_servicio);
  }
}