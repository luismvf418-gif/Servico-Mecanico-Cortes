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
  IonSearchbar, 
  IonTitle 
} from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  searchOutline, 
  cartOutline, 
  constructOutline, 
  waterOutline, 
  shieldOutline, 
  carOutline, 
  chevronBackOutline, 
  homeOutline, 
  calendarOutline, 
  personOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-services', // Se mantiene el selector original
  templateUrl: './services.page.html', // Enlace al HTML estático adaptado
  styleUrls: ['./services.page.scss'], // Enlace al SCSS adaptado
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
    IonSearchbar,
    IonTitle,
    RouterModule
  ]
})
export class ServicesPage implements OnInit {

  constructor() {
    // Registro de todos los iconos utilizados en esta vista
    addIcons({ 
      searchOutline, 
      cartOutline, 
      constructOutline, 
      waterOutline, 
      shieldOutline, 
      carOutline, 
      chevronBackOutline,
      homeOutline,
      calendarOutline,
      personOutline
    });
  }

  ngOnInit() {
    // Componente limpio enfocado en el mockup visual estático
  }

  /* 
   * NOTA DE LIMPIEZA:
   * 1. Se eliminó la inyección de `CartService` y `Router`.
   * 2. Se removieron las variables de estado (`selectedCategory`, `searchQuery`, `servicesList`) 
   *    y los métodos dinámicos (`filterCategory`, `addToCart`, `goToCart`, `filteredServices`).
   * 3. La navegación se maneja directamente en el HTML mediante atributos `routerLink`.
   */
}