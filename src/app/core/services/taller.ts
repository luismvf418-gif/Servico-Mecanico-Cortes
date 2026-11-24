import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResultadoPago } from './pago';

export interface Usuario {
  id?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  correo: string;
  telefono: string;
  password_hash?: string;
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
  subtotal: number;
  iva: number;
  total: number;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'COMPLETADA' | 'CANCELADA';
  notas?: string;
  pago?: ResultadoPago;
}

interface FakeStoreUser {
  id: number;
  email: string;
  username: string;
  password: string;
  name: { firstname: string; lastname: string };
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class TallerService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://fakestoreapi.com';

  private readonly STORAGE_KEYS = {
    USUARIO: 'cortes_usuario_actual',
    USUARIOS_REGISTRADOS: 'cortes_usuarios_registrados',
    TOKEN: 'cortes_auth_token',
    VEHICULOS: 'cortes_vehiculos',
    CARRITO: 'cortes_carrito',
    CITAS: 'cortes_citas',
  };

  private usuarioActual: Usuario | null = null;
  private usuariosRegistrados: Usuario[] = [];
  private authToken: string | null = null;

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

  constructor() {
    this.cargarDesdeStorage();
  }

  // --- ENCABEZADOS HTTP CON TOKEN ---
  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (this.authToken) {
      headers = headers.set('Authorization', `Bearer ${this.authToken}`);
    }
    return headers;
  }

  getToken(): string | null {
    return this.authToken;
  }

  // --- HASH SHA-256 DE CONTRASEÑA ---
  async hashContrasena(textoPlano: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(textoPlano);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // --- PERSISTENCIA EN LOCALSTORAGE ---
  private cargarDesdeStorage(): void {
    try {
      const usuarioGuardado = localStorage.getItem(this.STORAGE_KEYS.USUARIO);
      if (usuarioGuardado) {
        this.usuarioActual = JSON.parse(usuarioGuardado);
      }

      const listaUsuarios = localStorage.getItem(
        this.STORAGE_KEYS.USUARIOS_REGISTRADOS
      );
      if (listaUsuarios) {
        this.usuariosRegistrados = JSON.parse(listaUsuarios);
      }

      this.authToken = localStorage.getItem(this.STORAGE_KEYS.TOKEN);

      const vehiculosGuardados = localStorage.getItem(
        this.STORAGE_KEYS.VEHICULOS
      );
      if (vehiculosGuardados) {
        this.vehiculos = JSON.parse(vehiculosGuardados);
      }

      const carritoGuardado = localStorage.getItem(this.STORAGE_KEYS.CARRITO);
      if (carritoGuardado) {
        this.carrito = JSON.parse(carritoGuardado);
      }

      const citasGuardadas = localStorage.getItem(this.STORAGE_KEYS.CITAS);
      if (citasGuardadas) {
        const parsed: Cita[] = JSON.parse(citasGuardadas);
        this.citas = parsed.map((c) => {
          const subtotal =
            c.subtotal ?? c.servicios.reduce((acc, s) => acc + s.precio, 0);
          const iva = c.iva ?? Math.round(subtotal * 0.16 * 100) / 100;
          return {
            ...c,
            subtotal,
            iva,
            total: c.total ?? subtotal + iva,
          };
        });
      }
    } catch (error) {
      console.error('Error al cargar datos de localStorage:', error);
    }
  }

  private guardarEnStorage(): void {
    try {
      if (this.usuarioActual) {
        localStorage.setItem(
          this.STORAGE_KEYS.USUARIO,
          JSON.stringify(this.usuarioActual)
        );
      } else {
        localStorage.removeItem(this.STORAGE_KEYS.USUARIO);
      }

      if (this.authToken) {
        localStorage.setItem(this.STORAGE_KEYS.TOKEN, this.authToken);
      } else {
        localStorage.removeItem(this.STORAGE_KEYS.TOKEN);
      }

      localStorage.setItem(
        this.STORAGE_KEYS.USUARIOS_REGISTRADOS,
        JSON.stringify(this.usuariosRegistrados)
      );
      localStorage.setItem(
        this.STORAGE_KEYS.VEHICULOS,
        JSON.stringify(this.vehiculos)
      );
      localStorage.setItem(
        this.STORAGE_KEYS.CARRITO,
        JSON.stringify(this.carrito)
      );
      localStorage.setItem(
        this.STORAGE_KEYS.CITAS,
        JSON.stringify(this.citas)
      );
    } catch (error) {
      console.error('Error al guardar datos en localStorage:', error);
    }
  }

  // --- AUTENTICACIÓN Y REGISTRO CON API REST (FAKESTOREAPI) ---
  async registrarUsuarioApi(
    datos: Omit<Usuario, 'id' | 'password_hash'> & { contrasena: string }
  ): Promise<Usuario> {
    const correoNormalizado = datos.correo.trim().toLowerCase();

    const existeLocal = this.usuariosRegistrados.some(
      (u) => u.correo.toLowerCase() === correoNormalizado
    );
    if (existeLocal) {
      throw new Error('Este correo electrónico ya se encuentra registrado.');
    }

    const usuariosApi = await firstValueFrom(
      this.http.get<FakeStoreUser[]>(`${this.API_URL}/users`)
    );
    const existeEnApi = usuariosApi.some(
      (u) => u.email.toLowerCase() === correoNormalizado
    );
    if (existeEnApi) {
      throw new Error('El correo ya pertenece a una cuenta registrada en la API.');
    }

    const passwordHash = await this.hashContrasena(datos.contrasena);

    const payloadApi = {
      email: correoNormalizado,
      username: correoNormalizado.split('@')[0],
      password: passwordHash,
      name: {
        firstname: datos.nombre,
        lastname: datos.apellido_paterno,
      },
      phone: datos.telefono,
    };

    const respuestaApi = await firstValueFrom(
      this.http.post<{ id: number }>(`${this.API_URL}/users`, payloadApi)
    );

    const nuevoUsuario: Usuario = {
      id: respuestaApi?.id || Date.now(),
      nombre: datos.nombre,
      apellido_paterno: datos.apellido_paterno,
      apellido_materno: datos.apellido_materno,
      correo: correoNormalizado,
      telefono: datos.telefono,
      password_hash: passwordHash,
    };

    this.usuariosRegistrados.push(nuevoUsuario);
    this.usuarioActual = nuevoUsuario;
    this.authToken = `jwt_cortes_${btoa(correoNormalizado)}_${Date.now()}`;
    this.guardarEnStorage();

    return nuevoUsuario;
  }

  async iniciarSesionApi(
    correoOUser: string,
    contrasena: string
  ): Promise<Usuario> {
    const identificador = correoOUser.trim().toLowerCase();
    const passwordHash = await this.hashContrasena(contrasena);

    const usuarioLocal = this.usuariosRegistrados.find(
      (u) => u.correo.toLowerCase() === identificador
    );

    if (usuarioLocal) {
      if (usuarioLocal.password_hash !== passwordHash) {
        throw new Error('Contraseña incorrecta.');
      }
      this.usuarioActual = usuarioLocal;
      this.authToken = `jwt_cortes_${btoa(identificador)}_${Date.now()}`;
      this.guardarEnStorage();
      return usuarioLocal;
    }

    const usuariosApi = await firstValueFrom(
      this.http.get<FakeStoreUser[]>(`${this.API_URL}/users`)
    );
    const encontradoApi = usuariosApi.find(
      (u) =>
        u.email.toLowerCase() === identificador ||
        u.username.toLowerCase() === identificador
    );

    if (!encontradoApi) {
      throw new Error('Usuario o correo no encontrado. Regístrate primero.');
    }

    const loginResp = await firstValueFrom(
      this.http.post<{ token: string }>(`${this.API_URL}/auth/login`, {
        username: encontradoApi.username,
        password: contrasena,
      })
    );

    this.authToken = loginResp.token;
    this.usuarioActual = {
      id: encontradoApi.id,
      nombre:
        encontradoApi.name.firstname.charAt(0).toUpperCase() +
        encontradoApi.name.firstname.slice(1),
      apellido_paterno:
        encontradoApi.name.lastname.charAt(0).toUpperCase() +
        encontradoApi.name.lastname.slice(1),
      correo: encontradoApi.email,
      telefono: encontradoApi.phone,
    };

    this.guardarEnStorage();
    return this.usuarioActual;
  }

  iniciarSesion(correo: string): void {
    const nombreBase = correo.split('@')[0];
    this.usuarioActual = {
      nombre: nombreBase.charAt(0).toUpperCase() + nombreBase.slice(1),
      apellido_paterno: 'Cortés',
      correo: correo,
      telefono: '5551234567',
    };
    this.guardarEnStorage();
  }

  registrarUsuario(usuario: Usuario): void {
    this.usuarioActual = usuario;
    this.guardarEnStorage();
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  cerrarSesion(): void {
    this.usuarioActual = null;
    this.authToken = null;
    this.guardarEnStorage();
  }

  // --- SERVICIOS (GET /products) ---
  getServicios(): Servicio[] {
    return this.servicios;
  }

  async sincronizarCatalogoApi(): Promise<void> {
    try {
      await firstValueFrom(
        this.http.get(`${this.API_URL}/products?limit=4`, {
          headers: this.getAuthHeaders(),
        })
      );
    } catch (error) {
      console.warn('No se pudo verificar catálogo remoto:', error);
    }
  }

  getServicioById(id: number): Servicio | undefined {
    return this.servicios.find((s) => s.id_servicio === id);
  }

  // --- CARRITO Y CÁLCULO SUBTOTAL / IVA / TOTAL ---
  getCarrito(): Servicio[] {
    return this.carrito;
  }

  agregarAlCarrito(servicio: Servicio): void {
    const existe = this.carrito.some(
      (s) => s.id_servicio === servicio.id_servicio
    );
    if (!existe) {
      this.carrito.push(servicio);
      this.guardarEnStorage();
    }
  }

  eliminarDelCarrito(id_servicio: number): void {
    this.carrito = this.carrito.filter((s) => s.id_servicio !== id_servicio);
    this.guardarEnStorage();
  }

  getSubtotalCarrito(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio, 0);
  }

  getIvaCarrito(): number {
    return Math.round(this.getSubtotalCarrito() * 0.16 * 100) / 100;
  }

  getTotalCarrito(): number {
    return this.getSubtotalCarrito();
  }

  getTotalConIvaCarrito(): number {
    return this.getSubtotalCarrito() + this.getIvaCarrito();
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
    this.guardarEnStorage();
  }

  seleccionarVehiculo(vehiculo: Vehiculo): void {
    this.vehiculoSeleccionado = vehiculo;
  }

  getVehiculoSeleccionado(): Vehiculo | null {
    return this.vehiculoSeleccionado;
  }

  // --- CITAS Y PAGO (CRUD API REST + LOCALSTORAGE) ---
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

  // GET /carts/user/:id
  async consultarCitasApi(): Promise<Cita[]> {
    const userId = this.usuarioActual?.id || 1;
    await firstValueFrom(
      this.http.get(`${this.API_URL}/carts/user/${userId}`, {
        headers: this.getAuthHeaders(),
      })
    );
    return this.citas;
  }

  // POST /carts
  confirmarCita(resultadoPago?: ResultadoPago): Cita | null {
    if (!this.vehiculoSeleccionado || this.carrito.length === 0) return null;

    const subtotal = this.getSubtotalCarrito();
    const iva = this.getIvaCarrito();
    const total = subtotal + iva;

    const nuevaCita: Cita = {
      id_cita: Math.floor(1000 + Math.random() * 9000),
      vehiculo: this.vehiculoSeleccionado,
      servicios: [...this.carrito],
      fecha_hora: this.fechaCita || new Date().toISOString(),
      metodo_pago: this.metodoPago,
      subtotal,
      iva,
      total,
      estado: resultadoPago?.estado === 'PENDIENTE' ? 'PENDIENTE' : 'CONFIRMADA',
      notas: this.notasCita || undefined,
      pago: resultadoPago,
    };

    // Petición POST real a FakeStoreAPI /carts
    const payloadCart = {
      userId: this.usuarioActual?.id || 1,
      date: new Date().toISOString().split('T')[0],
      products: nuevaCita.servicios.map((s) => ({
        productId: s.id_servicio,
        quantity: 1,
      })),
    };

    this.http
      .post(`${this.API_URL}/carts`, payloadCart, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: (res) => console.log('POST /carts exitoso:', res),
        error: (err) => console.error('Error en POST /carts:', err),
      });

    this.citas.unshift(nuevaCita);
    this.carrito = [];
    this.notasCita = '';
    this.guardarEnStorage();
    return nuevaCita;
  }

  getCitas(): Cita[] {
    return this.citas;
  }

  filtrarYOrdenarCitas(
    orden: 'recientes' | 'antiguas' = 'recientes',
    fechaFiltro?: string,
    estadoFiltro?: string
  ): Cita[] {
    let resultado = [...this.citas];

    if (fechaFiltro && fechaFiltro.trim() !== '') {
      resultado = resultado.filter((c) =>
        c.fecha_hora.startsWith(fechaFiltro.trim())
      );
    }

    if (estadoFiltro && estadoFiltro !== 'TODAS') {
      resultado = resultado.filter((c) => c.estado === estadoFiltro);
    }

    resultado.sort((a, b) => {
      const tiempoA = new Date(a.fecha_hora).getTime() || 0;
      const tiempoB = new Date(b.fecha_hora).getTime() || 0;
      return orden === 'recientes' ? tiempoB - tiempoA : tiempoA - tiempoB;
    });

    return resultado;
  }

  // PUT /carts/:id
  editarCita(
    id_cita: number,
    cambios: Partial<
      Pick<Cita, 'fecha_hora' | 'metodo_pago' | 'notas' | 'estado'>
    >
  ): boolean {
    const index = this.citas.findIndex((c) => c.id_cita === id_cita);
    if (index === -1) return false;

    this.citas[index] = {
      ...this.citas[index],
      ...cambios,
    };

    if (this.citaSeleccionada?.id_cita === id_cita) {
      this.citaSeleccionada = this.citas[index];
    }

    // Petición PUT real a FakeStoreAPI /carts/:id
    const cartIdApi = (id_cita % 7) + 1;
    this.http
      .put(
        `${this.API_URL}/carts/${cartIdApi}`,
        {
          userId: this.usuarioActual?.id || 1,
          date: new Date().toISOString().split('T')[0],
          products: this.citas[index].servicios.map((s) => ({
            productId: s.id_servicio,
            quantity: 1,
          })),
        },
        { headers: this.getAuthHeaders() }
      )
      .subscribe({
        next: (res) => console.log(`PUT /carts/${cartIdApi} exitoso:`, res),
        error: (err) => console.error(`Error en PUT /carts/${cartIdApi}:`, err),
      });

    this.guardarEnStorage();
    return true;
  }

  cancelarCita(id_cita: number): boolean {
    return this.editarCita(id_cita, { estado: 'CANCELADA' });
  }

  // DELETE /carts/:id
  eliminarCita(id_cita: number): boolean {
    const longitudInicial = this.citas.length;
    this.citas = this.citas.filter((c) => c.id_cita !== id_cita);

    if (this.citas.length === longitudInicial) return false;

    if (this.citaSeleccionada?.id_cita === id_cita) {
      this.citaSeleccionada = null;
    }

    // Petición DELETE real a FakeStoreAPI /carts/:id
    const cartIdApi = (id_cita % 7) + 1;
    this.http
      .delete(`${this.API_URL}/carts/${cartIdApi}`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: (res) => console.log(`DELETE /carts/${cartIdApi} exitoso:`, res),
        error: (err) =>
          console.error(`Error en DELETE /carts/${cartIdApi}:`, err),
      });

    this.guardarEnStorage();
    return true;
  }

  setCitaDetalle(cita: Cita): void {
    this.citaSeleccionada = cita;
  }

  getCitaDetalle(): Cita | null {
    return this.citaSeleccionada;
  }
}