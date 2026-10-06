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
import { RouterModule } from '@angular/router'; // Conservado para los routerLink de la vista y la navegación inferior
import { addIcons } from 'ionicons';

// Importamos todos los iconos que utiliza la vista de método de pago
import { 
  chevronBackOutline, 
  cardOutline, 
  businessOutline, 
  storefrontOutline, 
  homeOutline, 
  cartOutline, 
  calendarOutline, 
  personOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-metodo-pago', // Selector renombrado a español
  templateUrl: './metodo-pago.page.html', // Enlace al HTML estático que traducimos
  styleUrls: ['./metodo-pago.page.scss'], // Enlace al SCSS traducido
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
export class MetodoPagoPage implements OnInit {

  // El constructor registra los iconos necesarios para que la vista los renderice correctamente
  constructor() {
    addIcons({ 
      chevronBackOutline, 
      cardOutline, 
      businessOutline, 
      storefrontOutline, 
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
   * 1. Se eliminaron las variables de estado (`selectedMethod`, `cardNumber`, `cardExp`, etc.) 
   *    y la inyección del `Router`.
   * 2. Las funciones `selectMethod()` y `proceedToSummary()` fueron removidas. 
   *    La navegación ahora se maneja de manera directa en el HTML con el atributo `routerLink`.
   */
}