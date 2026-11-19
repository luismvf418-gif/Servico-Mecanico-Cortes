import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonBadge,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cartOutline, personCircleOutline, homeOutline } from 'ionicons/icons';
import { TallerService } from '../../../core/services/taller';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonBadge,
  ],
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-buttons slot="start">
          <ion-back-button *ngIf="mostrarAtras" [defaultHref]="rutaAtras"></ion-back-button>
          <ion-button *ngIf="mostrarInicio" routerLink="/inicio">
            <ion-icon slot="icon-only" name="home-outline"></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-title>{{ titulo }}</ion-title>

        <ion-buttons slot="end">
          <ion-button *ngIf="mostrarCarrito" routerLink="/carrito">
            <ion-icon slot="icon-only" name="cart-outline"></ion-icon>
            <ion-badge *ngIf="tallerService.getCarrito().length > 0" color="danger">
              {{ tallerService.getCarrito().length }}
            </ion-badge>
          </ion-button>

          <ion-button *ngIf="mostrarPerfil" routerLink="/perfil">
            <ion-icon slot="icon-only" name="person-circle-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
})
export class HeaderComponent {
  @Input() titulo: string = 'Servicio Mecánico Cortés';
  @Input() mostrarAtras: boolean = true;
  @Input() rutaAtras: string = '/inicio';
  @Input() mostrarInicio: boolean = false;
  @Input() mostrarCarrito: boolean = true;
  @Input() mostrarPerfil: boolean = true;

  public tallerService = inject(TallerService);

  constructor() {
    addIcons({ cartOutline, personCircleOutline, homeOutline });
  }
}