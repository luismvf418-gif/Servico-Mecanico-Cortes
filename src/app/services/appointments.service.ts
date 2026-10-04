import { Injectable } from '@angular/core';

export interface Appointment {
  id: string;
  folio: string;
  dateStr: string;
  month: string;
  day: string;
  dateFull: string;
  time: string;
  status: string;
  statusType: 'confirmed' | 'pending' | 'completed';
  car: string;
  plate: string;
  color: string;
  mileage: string;
  services: { name: string; category: string; price: number }[];
  subtotal: number;
  iva: number;
  total: number;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private upcomingAppointments: Appointment[] = [
    {
      id: '1',
      folio: 'SC-2026-48921',
      dateStr: '16',
      month: 'AGO',
      day: 'Sáb',
      dateFull: 'Sábado, 16 de agosto de 2026',
      time: '10:00 a.m.',
      status: 'Confirmada',
      statusType: 'confirmed',
      car: 'Toyota Corolla 2020',
      plate: 'ABC-123',
      color: 'Blanco',
      mileage: '45,000 km',
      services: [
        { name: 'Cambio de aceite', category: 'Mantenimiento', price: 850 },
        { name: 'Revisión de frenos', category: 'Seguridad', price: 450 }
      ],
      subtotal: 1300,
      iva: 208,
      total: 1508,
      paymentMethod: 'Tarjeta de crédito/débito (* 4821)'
    }
  ];

  private historyAppointments: Appointment[] = [];
  private selectedAppointmentId: string = '1';

  constructor() {}

  getUpcoming() {
    return this.upcomingAppointments;
  }

  getHistory() {
    return this.historyAppointments;
  }

  addAppointment(appointment: Appointment) {
    this.upcomingAppointments.unshift(appointment);
  }

  setSelectedAppointment(id: string) {
    this.selectedAppointmentId = id;
  }

  getSelectedAppointment(): Appointment {
    const all = [...this.upcomingAppointments, ...this.historyAppointments];
    return all.find(a => a.id === this.selectedAppointmentId) || this.upcomingAppointments[0];
  }

  cancelAppointment(id: string) {
    this.upcomingAppointments = this.upcomingAppointments.filter(a => a.id !== id);
  }
}