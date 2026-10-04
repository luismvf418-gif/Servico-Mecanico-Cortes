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
  checkmarkCircleOutline, 
  timeOutline,
  homeOutline, 
  cartOutline, 
  personOutline,
  copyOutline,
  alertCircleOutline,
  cardOutline
} from 'ionicons/icons';
import { AppointmentsService, Appointment } from '../services/appointments.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.page.html',
  styleUrls: ['./appointment-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle, RouterModule]
})
export class AppointmentDetailPage implements OnInit {
  appointment!: Appointment;

  constructor(private appointmentsService: AppointmentsService, private router: Router) {
    addIcons({ 
      chevronBackOutline, 
      carOutline, 
      calendarOutline, 
      constructOutline, 
      checkmarkCircleOutline, 
      timeOutline,
      homeOutline, 
      cartOutline, 
      personOutline,
      copyOutline,
      alertCircleOutline,
      cardOutline
    });
  }

  ngOnInit() {
    this.appointment = this.appointmentsService.getSelectedAppointment();
  }

  cancelAppointment() {
    const confirmCancel = window.confirm('¿Estás seguro de que deseas cancelar esta cita?');
    if (confirmCancel) {
      this.appointmentsService.cancelAppointment(this.appointment.id);
      alert('Cita cancelada correctamente.');
      this.router.navigate(['/appointments-list']);
    }
  }
}