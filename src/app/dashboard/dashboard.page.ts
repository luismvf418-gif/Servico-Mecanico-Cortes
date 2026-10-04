import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  constructOutline, 
  carOutline, 
  calendarOutline, 
  cartOutline, 
  chevronForwardOutline, 
  homeOutline, 
  personOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonButton, 
    IonIcon, 
    IonGrid, 
    IonRow, 
    IonCol,
    RouterModule
  ]
})
export class DashboardPage implements OnInit {
  constructor() {
    addIcons({ 
      'construct-outline': constructOutline,
      carOutline, 
      calendarOutline, 
      cartOutline, 
      chevronForwardOutline, 
      homeOutline, 
      personOutline 
    });
  }

  ngOnInit() {}
}