import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle } from '@ionic/angular';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  chevronBackOutline, 
  constructOutline, 
  pricetagOutline, 
  timeOutline, 
  carOutline, 
  funnelOutline, 
  flashOutline, 
  documentTextOutline, 
  cartOutline, 
  homeOutline, 
  calendarOutline, 
  personOutline,
  waterOutline,
  shieldOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
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
export class ServiceDetailPage implements OnInit {
  
  // Lista de servicios para mapear los detalles según la selección
  allServices = [
    {
      title: 'Afinación general',
      subtitle: 'Mantén tu motor en óptimas condiciones',
      description: 'Servicio completo para mantener el rendimiento, seguridad y eficiencia de tu vehículo. Recomendado cada 10,000 km o según las indicaciones del fabricante.',
      price: '$1,200',
      duration: '2 h',
      icon: 'construct-outline',
      includes: [
        { text: 'Cambio de aceite y filtro', icon: 'car-outline' },
        { text: 'Revisión y/o cambio de filtros (aire, gasolina y cabina)', icon: 'funnel-outline' },
        { text: 'Revisión y limpieza de bujías', icon: 'flash-outline' },
        { text: 'Revisión de niveles y diagnóstico general', icon: 'document-text-outline' }
      ]
    },
    {
      title: 'Cambio de aceite',
      subtitle: 'Lubricación y protección óptima',
      description: 'Cambio de aceite de alta calidad para proteger las piezas internas del motor y alargar su vida útil.',
      price: '$600',
      duration: '45 min',
      icon: 'water-outline',
      includes: [
        { text: 'Drenado de aceite usado', icon: 'car-outline' },
        { text: 'Sustitución de filtro de aceite', icon: 'funnel-outline' },
        { text: 'Rellenado con aceite nuevo sintético/mineral', icon: 'flash-outline' },
        { text: 'Revisión general de fugas', icon: 'document-text-outline' }
      ]
    },
    {
      title: 'Revisión de frenos',
      subtitle: 'Seguridad y confianza en cada kilómetro',
      description: 'Inspección profunda del sistema de frenado para garantizar una respuesta inmediata y segura.',
      price: '$800',
      duration: '1 h',
      icon: 'shield-outline',
      includes: [
        { text: 'Inspección de balatas y discos', icon: 'car-outline' },
        { text: 'Revisión de líquido de frenos', icon: 'document-text-outline' },
        { text: 'Limpieza y ajuste de calipers', icon: 'construct-outline' }
      ]
    },
    {
      title: 'Diagnóstico por escáner',
      subtitle: 'Detección precisa de fallas electrónicas',
      description: 'Lectura de códigos de computadora para identificar anomalías en los sensores y sistemas del vehículo.',
      price: '$500',
      duration: '30 min',
      icon: 'car-outline',
      includes: [
        { text: 'Escaneo completo de computadora (OBD2)', icon: 'document-text-outline' },
        { text: 'Borrado de códigos de error menores', icon: 'flash-outline' },
        { text: 'Reporte impreso o digital de diagnóstico', icon: 'construct-outline' }
      ]
    }
  ];

  service: any;

  constructor(private route: ActivatedRoute) {
    addIcons({ 
      chevronBackOutline, 
      constructOutline, 
      pricetagOutline, 
      timeOutline, 
      carOutline, 
      funnelOutline, 
      flashOutline, 
      documentTextOutline, 
      cartOutline, 
      homeOutline, 
      calendarOutline, 
      personOutline,
      waterOutline,
      shieldOutline
    });
  }

  ngOnInit() {
    // Capturamos el ID de la URL y seleccionamos el servicio correspondiente
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.service = this.allServices[+id] || this.allServices[0];
      }
    });
  }
}