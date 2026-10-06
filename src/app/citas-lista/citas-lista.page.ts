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
import { RouterModule } from '@angular/router'; // Conservado para la barra de navegación y las tarjetas
import { addIcons } from 'ionicons';

// Importamos todos los iconos exactos de tu diseño
import { 
  chevronBackOutline, 
  carOutline, 
  constructOutline, 
  calendarOutline, 
  timeOutline, 
  chevronForwardOutline, 
  homeOutline, 
  cartOutline, 
  personOutline,
  checkmarkCircle,
  time
} from 'ionicons/icons';

@Component({
  selector: 'app-citas-lista', // Traducido al español
  templateUrl: './citas-lista.page.html', // Enlace al HTML que ya hicimos estático
  styleUrls: ['./citas-lista.page.scss'], // Enlace al SCSS que acabamos de traducir
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
export class CitaListaPage implements OnInit {
  
  // El constructor se dedica exclusivamente a registrar los iconos de Ionic
  constructor() {
    addIcons({ 
      chevronBackOutline, 
      carOutline, 
      constructOutline, 
      calendarOutline, 
      timeOutline, 
      chevronForwardOutline, 
      homeOutline, 
      cartOutline, 
      personOutline,
      checkmarkCircle,
      time
    });
  }

  ngOnInit() {
    // La lógica ha sido removida porque tu HTML ahora funciona como un diseño estático
  }

  /* 
   * NOTA DE SEGURIDAD Y LIMPIEZA:
   * 1. Se eliminó la inyección de `AppointmentsService` y `Router`.
   * 2. Se eliminaron las variables `activeTab`, `upcomingAppointments` e `historyAppointments`.
   * 3. Las funciones `selectAppointment()`, `segmentChanged()` y `goToNewAppointment()` 
   *    fueron borradas. La navegación ahora se maneja de forma segura y directa 
   *    en el HTML mediante atributos `routerLink`, tal como lo definimos en el paso anterior.
   */
}