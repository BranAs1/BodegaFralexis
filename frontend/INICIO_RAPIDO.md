# Inicio Rápido - Bodega Fralexis E-Commerce

## ⚡ Pasos Básicos

### 1. Verificar que el Backend esté Ejecutándose
```bash
# En otra terminal, en la carpeta del backend:
npm start

# Debería estar corriendo en http://localhost:3000
```

### 2. Abrir la Tienda
- Simplemente abre `index.html` en tu navegador
- La tienda cargará automáticamente los vinos de la API

### 3. ¡Listo para Comprar!
- Explora el catálogo
- Usa filtros y búsqueda
- Agrega vinos al carrito
- Procede al pago

---

## 🛍️ Acciones Principales

| Acción | Cómo hacerlo |
|--------|------------|
| **Buscar vinos** | Usa la barra de búsqueda en el navbar |
| **Filtrar por tipo** | Selecciona checkboxes en el panel izquierdo |
| **Ajustar precio** | Arrastra los sliders de rango |
| **Ver detalles** | Haz clic en cualquier card de vino |
| **Agregar al carrito** | Abre detalles, elige cantidad, presiona botón |
| **Ver carrito** | Haz clic en el icono 🛒 en el navbar |
| **Cambiar cantidad** | Usa botones +/- en el carrito |
| **Eliminar artículo** | Presiona el icono 🗑️ en el carrito |
| **Proceder pago** | Presiona botón en modal del carrito |

---

## 🎯 URLs Importantes

- **Frontend**: Abre `index.html` localmente
- **Backend API**: `http://localhost:3000`
- **Endpoints Principales**:
  - `GET /api/vinos` - Obtiene lista de vinos
  - `POST /api/pedidos` - Crea nuevo pedido
  - `POST /api/detalle-pedido` - Agrega vino a pedido

---

## 💡 Tips

### Precios Especiales
- **1-5 botellas**: Precio minorista
- **6+ botellas**: Precio mayorista (automático, más barato)
- **Envío**: Gratis si la compra es mayor a $5000

### Carrito Persistente
- El carrito se guarda automáticamente
- Puedes cerrar el navegador y el carrito seguirá ahí
- Se limpia solo después de confirmar la compra

### Modo Desarrollador (F12)
- Si hay errores, los verás en la consola
- Útil para debuggear problemas de conexión

---

## 🔧 Si Algo no Funciona

### Error: "Error al cargar el catálogo"
1. Verifica que el backend esté ejecutándose
2. Asegúrate de usar `npm start` en la carpeta correcta
3. Abre la consola (F12) y busca el mensaje de error específico

### Error: "Los vinos no se ven"
1. Verifica que hay vinos en la base de datos
2. Prueba la API directamente: `http://localhost:3000/api/vinos`
3. Si devuelve vacío, necesitas crear vinos primero

### El carrito no guarda
1. Habilita almacenamiento local en el navegador
2. No estés en modo incógnito
3. Revisa que JavaScript esté habilitado

### Los filtros no funcionan
1. Presiona "🔄 Limpiar Filtros" para resetear
2. Verifica que haya vinos que cumplan los criterios
3. Recarga la página (F5)

---

## 📱 Dispositivos

- **Desktop**: Experiencia completa
- **Tablet**: Interfaz adaptada
- **Móvil**: Navegación simplificada, modales optimizados

---

## 🚀 Próximo Paso

Si quieres personalizar:
- Edita `Estilos.css` para cambiar colores
- Modifica `app.js` para cambiar lógica
- Actualiza `index.html` para cambiar estructura

---

¡Disfruta de la tienda! 🍷
