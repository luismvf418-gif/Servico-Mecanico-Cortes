import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {}

  getItems() {
    return this.cartItems;
  }

  addItem(service: any) {
    this.cartItems.push(service);
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  // Método nuevo para limpiar o vaciar el carrito por completo
  clear() {
    this.cartItems = [];
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => {
      const priceVal = item.price ?? item.cost ?? item.valor ?? item.precio ?? item.amount ?? 0;
      const numericPrice = typeof priceVal === 'number' 
        ? priceVal 
        : parseFloat(String(priceVal).replace(/[^0-9.-]+/g,""));
      return sum + (isNaN(numericPrice) ? 0 : numericPrice);
    }, 0);
  }
}