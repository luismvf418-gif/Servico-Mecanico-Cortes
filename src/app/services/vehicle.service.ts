import { Injectable } from '@angular/core';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  mileage: number;
  color: string;
  selected?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehicles: Vehicle[] = [
    {
      id: '1',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      plate: 'ABC-123',
      mileage: 45000,
      color: 'Blanco',
      selected: true
    },
    {
      id: '2',
      brand: 'Nissan',
      model: 'Sentra',
      year: 2018,
      plate: 'XYZ-789',
      mileage: 72300,
      color: 'Gris',
      selected: false
    },
    {
      id: '3',
      brand: 'Chevrolet',
      model: 'Silverado',
      year: 2021,
      plate: 'LMN-456',
      mileage: 38200,
      color: 'Azul',
      selected: false
    }
  ];

  getVehicles(): Vehicle[] {
    return this.vehicles;
  }

  getSelectedVehicle(): Vehicle {
    return this.vehicles.find(v => v.selected) || this.vehicles[0];
  }

  setSelectedVehicle(id: string) {
    this.vehicles.forEach(v => v.selected = (v.id === id));
  }

  addVehicle(vehicle: Omit<Vehicle, 'id'>) {
    const newId = (this.vehicles.length + 1).toString();
    const newVehicle: Vehicle = { ...vehicle, id: newId, selected: this.vehicles.length === 0 };
    this.vehicles.push(newVehicle);
  }
}