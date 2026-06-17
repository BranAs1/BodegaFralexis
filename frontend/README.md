# E-Commerce Bodega Fralexis - Tienda Virtual de Vinos

Tienda online moderna y responsiva para comprar vinos premium de Bodega Fralexis. Desarrollada en HTML5, CSS3 y JavaScript vanilla, se conecta a la API REST del backend.

## 🎯 Características Principales

### 🛍️ **Compra de Productos**
- Catálogo dinámico de vinos cargado desde la API
- Cards visuales con información de cada vino
- Precios diferenciados (minorista y mayorista)
- Sistema de stock en tiempo real
- Badges para productos en oferta

### 🔍 **Sistema de Filtros Avanzado**
- Filtrar por tipo de vino (Tinto, Blanco, Rosado, Espumante)
- Rango de precio ajustable
- Búsqueda por nombre o marca
- Filtro de disponibilidad
- Filtro de promociones
- Botón para limpiar todos los filtros

### 📊 **Ordenamiento Flexible**
- Por precio (menor a mayor, mayor a menor)
- Alfabético (A-Z)
- Por año de cosecha (más reciente)
- Recomendado (por defecto)

### 🛒 **Carrito de Compras**
- Agregar y quitar productos
- Modificar cantidades con botones o input
- Visualización de precios por cantidad
- Precios mayoristas automáticos (6+ botellas)
- Cálculo automático de subtotal y total
- Envío gratis para compras mayores a $5000
- Persistencia en localStorage

### 💳 **Checkout**
- Resumen de compra detallado
- Cálculo de envío
- Simulación de proceso de pago
- Confirmación de pedido

### 📱 **Interfaz Responsiva**
- Diseño adaptable a cualquier dispositivo
- Mobile-first approach
- Navegación intuitiva
- Accesibilidad mejorada

## 📁 Estructura de Archivos

```
frontend/
├── index.html          # Estructura HTML con modales y componentes
├── Estilos.css        # Estilos CSS3 responsivos
├── app.js             # Lógica JavaScript (API, carrito, filtros)
├── README.md          # Este archivo
└── ENDPOINTS.md       # Referencia de endpoints de API
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Backend API ejecutándose (http://localhost:3000 por defecto)
- Navegador moderno (Chrome, Firefox, Edge, Safari)

### Pasos

1. **Abre el archivo `index.html`** en tu navegador
2. **La tienda se cargará automáticamente** con los vinos disponibles
3. **Navega usando:**
   - Barra de búsqueda en el navbar
   - Filtros en el panel izquierdo
   - Selector de ordenamiento

## 🛍️ Cómo Comprar

### 1. Explorar Catálogo
- Los vinos se muestran en cards con información básica
- Ve el nombre, marca, tipo, año y precio
- Observa el stock disponible

### 2. Aplicar Filtros
- Selecciona tipos de vino
- Ajusta el rango de precio
- Busca por nombre o marca
- Usa los checkboxes para disponibilidad y ofertas

### 3. Ver Detalles
- Haz clic en una card para ver detalles completos
- Modal muestra:
  - Información técnica completa
  - Precios (minorista y mayorista)
  - Stock disponible
  - Año de cosecha y tamaño

### 4. Agregar al Carrito
- Elige la cantidad deseada
- El precio se ajusta automáticamente según cantidad
- Haz clic en "Agregar al Carrito"
- Recibirás confirmación

### 5. Revisar Carrito
- Haz clic en el botón 🛒 Carrito en el navbar
- Modifica cantidades si es necesario
- Ve el resumen con subtotal y envío
- Elimina productos si cambias de opinión

### 6. Proceder al Pago
- Haz clic en "Proceder al Pago"
- Sistema simula procesamiento
- Recibirás confirmación del pedido

## 🎨 Interfaz

### Navbar Superior
- **Logo y título**: "Bodega Fralexis"
- **Barra de búsqueda**: Busca vinos por nombre, marca o tipo
- **Botón 🛒 Carrito**: Abre modal con items agregados (contador actualizado)
- **Botón 👤 Mi Cuenta**: Funcionalidad futura

### Panel de Filtros (Izquierda)
```
🔍 Filtros
├── Buscar (input de texto)
├── Tipo de Vino (checkboxes)
├── Rango de Precio (sliders)
├── Disponibilidad (checkbox)
├── Promociones (checkbox)
└── Limpiar Filtros (botón)
```

### Grid de Productos
- Grid responsivo que se adapta al ancho
- Cards clickeables para ver detalles
- Selector de ordenamiento
- Mensaje cuando no hay resultados

### Modal de Detalles
- Imagen del vino (placeholder 🍷)
- Información completa
- Especificaciones técnicas
- Precios diferenciados
- Selector de cantidad
- Botón "Agregar al Carrito"

### Modal del Carrito
- Lista de items
- Controles de cantidad
- Botones para eliminar
- Resumen de compra
- Cálculo de envío
- Botón "Proceder al Pago"

## 💡 Características Técnicas

### Estado Local
- Carrito persistente usando `localStorage`
- Información de todos los vinos en memoria

### API Integration
- Llamadas fetch a endpoints REST
- Soporta camelCase y snake_case
- Manejo robusto de errores

### Notificaciones
- Sistema de toast notifications
- 3 tipos: éxito, error, info
- Auto-desaparición después de 3 segundos

### Responsividad
- Breakpoints: 768px, 480px
- Menú adaptable
- Grid responsive
- Modales optimizados para móvil

## 🔧 Configuración

### Cambiar URL de API
Actualmente no es necesario. El frontend busca en `http://localhost:3000` por defecto.

Para cambiar manualmente, edita `app.js`:
```javascript
const config = {
    apiUrl: 'http://tu-servidor.com:3000'
};
```

## 📝 Lógica de Precios

### Precio Minorista (1-5 botellas)
```
Mostrado en: tarjetas y detalles
Campo API: precioMinorista o precio_minorista
```

### Precio Mayorista (6+ botellas)
```
Automático cuando cantidad >= 6
Campo API: precioMayorista o precio_mayorista
```

### Envío
```
- Compras < $5000: $500
- Compras >= $5000: GRATIS
```

## 🎨 Colores y Estilo

### Paleta de Colores
```css
--primary-color: #722f37 (Vino oscuro)
--secondary-color: #b8373f (Vino claro)
--accent-color: #f4a460 (Dorado)
--bg-color: #f5f1e8 (Crema)
--text-color: #333 (Texto oscuro)
```

### Tipografía
- Fuente: Segoe UI, Tahoma, sans-serif
- Escala de tamaños responsiva
- Contraste apropiado para accesibilidad

## 🐛 Troubleshooting

### "Error al cargar el catálogo"
✅ Verifica que el servidor backend esté ejecutándose
✅ Confirma que la URL sea correcta (http://localhost:3000)
✅ Abre la consola (F12) para ver detalles del error

### El carrito no persiste
✅ Habilita el almacenamiento local en el navegador
✅ No estés en modo incógnito
✅ Verifica los permisos de localStorage

### Los precios no se calculan correctamente
✅ Verifica que la API devuelva `precioMinorista` y `precioMayorista`
✅ Comprueba que los valores sean números válidos
✅ Revisa la estructura JSON de respuesta

### Filtros no funcionan
✅ Asegúrate que los vinos tengan el campo `tipoVino`
✅ Verifica los valores disponibles en la API
✅ Recarga la página y reinicia los filtros

## 📊 Estructura de Datos

### Vino (del API)
```javascript
{
  id: 1,
  nombre: "Malbec Reserva",
  marca: "Finca Fralexis",
  tipoVino: "Tinto",
  tipoUva: "Malbec",
  anoCosecha: 2020,
  tamanoMl: 750,
  precioMinorista: 250,
  precioMayorista: 180,
  stock: 100,
  esOferta: true
}
```

### Item del Carrito (localStorage)
```javascript
{
  id: 1,
  nombre: "Malbec Reserva",
  marca: "Finca Fralexis",
  cantidad: 5,
  precioUnitario: 250
}
```

## 🚀 Próximas Mejoras

- [ ] Registro e inicio de sesión
- [ ] Historial de órdenes
- [ ] Favoritos / Wishlist
- [ ] Reseñas y ratings
- [ ] Integración con Mercado Pago
- [ ] Chat de soporte
- [ ] Rastreo de pedidos
- [ ] Recomendaciones personalizadas
- [ ] Modo oscuro
- [ ] Múltiples idiomas

## 📞 Soporte

Para reportar problemas o sugerencias:
- Abre un issue en GitHub
- Contacta al equipo de desarrollo
- Revisa la consola de errores (F12)

## 📄 Licencia

Proyecto educativo - Programación Orientada a Objetos

---

**Versión**: 2.0.0  
**Tipo**: E-Commerce  
**Última Actualización**: Junio 2026  
**Bodega Fralexis**

