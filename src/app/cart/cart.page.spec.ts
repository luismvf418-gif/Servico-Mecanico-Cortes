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
import { RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
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
export class CartPage implements OnInit {
  
  // Lista simulada de servicios agregados al carrito
  cartItems = [
    { title: 'Afinación general', price: 1200, icon: 'construct-outline' },
    { title: 'Cambio de aceite', price: 600, icon: 'water-outline' }
  ];

  constructor() {
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

  ngOnInit() {}

  // Método para eliminar un elemento del carrito
  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  // Cálculo dinámico del total
  get totalAmount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
}