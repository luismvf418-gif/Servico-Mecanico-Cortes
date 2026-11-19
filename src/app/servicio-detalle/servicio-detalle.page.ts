import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  constructOutline,
  waterOutline,
  discOutline,
  speedometerOutline,
  pricetagOutline,
  timeOutline,
  checkmarkCircleOutline,
  cartOutline,
  homeOutline,
  calendarOutline,
  personOutline,
} from 'ionicons/icons';
import { TallerService, Servicio } from '../core/services/taller';

@Component({
  selector: 'app-servicio-detalle',
  templateUrl: './servicio-detalle.page.html',
  styleUrls: ['./servicio-detalle.page.scss'],
  standalone: true,
  imports: [
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
export class ServicioDetallePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tallerService = inject(TallerService);
  private toastCtrl = inject(ToastController);

  servicio: Servicio | undefined;

  private detallesExtra: Record<number, { duracion: string; incluye: string[] }> = {
    1: {
      duracion: '2 a 3 horas',
      incluye: [
        'Cambio de bujías y filtros de aire y gasolina',
        'Cambio de aceite y limpieza de cuerpo de aceleración',
        'Lavado de inyectores y revisión de puntos de seguridad',
      ],
    },
    2: {
      duracion: '45 minutos',
      incluye: [
        'Aceite sintético de alto rendimiento',
        'Reemplazo de filtro de aceite nuevo',
        'Revisión de niveles de líquidos y presión de llantas',
      ],
    },
    3: {
      duracion: '1.5 horas',
      incluye: [
        'Cambio de balatas delanteras o traseras',
        'Rectificado de discos y limpieza de calipers',
        'Purga y revisión de líquido de frenos',
      ],
    },
    4: {
      duracion: '40 minutos',
      incluye: [
        'Escaneo completo de computadora y módulos',
        'Lectura y borrado de códigos de falla',
        'Diagnóstico impreso de sensores y batería',
      ],
    },
  };

  constructor() {
    addIcons({
      chevronBackOutline,
      constructOutline,
      waterOutline,
      discOutline,
      speedometerOutline,
      pricetagOutline,
      timeOutline,
      checkmarkCircleOutline,
      cartOutline,
      homeOutline,
      calendarOutline,
      personOutline,
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.servicio = this.tallerService.getServicioById(id) || this.tallerService.getServicios()[0];
  }

  get duracionEstimada(): string {
    if (!this.servicio) return '1 hora';
    return this.detallesExtra[this.servicio.id_servicio]?.duracion || '1 a 2 horas';
  }

  get puntosIncluidos(): string[] {
    if (!this.servicio) return [];
    return (
      this.detallesExtra[this.servicio.id_servicio]?.incluye || [
        this.servicio.descripcion,
        'Inspección general de seguridad',
      ]
    );
  }

  async agregarAlCarrito() {
    if (!this.servicio) return;

    this.tallerService.agregarAlCarrito(this.servicio);

    const toast = await this.toastCtrl.create({
      message: `${this.servicio.nombre_servicio} agregado al carrito`,
      duration: 1500,
      color: 'success',
    });
    await toast.present();

    this.router.navigateByUrl('/carrito');
  }
}