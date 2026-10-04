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
import { CartService } from '../services/cart.service'; // <--- 1. Importar el servicio

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
  
  constructor(public cartService: CartService) { // <--- 2. Inyectar como public para usarlo en el HTML
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

  // <--- 3. Método para eliminar elementos usando el servicio
  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  // <--- 4. Cálculo dinámico del total obtenido del servicio
  get totalAmount(): number {
    return this.cartService.getTotal();
  }
}