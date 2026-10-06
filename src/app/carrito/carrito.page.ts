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
import { RouterModule } from '@angular/router'; // Importación necesaria para que funcione el routerLink
import { addIcons } from 'ionicons';
import { 
  trashOutline, 
  cartOutline, 
  homeOutline, 
  calendarOutline, 
  personOutline, 
  chevronBackOutline, 
  constructOutline, 
  waterOutline 
} from 'ionicons/icons';

// Decorador @Component: Aquí le decimos a Angular cómo construir esta pantalla
@Component({
  selector: 'app-carrito', // Nombre de la etiqueta del componente, traducido al español
  templateUrl: './carrito.page.html', // Enlace al archivo HTML del diseño visual
  styleUrls: ['./carrito.page.scss'], // Enlace al archivo de estilos visuales
  standalone: true, // Indica que no necesita declararse en un módulo tradicional (Angular moderno)
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
    RouterModule // Importante: Permite navegar usando los botones inferiores y superiores
  ]
})
export class CarritoPage implements OnInit { // Nombre de la clase traducido a CarritoPage
  
  // El constructor se ejecuta en el momento exacto en que se abre esta pantalla
  constructor() { 
    // Registramos todos los iconos que se usan en tu diseño HTML
    addIcons({ 
      trashOutline, 
      cartOutline, 
      homeOutline, 
      calendarOutline, 
      personOutline, 
      chevronBackOutline, 
      constructOutline, 
      waterOutline 
    });
  }

  // ngOnInit es parte del ciclo de vida de Angular; se ejecuta justo después del constructor
  ngOnInit() {
    // Lo dejamos vacío porque, por ahora, nuestra pantalla es un diseño estático
    // Más adelante aquí podrías cargar datos desde una base de datos si fuera necesario
  }

}