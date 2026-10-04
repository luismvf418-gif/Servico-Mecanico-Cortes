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
  IonTitle,
  IonDatetime,
  IonTextarea
} from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  calendarOutline, 
  timeOutline, 
  carOutline, 
  documentTextOutline, 
  chevronBackOutline, 
  homeOutline, 
  personOutline, 
  cartOutline,
  checkmarkCircleOutline,
  createOutline
} from 'ionicons/icons';
import { CartService } from '../services/cart.service';
import { VehicleService, Vehicle } from '../services/vehicle.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
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
    IonDatetime,
    IonTextarea,
    RouterModule
  ]
})
export class AppointmentsPage implements OnInit {
  selectedDate: string = new Date().toISOString();
  selectedTime: string = '09:00 AM';
  selectedVehicle!: Vehicle;
  notes: string = '';

  availableTimes = ['09:00 AM', '11:00 AM', '01:00 PM', '04:00 PM'];

  constructor(
    public cartService: CartService, 
    private vehicleService: VehicleService,
    private router: Router
  ) {
    addIcons({ 
      calendarOutline, 
      timeOutline, 
      carOutline, 
      documentTextOutline, 
      chevronBackOutline, 
      homeOutline, 
      personOutline, 
      cartOutline,
      checkmarkCircleOutline,
      createOutline
    });
  }

  ngOnInit() {
    this.selectedVehicle = this.vehicleService.getSelectedVehicle();
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  // Por ahora avanzamos a la siguiente fase (confirmación) o reservamos
  proceedToConfirmation() {
    // Guardamos los datos temporales en sessionStorage o pasamos a la siguiente vista
    this.router.navigate(['/payment-method']); // Temporal hasta la Fase 3
  }
}