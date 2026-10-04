import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, eyeOutline, arrowForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage implements OnInit {
  email = '';
  password = '';

  constructor(private router: Router) {
    addIcons({ mailOutline, lockClosedOutline, eyeOutline, arrowForwardOutline });
  }
  ngOnInit() {}

  // Función para navegar al dashboard al iniciar sesión
  onLogin() {
    this.router.navigate(['/dashboard']);
  }
}