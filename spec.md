# Especificación Técnica - E-commerce Bodega Fralexis

**Versión:** 1.1.0
**Fecha:** 29 de abril de 2026
**Estado:** Documento Técnico de Referencia

## 1. Introducción
Este documento detalla la arquitectura técnica y funcional del sistema "Bodega Fralexis". El proyecto está construido sobre Node.js utilizando una arquitectura orientada a objetos (POO) con un patrón de diseño en capas (Controller-Service-Repository), asegurando escalabilidad y mantenibilidad.

---

## 2. Stack Tecnológico
*   **Entorno de Ejecución:** Node.js (v18+)
*   **Framework Web:** Express.js
*   **Gestión de Módulos:** ES Modules (import/export)
*   **Persistencia:** Archivos JSON locales (Simulación de base de datos NoSQL)
*   **Formato de Intercambio:** JSON

---

## 3. Arquitectura del Sistema

El sistema implementa una **Arquitectura en Capas**:

### 3.1 Capa de Aplicación (Entry Point)
*   `src/app.js`: Configuración del servidor Express, middlewares de parsing y enrutamiento global.

### 3.2 Capa de Controladores y Rutas
*   Maneja las peticiones HTTP, extrae parámetros y delega la lógica a los servicios.
*   **Rutas:** `vinoRoutes.js`, `clienteRoutes.js`, `categoriaRoutes.js`.
*   **Controladores:** Encargados de enviar las respuestas con los códigos de estado HTTP adecuados (200, 201, 404, 500).

### 3.3 Capa de Servicio (Business Logic)
*   Contiene la lógica de negocio central.
*   Realiza la instanciación de objetos de dominio a partir de datos crudos (hidratación de objetos).
*   **`ClienteService`**: Implementa lógica de fábrica para instanciar `ClienteMinorista` o `ClienteMayorista` según el tipo.
*   **`VinoService`**: Gestiona lógica de precios dinámicos y actualizaciones de stock.

### 3.4 Capa de Modelo (Domain Model)
*   Define las entidades de negocio utilizando clases de JavaScript.
*   **Herencia:** `Vino` extiende de `Producto`. `ClienteMayorista` y `ClienteMinorista` extienden de `Cliente`.
*   **Polimorfismo:** Los tipos de cliente manejan atributos específicos (como `cuit`) y se comportan de forma distinta en el flujo de negocio.

### 3.5 Capa de Datos (Persistence)
*   **`JsonRepository`**: Clase genérica que implementa el patrón Repository para operaciones CRUD asíncronas sobre archivos `.json`. Centraliza el acceso a `fs/promises`.

---

## 4. Modelo de Datos Detallado

### 4.1 Entidades de Catálogo
*   **`Producto`**: Clase base (id, nombre, marca, precioMinorista, precioMayorista, stock, esOferta).
*   **`Vino`**: Hereda de `Producto` y añade (tipoUva, tipoVino, anoCosecha, tamanoMl).
*   **`Categoria`**: Entidad independiente para clasificación (id, nombre, descripcion).

### 4.2 Entidades de Usuarios
*   **`Cliente`**: Clase base (id, nombre, apellido, email, telefono, direccionEnvio).
*   **`ClienteMinorista`**: Especialización con `tipo: 'MINORISTA'`.
*   **`ClienteMayorista`**: Especialización con `tipo: 'MAYORISTA'` y atributo `cuit`.

---

## 5. API REST Endpoints

### 5.1 Gestión de Vinos (`/api/vinos`)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| GET | `/` | Retorna todos los vinos (instanciados). |
| GET | `/:id` | Retorna un vino por ID. |
| POST | `/` | Crea un nuevo vino. |
| PUT | `/:id` | Actualiza un vino existente. |
| DELETE | `/:id` | Elimina un vino del catálogo. |

### 5.2 Gestión de Clientes (`/api/clientes`)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| GET | `/` | Listado de clientes (polimórfico). |
| GET | `/:id` | Detalle de un cliente específico. |
| POST | `/` | Registra un cliente (Minorista o Mayorista). |
| PUT | `/:id` | Actualiza datos del cliente. |
| DELETE | `/:id` | Baja del registro de cliente. |

### 5.3 Gestión de Categorías (`/api/categorias`)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| GET | `/` | Retorna todas las categorías. |
| GET | `/:id` | Busca categoría por ID. |
| POST | `/` | Crea una nueva categoría de productos. |
| PUT | `/:id` | Modifica una categoría. |
| DELETE | `/:id` | Elimina una categoría. |

---

## 6. Estructura de Directorios
```text
src/
├── app.js                # Punto de entrada
├── controllers/          # Controladores de la API
├── data/                 # Capa de persistencia (JSON + Repository)
├── models/               # Clases de dominio (POO)
├── routes/               # Definición de rutas Express
---

## 7. Deuda Técnica y Mejoras Sugeridas

### 7.1 Mejoras Arquitectónicas
*   **Migración a Base de Datos Real:** Transicionar del `JsonRepository` a una base de datos robusta como **MongoDB** (NoSQL) para flexibilidad en productos o **PostgreSQL** (Relacional) para integridad en pedidos y stock.
*   **Manejo de Errores Global:** Implementar un middleware centralizado en `app.js` para estandarizar las respuestas de error y reducir la redundancia de bloques `try-catch`.
*   **Validación de Esquemas:** Integrar librerías como **Joi** o **Zod** para validar los payloads de entrada en los controladores antes de procesar la lógica de negocio.
*   **Gestión de Variables de Entorno:** Implementar un archivo `.env` (usando `dotenv`) para manejar configuraciones sensibles como puertos, secretos de JWT y rutas de base de datos.

### 7.2 Funcionalidades Pendientes / Futuras
*   **Autenticación y Autorización:** Implementar **JWT (JSON Web Tokens)** para proteger rutas administrativas y gestionar perfiles de clientes.
*   **Pasarela de Pagos:** Integración con APIs de terceros (Mercado Pago, Stripe) para el cierre del flujo de venta.
*   **Servicio de Notificaciones:** Implementar **Nodemailer** para el envío automático de correos de confirmación de pedidos y cambios de estado.
*   **Buscador Avanzado:** Filtros dinámicos multicriterio (cepa, rango de precio, cosecha, ofertas).

### 7.3 Documentación y Herramientas
*   **Documentación de API:** Implementar **Swagger (OpenAPI)** para proveer una interfaz interactiva de pruebas para los endpoints.
*   **Logs y Monitoreo:** Integrar una herramienta como `winston` o `morgan` para seguimiento de peticiones y errores en producción.
