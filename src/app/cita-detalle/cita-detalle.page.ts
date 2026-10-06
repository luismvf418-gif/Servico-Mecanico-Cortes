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
import { RouterModule } from '@angular/router'; // Se conserva para la navegación de la barra inferior
import { addIcons } from 'ionicons';

// Importamos todos los iconos que usa tu vista HTML
import { 
  chevronBackOutline, 
  carOutline, 
  calendarOutline, 
  constructOutline, 
  checkmarkCircleOutline, 
  timeOutline,
  homeOutline, 
  cartOutline, 
  personOutline,
  copyOutline,
  alertCircleOutline,
  cardOutline
} from 'ionicons/icons';

// Decorador que conecta este archivo TS con su respectivo HTML y SCSS
@Component({
  selector: 'app-cita-detalle', // Nombre del componente en español
  templateUrl: './cita-detalle.page.html', // Archivo visual
  styleUrls: ['./cita-detalle.page.scss'], // Archivo de estilos
  standalone: true, // Angular moderno: no requiere un módulo padre
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
    RouterModule // Necesario para que el routerLink del HTML funcione
  ]
})
export class CitaDetallePage implements OnInit { // Clase traducida a CitaDetallePage
  
  // El constructor se ejecuta al abrir la página y carga los recursos básicos
  constructor() { 
    // Registramos globalmente en este componente los iconos de Ionic
    addIcons({ 
      chevronBackOutline, 
      carOutline, 
      calendarOutline, 
      constructOutline, 
      checkmarkCircleOutline, 
      timeOutline,
      homeOutline, 
      cartOutline, 
      personOutline,
      copyOutline,
      alertCircleOutline,
      cardOutline
    });
  }

  // Se ejecuta inmediatamente después del constructor
  ngOnInit() {
    // Lo dejamos vacío, ya que el HTML ahora es 100% estático y no necesita cargar datos de inicio
  }

  /* 
   * NOTA SOBRE EL BOTÓN DE CANCELAR:
   * El botón "Cancelar cita" en tu HTML ahora es solo visual (quitamos el (click)="cancelAppointment()").
   * Por lo tanto, también eliminamos la función cancelAppointment() de aquí para evitar
   * errores relacionados con la inyección del Router o el AppointmentsService que acabamos de quitar.
   */
}