import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonTitle,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  carOutline,
  calendarOutline,
  cardOutline,
  constructOutline,
  informationCircleOutline,
  checkmarkCircleOutline,
  homeOutline,
  cartOutline,
  personOutline,
  copyOutline,
} from 'ionicons/icons';
import { TallerService, Vehiculo, Servicio, Cita } from '../core/services/taller';

@Component({
  selector: 'app-cita-resumen',
  templateUrl: './cita-resumen.page.html',
  styleUrls: ['./cita-resumen.page.scss'],
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonTitle,
  ],
})
export class CitaResumenPage implements OnInit {
  private tallerService = inject(TallerService);
  private toastCtrl = inject(ToastController);

  estaConfirmada: boolean = false;
  folioGenerado: string = '';
  citaConfirmada: Cita | null = null;
  totalConfirmado: number = 0;

  constructor() {
    addIcons({
      chevronBackOutline,
      carOutline,
      calendarOutline,
      cardOutline,
      constructOutline,
      informationCircleOutline,
      checkmarkCircleOutline,
      homeOutline,
      cartOutline,
      personOutline,
      copyOutline,
    });
  }

  ngOnInit() {
    const lista = this.tallerService.getVehiculos();
    if (!this.tallerService.getVehiculoSeleccionado() && lista.length > 0) {
      this.tallerService.seleccionarVehiculo(lista[0]);
    }
  }

  get vehiculoSeleccionado(): Vehiculo | null {
    return this.tallerService.getVehiculoSeleccionado();
  }

  get itemsCarrito(): Servicio[] {
    return this.tallerService.getCarrito();
  }

  get metodoPago(): string {
    return this.tallerService.getMetodoPago();
  }

  get fechaFormateada(): string {
    const fecha = this.tallerService.getFechaCita();
    if (!fecha) return 'Por confirmar en taller';
    return fecha.split('•')[0].trim();
  }

  get horaFormateada(): string {
    const fecha = this.tallerService.getFechaCita();
    if (!fecha || !fecha.includes('•')) return '';
    return fecha.split('•')[1].trim();
  }

  obtenerSubtotal(): number {
    return this.tallerService.getTotalCarrito();
  }

  obtenerIva(): number {
    return this.obtenerSubtotal() * 0.16;
  }

  obtenerTotal(): number {
    return this.obtenerSubtotal() + this.obtenerIva();
  }

  async confirmarCita() {
    if (!this.vehiculoSeleccionado || this.itemsCarrito.length === 0) {
      const toast = await this.toastCtrl.create({
        message: 'Asegúrate de tener un vehículo y al menos un servicio en el carrito.',
        duration: 2200,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    const totalConIva = this.obtenerTotal();
    const nuevaCita = this.tallerService.confirmarCita();

    if (nuevaCita) {
      this.citaConfirmada = nuevaCita;
      this.totalConfirmado = totalConIva;
      this.folioGenerado = `AC-2026-${nuevaCita.id_cita}`;
      this.estaConfirmada = true;
    }
  }

  async copiarFolio() {
    if (!this.folioGenerado) return;
    navigator.clipboard?.writeText(this.folioGenerado);

    const toast = await this.toastCtrl.create({
      message: `Folio ${this.folioGenerado} copiado`,
      duration: 1500,
      color: 'dark',
    });
    await toast.present();
  }
}