import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonIcon 
} from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  constructOutline, 
  calendarOutline, 
  cartOutline, 
  chevronForwardOutline, 
  homeOutline, 
  personOutline,
  carOutline 
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
    IonTitle, 
    IonIcon,
    RouterModule
  ]
})
export class DashboardPage implements OnInit {

  constructor() {
    addIcons({ 
      constructOutline, 
      calendarOutline, 
      cartOutline, 
      chevronForwardOutline, 
      homeOutline, 
      personOutline,
      carOutline 
    });
  }

  ngOnInit() {}
}