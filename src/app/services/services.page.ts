import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonButton, 
  IonIcon, 
  IonSearchbar, 
  IonTitle 
} from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { searchOutline, cartOutline, constructOutline, waterOutline, shieldOutline, carOutline, chevronBackOutline, homeOutline, calendarOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
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
    IonSearchbar,
    IonTitle,
    RouterModule
  ]
})
export class ServicesPage implements OnInit {
  selectedCategory = 'Todos';
  searchQuery = ''; // Variable para el texto de búsqueda

  servicesList = [
    {
      title: 'Afinación general',
      description: 'Mejora el rendimiento de tu motor y reduce el consumo de combustible.',
      price: '$1,200',
      icon: 'construct-outline',
      category: 'Motor'
    },
    {
      title: 'Cambio de aceite',
      description: 'Lubricación y protección para un mejor rendimiento del motor.',
      price: '$600',
      icon: 'water-outline',
      category: 'Motor'
    },
    {
      title: 'Revisión de frenos',
      description: 'Seguridad y confianza en cada kilómetro.',
      price: '$800',
      icon: 'shield-outline',
      category: 'Frenos'
    },
    {
      title: 'Diagnóstico por escáner',
      description: 'Identifica fallas electrónicas y mantiene tu vehículo en óptimas condiciones.',
      price: '$500',
      icon: 'car-outline',
      category: 'Motor'
    }
  ];

  constructor() {
    addIcons({ 
      searchOutline, 
      cartOutline, 
      constructOutline, 
      waterOutline, 
      shieldOutline, 
      carOutline, 
      chevronBackOutline,
      homeOutline,
      calendarOutline,
      personOutline
    });
  }

  ngOnInit() {}

  filterCategory(category: string) {
    this.selectedCategory = category;
  }

  // Propiedad que filtra la lista según la categoría seleccionada y lo que escribas en el buscador
  get filteredServices() {
    return this.servicesList.filter(service => {
      const matchesCategory = this.selectedCategory === 'Todos' || service.category === this.selectedCategory;
      const matchesSearch = service.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            service.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
}