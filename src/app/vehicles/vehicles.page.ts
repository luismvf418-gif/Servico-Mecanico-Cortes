import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, carOutline, addOutline, chevronForwardOutline, homeOutline, cartOutline, calendarOutline, personOutline } from 'ionicons/icons';
import { VehicleService, Vehicle } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle, RouterModule]
})
export class VehiclesPage implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService, private router: Router) {
    addIcons({ chevronBackOutline, carOutline, addOutline, chevronForwardOutline, homeOutline, cartOutline, calendarOutline, personOutline });
  }

  ngOnInit() {
    this.loadVehicles();
  }

  ionViewWillEnter() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicles = this.vehicleService.getVehicles();
  }

  selectVehicle(vehicle: Vehicle) {
    this.vehicleService.setSelectedVehicle(vehicle.id);
    this.loadVehicles();
  }

  goToAddVehicle() {
    this.router.navigate(['/add-vehicle']);
  }
}