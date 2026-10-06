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
import { RouterModule } from '@angular/router'; // Para que funcione routerLink en la vista HTML
import { addIcons } from 'ionicons';

// Importamos exactamente los iconos que usamos en el HTML
import { 
  chevronBackOutline, 
  carOutline, 
  calendarOutline, 
  constructOutline, 
  informationCircleOutline, 
  checkmarkCircleOutline, 
  homeOutline, 
  cartOutline, 
  personOutline,
  copyOutline
} from 'ionicons/icons';

// Decorador que define las propiedades principales del componente
@Component({
  selector: 'app-cita-resumen', // Nombre de la etiqueta HTML en español
  templateUrl: './cita-resumen.page.html', // Enlace a la vista visual
  styleUrls: ['./cita-resumen.page.scss'], // Enlace a la hoja de estilos
  standalone: true, // Componente independiente moderno
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
    RouterModule // Necesario para la barra de navegación y botones
  ]
})
export class CitaResumenPage implements OnInit {
  
  // Variables estáticas para mostrar la información en la vista de diseño
  // Estas simulan lo que antes traíamos del VehicleService y CartService
  estaConfirmada: boolean = false; // Controla qué pantalla se muestra (Resumen vs Éxito)
  folioGenerado: string = ''; // Guardará el número de folio simulado
  
  // Objeto de ejemplo simulando un vehículo seleccionado
  vehiculoSeleccionado = {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2024,
    plate: 'ABC-123',
    mileage: 15000
  };

  // Arreglo de ejemplo simulando los servicios del carrito
  itemsCarrito = [
    { name: 'Afinación Mayor', category: 'Mantenimiento', price: 1500, quantity: 1 },
    { name: 'Lavado de Interiores', category: 'Estética', price: 500, quantity: 1 }
  ];

  // Constructor: Registra los iconos usados en la vista
  constructor() {
    addIcons({ 
      chevronBackOutline, 
      carOutline, 
      calendarOutline, 
      constructOutline, 
      informationCircleOutline, 
      checkmarkCircleOutline, 
      homeOutline, 
      cartOutline, 
      personOutline,
      copyOutline
    });
  }

  ngOnInit() {
    // Ya no llamamos a loadData() porque usamos variables estáticas
  }

  // Métodos de cálculo de costos (ahora usan la data estática)
  obtenerSubtotal(): number {
    return this.itemsCarrito.reduce((acumulado, item) => {
      return acumulado + (item.price * item.quantity);
    }, 0);
  }

  obtenerIva(): number {
    return this.obtenerSubtotal() * 0.16;
  }

  obtenerTotal(): number {
    return this.obtenerSubtotal() + this.obtenerIva();
  }

  // Método simulado para confirmar la cita y cambiar la vista a la pantalla de éxito
  confirmarCita() {
    // Genera un folio aleatorio de ejemplo
    const numeroAleatorio = Math.floor(10000 + Math.random() * 90000);
    this.folioGenerado = `AC-2026-${numeroAleatorio}`;
    
    // Cambia la variable booleana para ocultar el resumen y mostrar la vista de éxito
    this.estaConfirmada = true;
  }
}