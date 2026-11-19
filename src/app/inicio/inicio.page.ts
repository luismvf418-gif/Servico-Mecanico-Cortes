import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  constructOutline,
  calendarOutline,
  cartOutline,
  chevronForwardOutline,
  homeOutline,
  personOutline,
  carOutline,
} from 'ionicons/icons';
import { TallerService } from '../core/services/taller';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [RouterLink, IonContent, IonHeader, IonToolbar, IonIcon],
})
export class InicioPage {
  private tallerService = inject(TallerService);

  opcionesMenu = [
    {
      titulo: 'Servicios',
      descripcion: 'Conoce nuestros servicios automotrices',
      icono: 'construct-outline',
      ruta: '/servicios',
    },
    {
      titulo: 'Mis automóviles',
      descripcion: 'Administra tus vehículos',
      icono: 'car-outline',
      ruta: '/vehiculos',
    },
    {
      titulo: 'Mis citas',
      descripcion: 'Consulta y agenda tus citas',
      icono: 'calendar-outline',
      ruta: '/citas-lista',
    },
    {
      titulo: 'Carrito',
      descripcion: 'Revisa tus servicios y productos',
      icono: 'cart-outline',
      ruta: '/carrito',
    },
  ];

  constructor() {
    addIcons({
      constructOutline,
      calendarOutline,
      cartOutline,
      chevronForwardOutline,
      homeOutline,
      personOutline,
      carOutline,
    });
  }

  get nombreUsuario(): string {
    return this.tallerService.getUsuarioActual()?.nombre || 'Usuario';
  }

  get cantidadCarrito(): number {
    return this.tallerService.getCarrito().length;
  }
}