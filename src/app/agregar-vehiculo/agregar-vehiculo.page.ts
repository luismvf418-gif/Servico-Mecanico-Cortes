import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, carOutline, homeOutline, cartOutline, calendarOutline, personOutline } from 'ionicons/icons';

// Decorador que define las propiedades y metadatos del componente en Angular
@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
  standalone: true, // Indica que es un componente independiente moderno de Angular
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
export class AgregarVehiculoPage implements OnInit {

  // Constructor de la clase: se ejecuta al inicializar la página
  constructor() {
    // Registramos los iconos de Ionic que se utilizarán en el diseño visual de la vista
    addIcons({ 
      chevronBackOutline, 
      carOutline, 
      homeOutline, 
      cartOutline, 
      calendarOutline, 
      personOutline 
    });
  }

  // Método del ciclo de vida de Angular que se ejecuta cuando la vista termina de cargar
  ngOnInit() {
    // Por ahora se encuentra vacío ya que no requerimos cargar datos reales ni lógica compleja
  }

}