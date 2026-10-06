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
import { RouterModule } from '@angular/router'; // Conservamos esto para el funcionamiento de los routerLink
import { addIcons } from 'ionicons';

// Importamos los iconos exactos que estás usando en el diseño
import { 
  mailOutline, 
  lockClosedOutline, 
  eyeOutline, 
  arrowForwardOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-iniciar-sesion', // Nombre del componente en español
  templateUrl: './iniciar-sesion.page.html', // Ruta al HTML estático que creamos
  styleUrls: ['./iniciar-sesion.page.scss'], // Ruta al SCSS traducido
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
export class IniciarSesionPage implements OnInit {
  
  // El constructor se dedica exclusivamente a registrar los iconos de la vista
  constructor() {
    addIcons({ 
      mailOutline, 
      lockClosedOutline, 
      eyeOutline, 
      arrowForwardOutline 
    });
  }

  ngOnInit() {
    // Componente listo y vacío, ideal para el mockup visual
  }

  /* 
   * NOTA: 
   * 1. Las variables `email` y `password` fueron eliminadas, ya que quitamos los `[(ngModel)]` del HTML.
   * 2. Se eliminó la inyección de `Router` y la función `onLogin()`. 
   * 3. La navegación ahora se hace a través del botón con `routerLink="/inicio"`.
   */
}