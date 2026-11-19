import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonTitle,
  IonDatetime,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  carOutline,
  homeOutline,
  cartOutline,
  calendarOutline,
  personOutline,
} from 'ionicons/icons';
import { TallerService, Vehiculo } from '../core/services/taller';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonTitle,
    IonDatetime,
  ],
})
export class CitasPage implements OnInit {
  private tallerService = inject(TallerService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  horarios: string[] = [
    '09:00 AM',
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '03:30 PM',
    '05:00 PM',
  ];

  fechaMinima: string = new Date().toISOString().split('T')[0];
  fechaSeleccionada: string = this.fechaMinima;
  horaSeleccionada: string = '09:00 AM';
  notas: string = '';

  constructor() {
    addIcons({
      chevronBackOutline,
      carOutline,
      homeOutline,
      cartOutline,
      calendarOutline,
      personOutline,
    });
  }

  ngOnInit() {
    const lista = this.tallerService.getVehiculos();
    if (!this.tallerService.getVehiculoSeleccionado() && lista.length > 0) {
      this.tallerService.seleccionarVehiculo(lista[0]);
    }
    this.notas = this.tallerService.getNotasCita();
  }

  get vehiculo(): Vehiculo | null {
    return this.tallerService.getVehiculoSeleccionado();
  }

  async continuar() {
    if (!this.fechaSeleccionada || !this.horaSeleccionada) {
      const toast = await this.toastCtrl.create({
        message: 'Selecciona una fecha y un horario disponible.',
        duration: 2000,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    const soloFecha = this.fechaSeleccionada.split('T')[0];
    const [anio, mes, dia] = soloFecha.split('-');
    const fechaFormateada = `${dia}/${mes}/${anio} • ${this.horaSeleccionada}`;

    this.tallerService.setFechaCita(fechaFormateada);
    this.tallerService.setNotasCita(this.notas.trim());

    this.router.navigateByUrl('/cita-resumen');
  }
}