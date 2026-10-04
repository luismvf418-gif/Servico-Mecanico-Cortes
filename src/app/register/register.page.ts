import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, callOutline, personOutline, eyeOutline, arrowForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonIcon, 
    RouterModule
  ]
})
export class RegisterPage implements OnInit {
  email = '';
  password = '';
  phone = '';
  name = '';
  paternalLastName = '';
  maternalLastName = '';

  constructor(private router: Router) {
    addIcons({ mailOutline, lockClosedOutline, callOutline, personOutline, eyeOutline, arrowForwardOutline });
  }
  ngOnInit() {}

  // Función para navegar al dashboard al registrarse
  onRegister() {
    this.router.navigate(['/dashboard']);
  }
}