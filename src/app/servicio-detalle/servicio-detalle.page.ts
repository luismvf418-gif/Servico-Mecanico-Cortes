import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonButton, 
  IonIcon, 
  IonTitle 
} from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Conservado para el funcionamiento de los routerLink en el HTML
import { addIcons } from 'ionicons';

// Importación de todos los iconos utilizados en la vista de detalle del servicio
import { 
  chevronBackOutline, 
  constructOutline, 
  pricetagOutline, 
  timeOutline, 
  carOutline, 
  funnelOutline, 
  flashOutline, 
  documentTextOutline, 
  cartOutline, 
  homeOutline, 
  calendarOutline, 
  personOutline,
  waterOutline,
  shieldOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-servicio-detalle', // Selector actualizado a español
  templateUrl: './servicio-detalle.page.html', // Enlace al HTML estático traducido
  styleUrls: ['./servicio-detalle.page.scss'], // Enlace al SCSS traducido
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonButton, 
    IonIcon, 
    IonTitle,
    RouterModule
  ]
})
export class ServicioDetallePage implements OnInit {

  // El constructor registra los iconos necesarios para que la vista los renderice correctamente
  constructor() {
    addIcons({ 
      chevronBackOutline, 
      constructOutline, 
      pricetagOutline, 
      timeOutline, 
      carOutline, 
      funnelOutline, 
      flashOutline, 
      documentTextOutline, 
      cartOutline, 
      homeOutline, 
      calendarOutline, 
      personOutline,
      waterOutline,
      shieldOutline
    });
  }

  ngOnInit() {
    // Componente limpio enfocado en el mockup visual estático
  }

  /* 
   * NOTA DE LIMPIEZA:
   * 1. Se eliminaron el arreglo `allServices`, la propiedad `service`, así como las inyecciones de `ActivatedRoute`, `Router` y `CartService`.
   * 2. Se removieron los métodos dinámicos (`addToCart`, `goToCart`).
   * 3. Toda la navegación entre pantallas y el diseño se gestionan de forma estática mediante los atributos `routerLink` en el HTML.
   */
}