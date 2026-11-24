import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonTitle,
  AlertController,
  ToastController,
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
  createOutline,
  trashOutline,
  swapVerticalOutline,
  closeOutline,
} from 'ionicons/icons';
import { TallerService, Cita } from '../core/services/taller';

@Component({
  selector: 'app-citas-lista',
  templateUrl: './citas-lista.page.html',
  styleUrls: ['./citas-lista.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
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
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);

  pestanaActiva: 'proximas' | 'historial' = 'proximas';
  ordenFecha: 'recientes' | 'antiguas' = 'recientes';
  fechaFiltro: string = '';

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
      createOutline,
      trashOutline,
      swapVerticalOutline,
      closeOutline,
    });
  }

  get citasProximas(): Cita[] {
    return this.aplicarFiltroYOrden(
      this.tallerService
        .getCitas()
        .filter((c) => c.estado === 'CONFIRMADA' || c.estado === 'PENDIENTE')
    );
  }

  get citasHistorial(): Cita[] {
    return this.aplicarFiltroYOrden(
      this.tallerService
        .getCitas()
        .filter((c) => c.estado === 'COMPLETADA' || c.estado === 'CANCELADA')
    );
  }

  get citasVisibles(): Cita[] {
    return this.pestanaActiva === 'proximas' ? this.citasProximas : this.citasHistorial;
  }

  private aplicarFiltroYOrden(lista: Cita[]): Cita[] {
    let resultado = [...lista];

    // Filtrado por fecha (YYYY-MM-DD)
    if (this.fechaFiltro) {
      resultado = resultado.filter((c) => {
        const fechaObj = this.parsearFecha(c.fecha_hora);
        if (isNaN(fechaObj.getTime())) return false;
        const yyyy = fechaObj.getFullYear();
        const mm = String(fechaObj.getMonth() + 1).padStart(2, '0');
        const dd = String(fechaObj.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}` === this.fechaFiltro;
      });
    }

    // Ordenamiento por fecha
    resultado.sort((a, b) => {
      const tiempoA = this.parsearFecha(a.fecha_hora).getTime() || 0;
      const tiempoB = this.parsearFecha(b.fecha_hora).getTime() || 0;
      return this.ordenFecha === 'recientes' ? tiempoB - tiempoA : tiempoA - tiempoB;
    });

    return resultado;
  }

  alternarOrden(): void {
    this.ordenFecha = this.ordenFecha === 'recientes' ? 'antiguas' : 'recientes';
  }

  limpiarFiltroFecha(): void {
    this.fechaFiltro = '';
  }

  // --- EDICIÓN DE CITA ---
  async abrirEditarCita(event: Event, cita: Cita): Promise<void> {
    event.stopPropagation();

    const alert = await this.alertCtrl.create({
      header: `Editar Cita #${cita.id_cita}`,
      subHeader: `${cita.vehiculo.marca} ${cita.vehiculo.modelo}`,
      inputs: [
        {
          name: 'fecha_hora',
          type: 'text',
          value: cita.fecha_hora,
          placeholder: 'Fecha y hora (ej. 25/11/2026 • 10:00 AM)',
        },
        {
          name: 'notas',
          type: 'textarea',
          value: cita.notas || '',
          placeholder: 'Notas adicionales para el taller',
        },
        {
          name: 'estado',
          type: 'text',
          value: cita.estado,
          placeholder: 'CONFIRMADA, COMPLETADA o CANCELADA',
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar cambios',
          handler: async (data) => {
            const estadosValidos: Cita['estado'][] = [
              'PENDIENTE',
              'CONFIRMADA',
              'COMPLETADA',
              'CANCELADA',
            ];
            const estadoUpper = (data.estado || '').trim().toUpperCase() as Cita['estado'];
            const nuevoEstado = estadosValidos.includes(estadoUpper)
              ? estadoUpper
              : cita.estado;

            this.tallerService.editarCita(cita.id_cita, {
              fecha_hora: data.fecha_hora?.trim() || cita.fecha_hora,
              notas: data.notas?.trim() || undefined,
              estado: nuevoEstado,
            });

            await this.mostrarToast('Cita actualizada correctamente');
          },
        },
      ],
    });

    await alert.present();
  }

  // --- ELIMINACIÓN DE CITA ---
  async confirmarEliminarCita(event: Event, cita: Cita): Promise<void> {
    event.stopPropagation();

    const alert = await this.alertCtrl.create({
      header: 'Eliminar registro',
      message: `¿Deseas eliminar la cita #${cita.id_cita} de tu historial? Esta acción no se puede deshacer.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            this.tallerService.eliminarCita(cita.id_cita);
            await this.mostrarToast('Cita eliminada del historial');
          },
        },
      ],
    });

    await alert.present();
  }

  private async mostrarToast(mensaje: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  verDetalle(cita: Cita): void {
    this.tallerService.setCitaDetalle(cita);
    this.router.navigateByUrl('/cita-detalle');
  }

  irAAgendar(): void {
    const destino =
      this.tallerService.getCarrito().length > 0
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