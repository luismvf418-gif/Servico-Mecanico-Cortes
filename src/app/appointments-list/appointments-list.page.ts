import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  chevronBackOutline, 
  carOutline, 
  constructOutline, 
  calendarOutline, 
  timeOutline, 
  chevronForwardOutline, 
  homeOutline, 
  cartOutline, 
  personOutline,
  checkmarkCircle,
  time
} from 'ionicons/icons';
import { AppointmentsService, Appointment } from '../services/appointments.service';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.page.html',
  styleUrls: ['./appointments-list.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonTitle, RouterModule]
})
export class AppointmentsListPage implements OnInit {
  activeTab: 'upcoming' | 'history' = 'upcoming';

  upcomingAppointments: Appointment[] = [];
  historyAppointments: Appointment[] = [];

  constructor(private appointmentsService: AppointmentsService, private router: Router) {
    addIcons({ 
      chevronBackOutline, 
      carOutline, 
      constructOutline, 
      calendarOutline, 
      timeOutline, 
      chevronForwardOutline, 
      homeOutline, 
      cartOutline, 
      personOutline,
      checkmarkCircle,
      time
    });
  }

  ngOnInit() {
    this.loadAppointments();
  }

  ionViewWillEnter() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.upcomingAppointments = this.appointmentsService.getUpcoming();
    this.historyAppointments = this.appointmentsService.getHistory();
  }

  selectAppointment(item: Appointment) {
    this.appointmentsService.setSelectedAppointment(item.id);
    this.router.navigate(['/appointment-detail']);
  }

  segmentChanged(tab: 'upcoming' | 'history') {
    this.activeTab = tab;
  }

  goToNewAppointment() {
    this.router.navigate(['/cart']);
  }
}