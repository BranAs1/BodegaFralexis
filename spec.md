# Especificación Técnica - E-commerce Bodega Fralexis

**Versión:** 2.0.0
**Fecha:** Junio 2026
**Estado:** Documento Técnico de Referencia

---

# 1. Introducción

Este documento describe la arquitectura técnica y funcional del sistema **Bodega Fralexis**, una aplicación de gestión para una bodega virtual desarrollada utilizando **Node.js**, **Express.js**, **MariaDB** y principios de **Programación Orientada a Objetos (POO)**.

El sistema permite administrar vinos, clientes, categorías, pedidos y detalles de pedidos mediante una API REST organizada en capas para facilitar el mantenimiento y la escalabilidad.

---

# 2. Stack Tecnológico

* **Entorno de Ejecución:** Node.js
* **Framework Web:** Express.js
* **Base de Datos:** MariaDB
* **Gestión de Módulos:** ES Modules (import/export)
* **Acceso a Datos:** mysql2
* **Formato de Intercambio:** JSON
* **Control de Versiones:** Git y GitHub

---

# 3. Arquitectura del Sistema

El sistema implementa una arquitectura en capas basada en el patrón:

Controller → Service → Repository → Database

## 3.1 Capa de Aplicación

### app.js

Responsable de:

* Inicializar Express.
* Configurar middlewares.
* Registrar rutas.
* Iniciar el servidor HTTP.

---

## 3.2 Capa de Rutas

Define los endpoints de la API:

* vinoRoutes.js
* clienteRoutes.js
* categoriaRoutes.js
* pedidoRoutes.js
* detallePedidoRoutes.js

---

## 3.3 Capa de Controladores

Responsable de:

* Recibir solicitudes HTTP.
* Validar parámetros básicos.
* Delegar la lógica a los servicios.
* Devolver respuestas HTTP.

Controladores:

* VinoController
* ClienteController
* CategoriaController
* PedidoController
* DetallePedidoController

---

## 3.4 Capa de Servicios

Contiene la lógica de negocio.

Servicios:

* VinoService
* ClienteService
* CategoriaService
* PedidoService
* DetallePedidoService

Responsabilidades:

* Orquestar operaciones.
* Aplicar reglas de negocio.
* Transformar datos.
* Instanciar objetos de dominio.

---

## 3.5 Capa Repository

Responsable de la persistencia de datos.

Repositories:

* VinoRepository
* ClienteRepository
* PedidoRepository
* DetallePedidoRepository

Funciones:

* Ejecutar consultas SQL.
* Conectarse a MariaDB.
* Encapsular el acceso a datos.

---

## 3.6 Base de Datos

Motor utilizado:

**MariaDB**

Base de datos:

```sql
bodega
```

Tablas principales:

* vino
* cliente
* categoria
* pedido
* detalle_pedido

---

# 4. Modelo de Dominio

## 4.1 Productos

### Producto

Clase base.

Atributos:

* id
* nombre
* marca
* precioMinorista
* precioMayorista
* stock
* esOferta

---

### Vino

Hereda de Producto.

Atributos adicionales:

* tipoUva
* tipoVino
* anoCosecha
* tamanoMl

---

## 4.2 Clientes

### Cliente

Clase base.

Atributos:

* id
* nombre
* apellido
* email
* telefono
* direccionEnvio

---

### ClienteMinorista

Hereda de Cliente.

Atributo:

* tipo = MINORISTA

---

### ClienteMayorista

Hereda de Cliente.

Atributos:

* tipo = MAYORISTA
* cuit

---

## 4.3 Categorías

### Categoria

Atributos:

* id
* nombre
* descripcion

---

## 4.4 Pedidos

### Pedido

Representa una compra realizada por un cliente.

Atributos principales:

* id_pedido
* id_cliente
* estado
* total
* fecha

---

## 4.5 Detalle de Pedido

### DetallePedido

Representa los productos incluidos en un pedido.

Atributos:

* id_detalle
* id_pedido
* id_vino
* cantidad
* precio_unitario
* subtotal

---

# 5. API REST

## 5.1 Vinos

Ruta base:

```http
/api/vinos
```

| Método | Endpoint |
| ------ | -------- |
| GET    | /        |
| GET    | /:id     |
| POST   | /        |
| PUT    | /:id     |
| DELETE | /:id     |

---

## 5.2 Clientes

Ruta base:

```http
/api/clientes
```

| Método | Endpoint |
| ------ | -------- |
| GET    | /        |
| GET    | /:id     |
| POST   | /        |
| PUT    | /:id     |
| DELETE | /:id     |

---

## 5.3 Categorías

Ruta base:

```http
/api/categorias
```

| Método | Endpoint |
| ------ | -------- |
| GET    | /        |
| GET    | /:id     |
| POST   | /        |
| PUT    | /:id     |
| DELETE | /:id     |

---

## 5.4 Pedidos

Ruta base:

```http
/api/pedidos
```

| Método | Endpoint |
| ------ | -------- |
| GET    | /        |
| GET    | /:id     |
| POST   | /        |

---

## 5.5 Detalle de Pedido

Ruta base:

```http
/api/detalle-pedido
```

| Método | Endpoint |
| ------ | -------- |
| GET    | /        |
| GET    | /:id     |
| POST   | /        |

---

# 6. Estructura del Proyecto

```text
src/
│
├── app.js
│
├── config/
│   └── db.js
│
├── controllers/
│
├── services/
│
├── repositories/
│
├── routes/
│
├── models/
│
└── data/
```

---

# 7. Principios de Programación Orientada a Objetos

El proyecto aplica:

## Encapsulamiento

Las entidades encapsulan sus atributos y comportamiento.

## Herencia

* Producto → Vino
* Cliente → ClienteMayorista
* Cliente → ClienteMinorista

## Abstracción

Separación clara entre:

* Controladores
* Servicios
* Repositorios
* Modelos

## Polimorfismo

Los distintos tipos de cliente pueden ser tratados como instancias de Cliente.

---

# 8. Mejoras Futuras

* Autenticación con JWT.
* Gestión de usuarios y roles.
* Integración con Mercado Pago.
* Envío de correos automáticos.
* Filtros avanzados de búsqueda.
* Swagger/OpenAPI.
* Validaciones con Joi o Zod.
* Middleware global de manejo de errores.
* Frontend web integrado.

---

# 9. Autores

Proyecto desarrollado para la materia Programación Orientada a Objetos.

**Bodega Fralexis - 2026**

