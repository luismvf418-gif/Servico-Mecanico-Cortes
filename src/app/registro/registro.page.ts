import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonIcon 
} from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Conservado para los routerLink de la vista
import { addIcons } from 'ionicons';

// Importamos todos los iconos que utiliza la vista de registro
import { 
  mailOutline, 
  lockClosedOutline, 
  callOutline, 
  personOutline, 
  eyeOutline, 
  arrowForwardOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-registro', // Selector actualizado a español
  templateUrl: './registro.page.html', // Enlace al HTML estático que traducimos
  styleUrls: ['./registro.page.scss'], // Enlace al SCSS traducido
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonIcon, 
    RouterModule
  ]
})
export class RegistroPage implements OnInit {

  // El constructor registra los iconos necesarios para que la vista los renderice correctamente
  constructor() {
    addIcons({ 
      mailOutline, 
      lockClosedOutline, 
      callOutline, 
      personOutline, 
      eyeOutline, 
      arrowForwardOutline 
    });
  }

  ngOnInit() {
    // Componente limpio enfocado en el mockup visual estático
  }

  /* 
   * NOTA DE LIMPIEZA:
   * 1. Se eliminaron las variables de estado (`email`, `password`, `phone`, `name`, etc.) 
   *    y la inyección del `Router`.
   * 2. La función `onRegister()` fue removida. 
   *    La navegación ahora se maneja de manera directa en el HTML con el atributo `routerLink`.
   */
}