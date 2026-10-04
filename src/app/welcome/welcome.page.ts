import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular';
import { RouterLink, RouterLinkActive } from '@angular/router'; // <- Importante

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton,
    RouterLink,       // <- Agrégalo aquí
    RouterLinkActive  // <- Agrégalo aquí
  ]
})
export class WelcomePage implements OnInit {
  constructor() { }
  ngOnInit() { }
}