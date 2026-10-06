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
  IonTitle,
  IonDatetime,
  IonTextarea
} from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Necesario para que funcione el routerLink del HTML
import { addIcons } from 'ionicons';

// Importamos todos los iconos que tienes en tu archivo original
import { 
  calendarOutline, 
  timeOutline, 
  carOutline, 
  documentTextOutline, 
  chevronBackOutline, 
  homeOutline, 
  personOutline, 
  cartOutline,
  checkmarkCircleOutline,
  createOutline
} from 'ionicons/icons';

// Decorador del componente con las rutas traducidas
@Component({
  selector: 'app-citas', 
  templateUrl: './citas.page.html', 
  styleUrls: ['./citas.page.scss'], 
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
    IonDatetime,   // Mantenemos esto para que el calendario nativo no marque error en el HTML
    IonTextarea,   // Mantenemos esto para el área de notas
    RouterModule
  ]
})
export class CitasPage implements OnInit { // Clase principal traducida
  
  // El constructor se encarga únicamente de registrar los iconos
  constructor() {
    addIcons({ 
      calendarOutline, 
      timeOutline, 
      carOutline, 
      documentTextOutline, 
      chevronBackOutline, 
      homeOutline, 
      personOutline, 
      cartOutline,
      checkmarkCircleOutline,
      createOutline
    });
  }

  ngOnInit() {
    // Como el HTML ahora es un mockup puramente visual, no necesitamos iniciar variables 
    // ni inyectar los servicios de VehicleService o CartService.
  }

  /* 
   * NOTA:
   * Funciones lógicas como selectTime() y proceedToConfirmation() fueron removidas.
   * La navegación al siguiente paso ahora se hace directamente en el HTML del botón 
   * "Continuar" usando routerLink="/cita-resumen".
   */
}