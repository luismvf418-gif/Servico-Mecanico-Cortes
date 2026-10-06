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
  personOutline, 
  chevronBackOutline, 
  chevronForwardOutline, 
  carOutline, 
  calendarOutline, 
  cardOutline, 
  logOutOutline, 
  homeOutline, 
  cartOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
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
export class PerfilPage implements OnInit {

  constructor() {
    addIcons({ 
      personOutline, 
      chevronBackOutline, 
      chevronForwardOutline, 
      carOutline, 
      calendarOutline, 
      cardOutline, 
      logOutOutline, 
      homeOutline, 
      cartOutline 
    });
  }

  ngOnInit() {
    // Componente de perfil estático limpio
  }
}