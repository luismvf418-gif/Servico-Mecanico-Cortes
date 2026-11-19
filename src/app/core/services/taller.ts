import { Injectable } from '@angular/core';

export interface Usuario {
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  correo: string;
  telefono: string;
}

export interface Servicio {
  id_servicio: number;
  nombre_servicio: string;
  descripcion: string;
  precio: number;
  icono: string;
  imagen: string;
}

export interface Vehiculo {
  id_vehiculo: number;
  marca: string;
  modelo: string;
  anio: number;
  placas: string;
  color?: string;
  kilometraje?: number;
}

export interface Cita {
  id_cita: number;
  vehiculo: Vehiculo;
  servicios: Servicio[];
  fecha_hora: string;
  metodo_pago: string;
  total: number;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'COMPLETADA' | 'CANCELADA';
  notas?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TallerService {
  private usuarioActual: Usuario | null = null;

  private servicios: Servicio[] = [
    {
      id_servicio: 1,
      nombre_servicio: 'Afinación Mayor',
      descripcion: 'Cambio de bujías, filtros, aceite y limpieza de inyectores.',
      precio: 1500,
      icono: 'construct-outline',
      imagen: 'assets/imagenes/Logotipo_inicial.png',
    },
    {
      id_servicio: 2,
      nombre_servicio: 'Cambio de Aceite',
      descripcion: 'Aceite sintético de alto rendimiento y filtro nuevo.',
      precio: 600,
      icono: 'water-outline',
      imagen: 'assets/imagenes/Logotipo_inicial.png',
    },
    {
      id_servicio: 3,
      nombre_servicio: 'Revisión de Frenos',
      descripcion: 'Cambio de balatas, revisión de líquido y rectificado de discos.',
      precio: 1200,
      icono: 'disc-outline',
      imagen: 'assets/imagenes/Logotipo_inicial.png',
    },
    {
      id_servicio: 4,
      nombre_servicio: 'Diagnóstico por Escáner',
      descripcion: 'Lectura completa de códigos de falla, sensores y computadora.',
      precio: 350,
      icono: 'speedometer-outline',
      imagen: 'assets/imagenes/Logotipo_inicial.png',
    },
  ];

  private vehiculos: Vehiculo[] = [
    {
      id_vehiculo: 1,
      marca: 'Nissan',
      modelo: 'Versa',
      anio: 2018,
      placas: 'ABC-123-A',
      color: 'Blanco',
      kilometraje: 48000,
    },
    {
      id_vehiculo: 2,
      marca: 'Honda',
      modelo: 'Civic',
      anio: 2020,
      placas: 'XYZ-987-B',
      color: 'Gris',
      kilometraje: 32500,
    },
  ];

  private carrito: Servicio[] = [];
  private vehiculoSeleccionado: Vehiculo | null = null;
  private fechaCita: string = '';
  private metodoPago: string = 'Efectivo en taller';
  private notasCita: string = '';
  private citas: Cita[] = [];
  private citaSeleccionada: Cita | null = null;

  // --- SESIÓN Y USUARIO ---
  iniciarSesion(correo: string): void {
    const nombreBase = correo.split('@')[0];
    this.usuarioActual = {
      nombre: nombreBase.charAt(0).toUpperCase() + nombreBase.slice(1),
      apellido_paterno: 'Cortés',
      correo: correo,
      telefono: '5551234567',
    };
  }

  registrarUsuario(usuario: Usuario): void {
    this.usuarioActual = usuario;
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  cerrarSesion(): void {
    this.usuarioActual = null;
  }

  // --- SERVICIOS ---
  getServicios(): Servicio[] {
    return this.servicios;
  }

  getServicioById(id: number): Servicio | undefined {
    return this.servicios.find((s) => s.id_servicio === id);
  }

  // --- CARRITO ---
  getCarrito(): Servicio[] {
    return this.carrito;
  }

  agregarAlCarrito(servicio: Servicio): void {
    const existe = this.carrito.some((s) => s.id_servicio === servicio.id_servicio);
    if (!existe) {
      this.carrito.push(servicio);
    }
  }

  eliminarDelCarrito(id_servicio: number): void {
    this.carrito = this.carrito.filter((s) => s.id_servicio !== id_servicio);
  }

  getTotalCarrito(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio, 0);
  }

  // --- VEHÍCULOS ---
  getVehiculos(): Vehiculo[] {
    return this.vehiculos;
  }

  agregarVehiculo(vehiculo: Omit<Vehiculo, 'id_vehiculo'>): void {
    this.vehiculos.push({
      ...vehiculo,
      id_vehiculo: Date.now(),
    });
  }

  seleccionarVehiculo(vehiculo: Vehiculo): void {
    this.vehiculoSeleccionado = vehiculo;
  }

  getVehiculoSeleccionado(): Vehiculo | null {
    return this.vehiculoSeleccionado;
  }

  // --- CITAS Y PAGO ---
  setFechaCita(fecha: string): void {
    this.fechaCita = fecha;
  }

  getFechaCita(): string {
    return this.fechaCita;
  }

  setMetodoPago(metodo: string): void {
    this.metodoPago = metodo;
  }

  getMetodoPago(): string {
    return this.metodoPago;
  }

  setNotasCita(notas: string): void {
    this.notasCita = notas;
  }

  getNotasCita(): string {
    return this.notasCita;
  }

  confirmarCita(): Cita | null {
    if (!this.vehiculoSeleccionado || this.carrito.length === 0) return null;

    const nuevaCita: Cita = {
      id_cita: Math.floor(1000 + Math.random() * 9000),
      vehiculo: this.vehiculoSeleccionado,
      servicios: [...this.carrito],
      fecha_hora: this.fechaCita || new Date().toISOString(),
      metodo_pago: this.metodoPago,
      total: this.getTotalCarrito(),
      estado: 'CONFIRMADA',
      notas: this.notasCita || undefined,
    };

    this.citas.unshift(nuevaCita);
    this.carrito = [];
    this.notasCita = '';
    return nuevaCita;
  }

  getCitas(): Cita[] {
    return this.citas;
  }

  setCitaDetalle(cita: Cita): void {
    this.citaSeleccionada = cita;
  }

  getCitaDetalle(): Cita | null {
    return this.citaSeleccionada;
  }
}