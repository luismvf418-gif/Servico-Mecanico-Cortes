import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  chevronBackOutline, 
  carOutline, 
  calendarOutline, 
  constructOutline, 
  informationCircleOutline, 
  checkmarkCircleOutline, 
  homeOutline, 
  cartOutline, 
  personOutline,
  copyOutline
} from 'ionicons/icons';
import { CartService } from '../services/cart.service';
import { VehicleService, Vehicle } from '../services/vehicle.service';
import { AppointmentsService, Appointment } from '../services/appointments.service';

@Component({
  selector: 'app-appointment-summary',
  templateUrl: './appointment-summary.page.html',
  styleUrls: ['./appointment-summary.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle, RouterModule]
})
export class AppointmentSummaryPage implements OnInit {
  selectedVehicle: Vehicle | null = null;
  cartItems: any[] = [];
  isConfirmed: boolean = false;
  folio: string = '';

  constructor(
    public cartService: CartService,
    private vehicleService: VehicleService,
    private appointmentsService: AppointmentsService,
    private router: Router
  ) {
    addIcons({ 
      chevronBackOutline, 
      carOutline, 
      calendarOutline, 
      constructOutline, 
      informationCircleOutline, 
      checkmarkCircleOutline, 
      homeOutline, 
      cartOutline, 
      personOutline,
      copyOutline
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.selectedVehicle = this.vehicleService.getSelectedVehicle();
    this.cartItems = this.cartService.getItems();
  }

  getSubtotal(): number {
    if (!this.cartItems || this.cartItems.length === 0) return 0;
    return this.cartItems.reduce((acc, item) => {
      const priceVal = Number(item.price ?? item.cost ?? item.valor ?? item.precio ?? item.amount ?? 0);
      const qtyVal = Number(item.quantity ?? item.cantidad ?? 1);
      return acc + (priceVal * qtyVal);
    }, 0);
  }

  getIva(): number {
    return this.getSubtotal() * 0.16;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getIva();
  }

  confirmAppointment() {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    this.folio = `SC-2026-${randomNum}`;

    // Mapeo seguro de los servicios actuales del carrito
    const mappedServices = this.cartItems.map(item => ({
      name: item.name || item.nombre || 'Servicio',
      category: item.category || item.categoria || 'Mantenimiento',
      price: Number(item.price ?? item.cost ?? item.valor ?? item.precio ?? item.amount ?? 0)
    }));

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      folio: this.folio,
      dateStr: '16',
      month: 'AGO',
      day: 'Sáb',
      dateFull: 'Sábado, 16 de agosto de 2026',
      time: '10:00 a.m.',
      status: 'Confirmada',
      statusType: 'confirmed',
      car: this.selectedVehicle ? `${this.selectedVehicle.brand} ${this.selectedVehicle.model}` : 'Vehículo general',
      plate: this.selectedVehicle?.plate || 'SIN-PLACA',
      color: 'N/D',
      mileage: this.selectedVehicle?.mileage ? `${this.selectedVehicle.mileage} km` : '0 km',
      services: mappedServices,
      subtotal: this.getSubtotal(),
      iva: this.getIva(),
      total: this.getTotal(),
      paymentMethod: 'Tarjeta / Transferencia / Efectivo'
    };

    // 1. Guardamos la nueva cita en el servicio de citas
    this.appointmentsService.addAppointment(newAppointment);

    // 2. Vaciamos el carrito para que no arrastre servicios a futuras citas
    this.cartService.clear();

    this.isConfirmed = true;
  }

  goToAppointments() {
    this.router.navigate(['/appointments-list']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}