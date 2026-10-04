import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, carOutline, homeOutline, cartOutline, calendarOutline, personOutline } from 'ionicons/icons';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle, RouterModule]
})
export class AddVehiclePage implements OnInit {
  brand = '';
  model = '';
  plate = '';
  year = 2023;
  mileage = 0;
  color = '';

  brands = ['Toyota', 'Nissan', 'Chevrolet', 'Volkswagen', 'Honda', 'Ford', 'Mazda'];
  years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
  colors = ['Blanco', 'Negro', 'Gris', 'Plata', 'Azul', 'Rojo', 'Otro'];

  constructor(private vehicleService: VehicleService, private router: Router) {
    addIcons({ chevronBackOutline, carOutline, homeOutline, cartOutline, calendarOutline, personOutline });
  }

  ngOnInit() {}

  saveVehicle() {
    if (!this.brand || !this.model || !this.plate) {
      alert('Por favor completa los campos principales (Marca, Modelo y Matrícula)');
      return;
    }

    this.vehicleService.addVehicle({
      brand: this.brand,
      model: this.model,
      year: Number(this.year),
      plate: this.plate,
      mileage: Number(this.mileage),
      color: this.color || 'Blanco'
    });

    this.router.navigate(['/vehicles']);
  }

  cancel() {
    this.router.navigate(['/vehicles']);
  }
}