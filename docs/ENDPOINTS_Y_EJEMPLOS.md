# Documentación de Endpoints y Ejemplos JSON
**Proyecto:** Servicio Automotriz Cortes  
**APIs integradas:** FakeStoreAPI (`https://fakestoreapi.com`) y Stripe Sandbox (`https://api.stripe.com/v1`)

---

## Resumen de Endpoints

| Módulo | Método | Endpoint | Autenticación | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| Autenticación | `POST` | `/auth/login` | Pública | Autentica credenciales y devuelve un token JWT. |
| Usuarios | `GET` | `/users` | Pública | Obtiene usuarios para validar correo único y resolver `username`. |
| Usuarios | `POST` | `/users` | Pública | Registra un nuevo cliente con contraseña hasheada (SHA-256). |
| Catálogo | `GET` | `/products?limit=4` | `Bearer <token>` | Sincroniza el catálogo base de servicios. |
| Citas (Read) | `GET` | `/carts/user/:id` | `Bearer <token>` | Consulta el historial de citas asociadas al usuario. |
| Citas (Create) | `POST` | `/carts` | `Bearer <token>` | Registra una nueva cita con los servicios del carrito. |
| Citas (Update) | `PUT` | `/carts/:id` | `Bearer <token>` | Modifica la fecha, servicios o estado de una cita. |
| Citas (Delete) | `DELETE` | `/carts/:id` | `Bearer <token>` | Elimina un registro del historial de citas. |
| Pagos Sandbox | `POST` | `/v1/tokens` (Stripe) | `Bearer <pk_test>` | Tokeniza tarjetas de prueba y evalúa estados de pago. |

---

## Ejemplos de Petición y Respuesta (JSON)

### 1. Inicio de Sesión con JWT (`POST /auth/login`)

**Request Body:**
```json
{
  "username": "johnd",
  "password": "m38rmF$"
}
```

**Response (`200 OK`):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXIiOiJqb2huZCIsImlhdCI6MTczMjQ5MDQwMH0.s9x_EjemploFirmaJWT"
}
```

---

### 2. Registro de Usuario con Hash SHA-256 (`POST /users`)

**Request Body:**
```json
{
  "email": "mario.cortes@taller.com",
  "username": "mario.cortes",
  "password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
  "name": {
    "firstname": "Luis Mario",
    "lastname": "Verastegui"
  },
  "phone": "2711234567"
}
```

**Response (`200 OK`):**
```json
{
  "id": 11
}
```

---

### 3. Crear Cita de Servicio (`POST /carts`)

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Request Body:**
```json
{
  "userId": 1,
  "date": "2026-11-25",
  "products": [
    { "productId": 1, "quantity": 1 },
    { "productId": 2, "quantity": 1 }
  ]
}
```

**Response (`200 OK`):**
```json
{
  "id": 11,
  "userId": 1,
  "date": "2026-11-25",
  "products": [
    { "productId": 1, "quantity": 1 },
    { "productId": 2, "quantity": 1 }
  ]
}
```

---

### 4. Actualizar Cita (`PUT /carts/1`)

**Request Body:**
```json
{
  "userId": 1,
  "date": "2026-11-28",
  "products": [
    { "productId": 1, "quantity": 1 }
  ]
}
```

**Response (`200 OK`):**
```json
{
  "id": 1,
  "userId": 1,
  "date": "2026-11-28",
  "products": [
    { "productId": 1, "quantity": 1 }
  ]
}
```

---

### 5. Eliminar Cita (`DELETE /carts/1`)

**Response (`200 OK`):**
```json
{
  "id": 1,
  "userId": 1,
  "date": "2026-11-25",
  "products": [
    { "productId": 1, "quantity": 1 }
  ]
}
```

---

### 6. Pasarela de Pago Sandbox y Comprobantes (`PagoService`)

**Tarjetas de Prueba Soportadas:**
* **Éxito (`EXITO`):** `4242 4242 4242 4242`
* **Pendiente (`PENDIENTE`):** `4000 0000 0000 9995` (o pago presencial / transferencia)
* **Fallo (`FALLO`):** `4000 0000 0000 0002`

**Ejemplo de Respuesta de Tokenización Stripe (`200 OK`):**
```json
{
  "id": "tok_1Q9x8Z2eZvKYlo2C9v8k1a2b",
  "object": "token",
  "card": {
    "id": "card_1Q9x8Z2eZvKYlo2C",
    "brand": "Visa",
    "last4": "4242",
    "exp_month": 12,
    "exp_year": 2028
  },
  "livemode": false,
  "type": "card"
}
```

**Comprobante Interno Generado en la App (Estado `EXITO`):**
```json
{
  "estado": "EXITO",
  "transaccionId": "tok_1Q9x8Z2eZvKYlo2C9v8k1a2b",
  "folioRecibo": "REC-2026-482910",
  "mensaje": "Pago autorizado y confirmado mediante webhook Sandbox.",
  "fechaPago": "2026-11-24T18:15:00.000Z",
  "metodo": "Tarjeta •••• 4242",
  "monto": 2436.00,
  "webhookConfirmado": true
}
```