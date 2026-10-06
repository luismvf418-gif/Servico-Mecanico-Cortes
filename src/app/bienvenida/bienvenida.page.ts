import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular';
import { RouterLink, RouterLinkActive } from '@angular/router'; 

// Decorador que define las propiedades y metadatos del componente en Angular
@Component({
  selector: 'app-bienvenida', // Actualizado para coincidir con el nombre en español
  templateUrl: './bienvenida.page.html', // Actualizado al nuevo nombre del archivo HTML
  styleUrls: ['./bienvenida.page.scss'], // Actualizado al nuevo nombre del archivo SCSS
  standalone: true, // Indica que es un componente independiente moderno de Angular
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton,
    RouterLink,       // Permite la navegación visual entre vistas sin recargar la página
    RouterLinkActive  // Permite aplicar estilos especiales al enlace cuando su ruta está activa
  ]
})
export class BienvenidaPage implements OnInit { // Clase renombrada al español

  // Constructor de la clase: se ejecuta al inicializar la página
  constructor() { }

  // Método del ciclo de vida de Angular que se ejecuta cuando la vista termina de cargar
  ngOnInit() {
    // Se deja vacío porque esta página es puramente visual y no requiere cargar datos
  }

}