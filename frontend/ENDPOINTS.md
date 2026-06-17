# API Endpoints Reference - Bodega Fralexis

Referencia rápida de todos los endpoints disponibles en la API y cómo acceder a ellos desde el panel de administración.

## 📋 Tabla General de Endpoints

| Recurso | Método | Endpoint | Panel | Descripción |
|---------|--------|----------|-------|------------|
| Vinos | GET | `/api/vinos` | 🍇 Vinos - Tabla | Listar todos los vinos |
| Vinos | GET | `/api/vinos/:id` | 🍇 Vinos - Editar | Obtener un vino específico |
| Vinos | POST | `/api/vinos` | 🍇 Vinos - Nuevo | Crear nuevo vino |
| Vinos | PUT | `/api/vinos/:id` | 🍇 Vinos - Editar | Actualizar vino |
| Vinos | DELETE | `/api/vinos/:id` | 🍇 Vinos - Eliminar | Eliminar vino |
| Clientes | GET | `/api/clientes` | 👥 Clientes - Tabla | Listar todos los clientes |
| Clientes | GET | `/api/clientes/:id` | 👥 Clientes - Editar | Obtener cliente específico |
| Clientes | POST | `/api/clientes` | 👥 Clientes - Nuevo | Crear nuevo cliente |
| Clientes | PUT | `/api/clientes/:id` | 👥 Clientes - Editar | Actualizar cliente |
| Clientes | DELETE | `/api/clientes/:id` | 👥 Clientes - Eliminar | Eliminar cliente |
| Categorías | GET | `/api/categorias` | 📂 Categorías - Tabla | Listar categorías |
| Categorías | GET | `/api/categorias/:id` | 📂 Categorías - Editar | Obtener categoría |
| Categorías | POST | `/api/categorias` | 📂 Categorías - Nuevo | Crear categoría |
| Categorías | PUT | `/api/categorias/:id` | 📂 Categorías - Editar | Actualizar categoría |
| Categorías | DELETE | `/api/categorias/:id` | 📂 Categorías - Eliminar | Eliminar categoría |
| Pedidos | GET | `/api/pedidos` | 📦 Pedidos - Tabla | Listar pedidos |
| Pedidos | GET | `/api/pedidos/:id` | 📦 Pedidos - Ver | Obtener pedido específico |
| Pedidos | POST | `/api/pedidos` | 📦 Pedidos - Nuevo | Crear nuevo pedido |
| Detalle Pedido | GET | `/api/detalle-pedido` | 📋 Detalles - Tabla | Listar detalles |
| Detalle Pedido | GET | `/api/detalle-pedido/:id` | 📋 Detalles - Editar | Obtener detalle específico |
| Detalle Pedido | POST | `/api/detalle-pedido` | 📋 Detalles - Nuevo | Agregar vino a pedido |
| Detalle Pedido | DELETE | `/api/detalle-pedido/:id` | 📋 Detalles - Eliminar | Eliminar línea de pedido |

## 🍇 VINOS

### Base URL: `/api/vinos`

#### GET - Listar todos
```
GET /api/vinos
Respuesta: Array de vinos
```

**Campos esperados en respuesta:**
- `id`: Identificador único
- `nombre`: Nombre del vino
- `marca`: Marca del vino
- `tipoUva`: Tipo de uva
- `tipoVino`: Tipo (Tinto, Blanco, Rosado, Espumante)
- `anoCosecha`: Año de cosecha
- `tamanoMl`: Tamaño en mililitros
- `precioMinorista`: Precio para minoristas
- `precioMayorista`: Precio para mayoristas
- `stock`: Cantidad en stock
- `esOferta`: Es producto en oferta

#### GET - Obtener uno
```
GET /api/vinos/:id
Respuesta: Objeto vino completo
```

#### POST - Crear
```
POST /api/vinos
Content-Type: application/json

{
  "nombre": "Malbec Reserva",
  "marca": "Finca Fralexis",
  "tipoUva": "Malbec",
  "tipoVino": "Tinto",
  "anoCosecha": 2020,
  "tamanoMl": 750,
  "precioMinorista": 250.00,
  "precioMayorista": 180.00,
  "stock": 100,
  "esOferta": false
}

Respuesta: {id: ..., status: 201}
```

#### PUT - Actualizar
```
PUT /api/vinos/:id
Content-Type: application/json

{...campos a actualizar...}

Respuesta: {status: 200}
```

#### DELETE - Eliminar
```
DELETE /api/vinos/:id
Respuesta: {status: 200}
```

---

## 👥 CLIENTES

### Base URL: `/api/clientes`

#### GET - Listar todos
```
GET /api/clientes
Respuesta: Array de clientes
```

**Campos esperados:**
- `id`: ID único
- `nombre`: Nombre
- `apellido`: Apellido
- `email`: Email del cliente
- `telefono`: Teléfono
- `direccionEnvio`: Dirección de envío
- `tipo`: MINORISTA o MAYORISTA
- `cuit`: CUIT (solo para mayoristas)

#### POST - Crear
```
POST /api/clientes
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "telefono": "+54911234567",
  "direccionEnvio": "Calle Principal 123",
  "tipo": "MINORISTA"
}

Para mayorista añadir:
  "cuit": "20123456789"
```

#### PUT - Actualizar
```
PUT /api/clientes/:id
{...campos a actualizar...}
```

#### DELETE - Eliminar
```
DELETE /api/clientes/:id
```

---

## 📂 CATEGORÍAS

### Base URL: `/api/categorias`

#### GET - Listar
```
GET /api/categorias
Respuesta: Array de categorías
```

**Campos:**
- `id`: ID único
- `nombre`: Nombre de categoría
- `descripcion`: Descripción

#### POST - Crear
```
POST /api/categorias
{
  "nombre": "Tintos Reserva",
  "descripcion": "Selección premium de vinos tintos"
}
```

#### PUT - Actualizar
```
PUT /api/categorias/:id
{
  "nombre": "...",
  "descripcion": "..."
}
```

#### DELETE - Eliminar
```
DELETE /api/categorias/:id
```

---

## 📦 PEDIDOS

### Base URL: `/api/pedidos`

#### GET - Listar
```
GET /api/pedidos
Respuesta: Array de pedidos
```

**Campos:**
- `id_pedido` o `id`: ID del pedido
- `id_cliente`: ID del cliente
- `nombreCliente`: Nombre del cliente (opcional)
- `estado`: Estado (Pendiente, Confirmado, Enviado, Entregado, Cancelado)
- `total`: Total del pedido
- `fecha`: Fecha de creación

#### GET - Obtener uno
```
GET /api/pedidos/:id
```

#### POST - Crear
```
POST /api/pedidos
{
  "id_cliente": 1,
  "estado": "Pendiente"
}
```

#### DELETE - Eliminar
```
DELETE /api/pedidos/:id
```

---

## 📋 DETALLES DE PEDIDO

### Base URL: `/api/detalle-pedido`

#### GET - Listar
```
GET /api/detalle-pedido
Respuesta: Array de líneas de pedido
```

**Campos:**
- `id_detalle` o `id`: ID del detalle
- `id_pedido`: ID del pedido
- `id_vino`: ID del vino
- `nombreVino`: Nombre del vino (opcional)
- `cantidad`: Cantidad de botellas
- `precio_unitario` o `precioUnitario`: Precio por botella
- `subtotal`: Subtotal de la línea

#### GET - Obtener uno
```
GET /api/detalle-pedido/:id
```

#### POST - Agregar vino a pedido
```
POST /api/detalle-pedido
{
  "id_pedido": 1,
  "id_vino": 5,
  "cantidad": 10,
  "precio_unitario": 250.00
}

Cálculo automático:
  subtotal = cantidad × precio_unitario
  total_pedido = suma de subtotales
```

#### DELETE - Eliminar línea
```
DELETE /api/detalle-pedido/:id
```

---

## 🔄 Flujo de Uso Típico

### 1. Crear Vino
```
POST /api/vinos → Aparece en tabla Vinos
```

### 2. Crear Cliente
```
POST /api/clientes → Aparece en tabla Clientes
```

### 3. Crear Pedido
```
POST /api/pedidos → Aparece en tabla Pedidos
```

### 4. Agregar Vinos al Pedido
```
POST /api/detalle-pedido → Aparece en Detalles, actualiza total del pedido
```

### 5. Consultar Detalles
```
GET /api/detalle-pedido → Ver líneas del pedido
```

---

## 📝 Notas Importantes

### Sobre los IDs
- Los IDs se generan automáticamente en el servidor
- Al crear, el servidor retorna el ID asignado
- Los IDs son incrementales (1, 2, 3...)

### Cálculos Automáticos
- **Subtotal de línea**: `cantidad × precio_unitario`
- **Total de pedido**: `suma de subtotales de todas las líneas`

### Validaciones Esperadas
- Email debe ser válido
- Stock no puede ser negativo
- Precios deben ser positivos
- Cliente debe existir antes de crear pedido
- Vino debe existir antes de agregar a pedido

### Estados de Pedidos
1. **Pendiente**: Recién creado, sin procesar
2. **Confirmado**: Aceptado por el cliente
3. **Enviado**: Enviado al cliente
4. **Entregado**: Recibido por el cliente
5. **Cancelado**: Pedido cancelado

---

## 🧪 Ejemplo de Secuencia Completa

```javascript
// 1. Crear vino
POST /api/vinos
Response: {id: 1, nombre: "Malbec", ...}

// 2. Crear cliente  
POST /api/clientes
Response: {id: 1, nombre: "Juan", ...}

// 3. Crear pedido
POST /api/pedidos
{id_cliente: 1, estado: "Pendiente"}
Response: {id_pedido: 1, total: 0, ...}

// 4. Agregar vino al pedido
POST /api/detalle-pedido
{id_pedido: 1, id_vino: 1, cantidad: 5, precio_unitario: 250}
Response: {id_detalle: 1, subtotal: 1250}

// 5. Listar detalles
GET /api/detalle-pedido
Response: [{id_detalle: 1, subtotal: 1250, ...}]

// 6. Obtener pedido completo
GET /api/pedidos/1
Response: {id_pedido: 1, total: 1250, ...}
```

---

**Última Actualización**: Junio 2026  
**API Version**: 1.0.0
