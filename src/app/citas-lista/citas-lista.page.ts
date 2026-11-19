import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonTitle,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  carOutline,
  constructOutline,
  calendarOutline,
  chevronForwardOutline,
  homeOutline,
  cartOutline,
  personOutline,
  checkmarkCircle,
  closeCircle,
} from 'ionicons/icons';
import { TallerService, Cita } from '../core/services/taller';

@Component({
  selector: 'app-citas-lista',
  templateUrl: './citas-lista.page.html',
  styleUrls: ['./citas-lista.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    IonIcon,
    IonTitle,
  ],
})
export class CitaListaPage {
  private tallerService = inject(TallerService);
  private router = inject(Router);

  pestanaActiva: 'proximas' | 'historial' = 'proximas';

  private meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  private dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  constructor() {
    addIcons({
      carOutline,
      constructOutline,
      calendarOutline,
      chevronForwardOutline,
      homeOutline,
      cartOutline,
      personOutline,
      checkmarkCircle,
      closeCircle,
    });
  }

  get citasProximas(): Cita[] {
    return this.tallerService
      .getCitas()
      .filter((c) => c.estado === 'CONFIRMADA' || c.estado === 'PENDIENTE');
  }

  get citasHistorial(): Cita[] {
    return this.tallerService
      .getCitas()
      .filter((c) => c.estado === 'COMPLETADA' || c.estado === 'CANCELADA');
  }

  get citasVisibles(): Cita[] {
    return this.pestanaActiva === 'proximas' ? this.citasProximas : this.citasHistorial;
  }

  verDetalle(cita: Cita): void {
    this.tallerService.setCitaDetalle(cita);
    this.router.navigateByUrl('/cita-detalle');
  }

  irAAgendar(): void {
    const destino = this.tallerService.getCarrito().length > 0
      ? '/seleccionar-vehiculo'
      : '/servicios';
    this.router.navigateByUrl(destino);
  }

  formatearEstado(estado: Cita['estado']): string {
    const mapa: Record<Cita['estado'], string> = {
      PENDIENTE: 'Pendiente',
      CONFIRMADA: 'Confirmada',
      COMPLETADA: 'Completada',
      CANCELADA: 'Cancelada',
    };
    return mapa[estado] || estado;
  }

  private parsearFecha(fechaHora: string): Date {
    if (fechaHora.includes('/')) {
      const parteFecha = fechaHora.split('•')[0].trim();
      const [dia, mes, anio] = parteFecha.split('/').map(Number);
      return new Date(anio, mes - 1, dia);
    }
    return new Date(fechaHora);
  }

  obtenerMes(fechaHora: string): string {
    const fecha = this.parsearFecha(fechaHora);
    return isNaN(fecha.getTime()) ? 'MES' : this.meses[fecha.getMonth()];
  }

  obtenerDiaNumero(fechaHora: string): string {
    const fecha = this.parsearFecha(fechaHora);
    return isNaN(fecha.getTime()) ? '--' : String(fecha.getDate()).padStart(2, '0');
  }

  obtenerDiaSemana(fechaHora: string): string {
    const fecha = this.parsearFecha(fechaHora);
    return isNaN(fecha.getTime()) ? '' : this.dias[fecha.getDay()];
  }

  obtenerHora(fechaHora: string): string {
    if (fechaHora.includes('•')) {
      return fechaHora.split('•')[1].trim();
    }
    const fecha = new Date(fechaHora);
    return isNaN(fecha.getTime())
      ? 'Por confirmar'
      : fecha.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  }
}