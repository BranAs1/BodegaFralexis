# Bodega Fralexis - E-Commerce

Sistema de gestión para una bodega virtual desarrollado con Node.js, Express y MariaDB, implementando una arquitectura en capas basada en Controller-Service-Repository.

Proyecto realizado para la materia Programación Orientada a Objetos (POO), con el objetivo de aplicar conceptos de herencia, encapsulamiento, abstracción y composición mediante el desarrollo de una API REST para la gestión de una bodega virtual.

---

## Arquitectura y Patrones

El proyecto sigue buenas prácticas de Programación Orientada a Objetos (POO) y patrones de diseño.

### Arquitectura en Capas

**Models**

* Entidades de dominio del sistema.
* Herencia aplicada:

  * Cliente → ClienteMinorista
  * Cliente → ClienteMayorista
  * Producto → Vino

**Controllers**

* Reciben las solicitudes HTTP.
* Gestionan las respuestas de la API.

**Services**

* Contienen la lógica de negocio.
* Validan reglas y coordinan operaciones.

**Repositories**

* Abstraen el acceso a datos.
* Realizan consultas SQL sobre MariaDB.

### Principios Aplicados

* Programación Orientada a Objetos (POO)
* Herencia
* Encapsulamiento
* Abstracción
* Composición
* Single Responsibility Principle (SRP)
* Arquitectura Controller-Service-Repository

---

## Modelo de Dominio

### Herencia

Cliente
├── ClienteMinorista
└── ClienteMayorista

Producto
└── Vino

### Relaciones

* Un Cliente puede realizar varios Pedidos.
* Un Pedido pertenece a un Cliente.
* Un Pedido contiene uno o varios DetallePedido.
* Cada DetallePedido referencia a un Vino.
* El total de un Pedido se calcula automáticamente a partir de los subtotales de sus detalles.

---

## Tecnologías Utilizadas

* Node.js
* Express.js
* MariaDB
* MySQL2
* JavaScript ES6 Modules
* Git
* GitHub
* Thunder Client
* Visual Studio Code

---

## Requisitos

* Node.js v20 o superior
* MariaDB
* NPM

---

## Instalación

Instalar las dependencias:

```bash
npm install
```

---

## Ejecución

Iniciar el servidor:

```bash
npm start
```

Servidor disponible en:

```txt
http://localhost:3000
```

---

## Estructura del Proyecto

```txt
src/
├── config/
├── controllers/
├── models/
├── repositories/
├── routes/
├── services/
└── app.js
```

---

## Base de Datos

El sistema utiliza MariaDB.

Tablas principales:

* vino
* cliente
* categoria
* pedido
* detalle_pedido

---

## Endpoints Disponibles

### Vinos

| Método | Ruta           | Descripción             |
| ------ | -------------- | ----------------------- |
| GET    | /api/vinos     | Obtener todos los vinos |
| GET    | /api/vinos/:id | Obtener un vino por ID  |
| POST   | /api/vinos     | Crear un nuevo vino     |
| PUT    | /api/vinos/:id | Actualizar un vino      |
| DELETE | /api/vinos/:id | Eliminar un vino        |

---

### Clientes

| Método | Ruta              | Descripción                |
| ------ | ----------------- | -------------------------- |
| GET    | /api/clientes     | Obtener todos los clientes |
| GET    | /api/clientes/:id | Obtener un cliente por ID  |
| POST   | /api/clientes     | Crear un nuevo cliente     |
| PUT    | /api/clientes/:id | Actualizar un cliente      |
| DELETE | /api/clientes/:id | Eliminar un cliente        |

---

### Categorías

| Método | Ruta                | Descripción                  |
| ------ | ------------------- | ---------------------------- |
| GET    | /api/categorias     | Obtener todas las categorías |
| GET    | /api/categorias/:id | Obtener una categoría por ID |
| POST   | /api/categorias     | Crear una nueva categoría    |
| PUT    | /api/categorias/:id | Actualizar una categoría     |
| DELETE | /api/categorias/:id | Eliminar una categoría       |

---

### Pedidos

| Método | Ruta             | Descripción               |
| ------ | ---------------- | ------------------------- |
| GET    | /api/pedidos     | Obtener todos los pedidos |
| GET    | /api/pedidos/:id | Obtener un pedido por ID  |
| POST   | /api/pedidos     | Crear un nuevo pedido     |

---

### Detalle de Pedido

| Método | Ruta                    | Descripción                      |
| ------ | ----------------------- | -------------------------------- |
| GET    | /api/detalle-pedido     | Obtener todos los detalles       |
| GET    | /api/detalle-pedido/:id | Obtener un detalle por ID        |
| POST   | /api/detalle-pedido     | Crear un nuevo detalle de pedido |

---

## Herramientas de Desarrollo

Durante el desarrollo del backend se utilizaron:

* Visual Studio Code para la programación.
* Thunder Client para pruebas de endpoints REST.
* phpMyAdmin para administración de la base de datos MariaDB.
* Git y GitHub para control de versiones.

---

## Estado del Proyecto

✔ CRUD completo de Vinos

✔ CRUD completo de Clientes

✔ CRUD completo de Categorías

✔ Gestión de Pedidos

✔ Gestión de Detalles de Pedido

✔ Consulta por ID en entidades principales

✔ Actualización automática del total del pedido

✔ Persistencia mediante MariaDB

✔ Arquitectura Controller-Service-Repository

✔ Aplicación de Programación Orientada a Objetos

✔ API REST funcional

---

## Proyecto Académico

Trabajo práctico grupal desarrollado para la Tecnicatura Superior en Desarrollo de Software.

Proyecto: Bodega Fralexis.
