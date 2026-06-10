# 🎨 Cómo Agregar el Banner de Vinos

## Pasos Rápidos

### 1️⃣ Guarda la imagen en la carpeta correcta

**Ubicación**: `frontend/assets/vinos-banner.jpg`

**Pasos**:
- Descarga la imagen de las botellas de vino que compartiste
- Copia el archivo en la carpeta `assets` dentro de `frontend`
- Asegúrate de que el nombre sea exactamente: `vinos-banner.jpg`

```
frontend/
├── index.html
├── app.js
├── Estilos.css
└── assets/
    └── vinos-banner.jpg  ← Aquí va la imagen
```

### 2️⃣ ¡Listo!

La imagen ya se mostrará automáticamente:
- ✅ Banner aparecerá debajo del navbar
- ✅ Responsive (se adapta a móvil, tablet, desktop)
- ✅ Con overlay oscuro para mejor legibilidad
- ✅ Texto: "Bienvenido a Bodega Fralexis" + descripción

---

## 🎯 Características del Banner

### Desktop
- Altura: 300px
- Imagen de fondo completa
- Texto grande y elegante
- Overlay con gradiente

### Tablet (< 768px)
- Altura: 200px
- Texto más compacto
- Imagen se mantiene nítida

### Móvil (< 480px)
- Altura: 150px
- Texto aún más pequeño
- Optimizado para pantalla pequeña

---

## 🎨 Estilos Aplicados

```css
- Overlay oscuro con transparencia
- Gradiente vino (primary + secondary color)
- Text-shadow para mejor legibilidad
- Object-fit: cover para imagen responsive
- Flexbox para centrado perfecto
```

---

## 🔧 Si quieres Personalizar

### Cambiar el texto del banner:
Edita `index.html`:
```html
<h2>Tu texto aquí</h2>
<p>Tu descripción aquí</p>
```

### Cambiar la altura:
Edita `Estilos.css`:
```css
.banner-hero {
    height: 400px;  /* Cambiar a tu gusto */
}
```

### Cambiar el overlay:
```css
.banner-overlay {
    background: rgba(0, 0, 0, 0.3);  /* Más oscuro o claro */
}
```

---

## ✨ Vista Previa

El banner quedará así:
- **Arriba**: Navbar sticky con logo y búsqueda
- **Debajo**: Banner hero con imagen de botellas
- **Texto**: "Bienvenido a Bodega Fralexis" con descripción
- **Debajo del banner**: Grid de productos con filtros

¡Perfecto para una tienda de vinos premium! 🍷

---

## 📝 Alternativa: Si quieres usar una URL online

Si en lugar de archivo local prefieres una URL:

```html
<img src="https://tu-url-de-imagen.jpg" alt="...">
```

Simplemente reemplaza `assets/vinos-banner.jpg` con la URL completa.

---

## ✅ Checklist

- [ ] Imagen guardada en `frontend/assets/vinos-banner.jpg`
- [ ] Nombre exacto: `vinos-banner.jpg`
- [ ] Abre `index.html` en el navegador
- [ ] Verifica que el banner aparezca
- [ ] Prueba en diferentes tamaños de pantalla (F12 → Responsive)

¡Listo! 🚀
