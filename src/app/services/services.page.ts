import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  searchOutline,
  cartOutline,
  constructOutline,
  waterOutline,
  discOutline,
  speedometerOutline,
  shieldOutline,
  chevronBackOutline,
  homeOutline,
  calendarOutline,
  personOutline,
} from 'ionicons/icons';
import { TallerService, Servicio } from '../core/services/taller';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
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
export class ServicesPage {
  private tallerService = inject(TallerService);
  private toastCtrl = inject(ToastController);

  categorias = ['Todos', 'Motor', 'Frenos', 'Afinación', 'Suspensión'];
  categoriaActiva = 'Todos';
  busqueda = '';

  constructor() {
    addIcons({
      searchOutline,
      cartOutline,
      constructOutline,
      waterOutline,
      discOutline,
      speedometerOutline,
      shieldOutline,
      chevronBackOutline,
      homeOutline,
      calendarOutline,
      personOutline,
    });
  }

  get serviciosFiltrados(): Servicio[] {
    return this.tallerService.getServicios().filter((s) => {
      const texto = `${s.nombre_servicio} ${s.descripcion}`.toLowerCase();
      const coincideTexto = texto.includes(this.busqueda.toLowerCase().trim());

      if (this.categoriaActiva === 'Todos') return coincideTexto;
      if (this.categoriaActiva === 'Motor') {
        return coincideTexto && (texto.includes('aceite') || texto.includes('escáner') || texto.includes('motor'));
      }
      return coincideTexto && texto.includes(this.categoriaActiva.toLowerCase());
    });
  }

  async agregarAlCarrito(event: Event, servicio: Servicio) {
    event.stopPropagation();
    this.tallerService.agregarAlCarrito(servicio);

    const toast = await this.toastCtrl.create({
      message: `${servicio.nombre_servicio} agregado al carrito`,
      duration: 1800,
      color: 'success',
    });
    await toast.present();
  }
}