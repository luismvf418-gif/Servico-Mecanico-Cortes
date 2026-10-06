import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonIcon 
} from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Necesario para que funcionen los routerLink en el HTML
import { addIcons } from 'ionicons';

// Importamos todos los iconos que utiliza la vista de inicio
import { 
  constructOutline, 
  calendarOutline, 
  cartOutline, 
  chevronForwardOutline, 
  homeOutline, 
  personOutline,
  carOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-inicio', // Selector actualizado a español
  templateUrl: './inicio.page.html', // Enlace al HTML estático traducido
  styleUrls: ['./inicio.page.scss'], // Enlace al SCSS traducido
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonIcon,
    RouterModule
  ]
})
export class InicioPage implements OnInit { // Clase principal renombrada a InicioPage

  // El constructor registra los iconos necesarios para que la vista los renderice correctamente
  constructor() {
    addIcons({ 
      constructOutline, 
      calendarOutline, 
      cartOutline, 
      chevronForwardOutline, 
      homeOutline, 
      personOutline,
      carOutline 
    });
  }

  ngOnInit() {
    // Componente estático enfocado en el diseño visual, sin lógica adicional requerida
  }
}