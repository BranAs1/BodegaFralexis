# Bodega Fralexis - E-commerce

Sistema de gestión para una bodega virtual desarrollado con Node.js, Express y una arquitectura robusta basada en capas (Controller-Service-Repository).

## Arquitectura y Patrones
El proyecto sigue las mejores prácticas de Programación Orientada a Objetos (POO) y patrones de diseño:
*   **Capas (Layered Architecture):**
    *   **Models:** Entidades de dominio puras con herencia (`Cliente` -> `ClienteMayorista`/`Minorista`, `Producto` -> `Vino`).
    *   **Services:** Capa de lógica de negocio que orquesta las operaciones y valida reglas de dominio.
    *   **Controllers:** Manejo de peticiones HTTP y respuestas.
    *   **Repositories:** Abstracción de la persistencia de datos (JSON).
*   **Inyección de Dependencias:** Los servicios utilizan repositorios para el acceso a datos.
*   **Single Responsibility Principle (SRP):** Cada clase tiene una única responsabilidad bien definida.

## Requisitos
*   **Node.js:** v20.19.5 o superior.
*   **Express:** 4.19.2.

## Instalación
1.  Instalar las dependencias:
    ```bash
    npm install
    ```

## Ejecución
Para iniciar el servidor:
```bash
npm start
```
El servidor estará disponible en: `http://localhost:3000`

## Endpoints Disponibles

### Vinos
| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/vinos` | Obtener todo el catálogo. |
| **GET** | `/api/vinos/:id` | Obtener un vino por ID. |
| **POST** | `/api/vinos` | Crear un nuevo vino. |
| **PUT** | `/api/vinos/:id` | Actualizar un vino existente. |
| **DELETE** | `/api/vinos/:id` | Eliminar un vino. |

### Clientes
| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/clientes` | Listar todos los clientes. |
| **GET** | `/api/clientes/:id` | Obtener detalle de un cliente. |
| **POST** | `/api/clientes` | Registrar un nuevo cliente (Minorista/Mayorista). |
| **PUT** | `/api/clientes/:id` | Actualizar datos de un cliente. |
| **DELETE** | `/api/clientes/:id` | Eliminar un cliente. |

---
**Versión:** 1.1.0
**Desarrollado para:** POO - Bodega Fralexis.
