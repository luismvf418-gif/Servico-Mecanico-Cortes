import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, cardOutline, businessOutline, storefrontOutline, homeOutline, cartOutline, calendarOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle, RouterModule]
})
export class PaymentMethodPage implements OnInit {
  selectedMethod: string = 'card';
  cardNumber: string = '';
  cardExp: string = '';
  cardCvv: string = '';
  cardHolder: string = '';

  constructor(private router: Router) {
    addIcons({ chevronBackOutline, cardOutline, businessOutline, storefrontOutline, homeOutline, cartOutline, calendarOutline, personOutline });
  }

  ngOnInit() {}

  selectMethod(method: string) {
    this.selectedMethod = method;
  }

  proceedToSummary() {
    this.router.navigate(['/appointment-summary']);
  }
}