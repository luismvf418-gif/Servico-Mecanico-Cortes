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
import { RouterModule } from '@angular/router'; // Conservado para el funcionamiento de los routerLink
import { addIcons } from 'ionicons';

// Importación de todos los iconos utilizados en la vista de vehículos
import { 
  chevronBackOutline, 
  carOutline, 
  addOutline, 
  chevronForwardOutline, 
  homeOutline, 
  cartOutline, 
  calendarOutline, 
  personOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-vehiculos', // Selector actualizado a español
  templateUrl: './vehiculos.page.html', // Enlace al HTML estático traducido
  styleUrls: ['./vehiculos.page.scss'], // Enlace al SCSS traducido
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
export class VehiculosPage implements OnInit {

  // El constructor registra los iconos necesarios para que la vista los renderice correctamente
  constructor() {
    addIcons({ 
      chevronBackOutline, 
      carOutline, 
      addOutline, 
      chevronForwardOutline, 
      homeOutline, 
      cartOutline, 
      calendarOutline, 
      personOutline 
    });
  }

  ngOnInit() {
    // Componente limpio enfocado en el mockup visual estático
  }

  /* 
   * NOTA DE LIMPIEZA:
   * 1. Se eliminó la inyección de `VehicleService` y `Router`, así como la propiedad `vehicles`.
   * 2. Se removieron los métodos dinámicos (`loadVehicles`, `selectVehicle`, `goToAddVehicle`).
   * 3. Toda la navegación entre pantallas y el diseño se gestionan de forma estática mediante los atributos `routerLink` en el HTML.
   */
}