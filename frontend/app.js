// ===== CONFIGURACIÓN GLOBAL =====
const config = {
    apiUrl: localStorage.getItem('apiUrl') || 'http://localhost:3000'
};

// ===== MAPEO DE IMÁGENES DE VINOS =====
const imagenesPorVino = {
    'Malbec': 'assets/malbec.jpg.png',
    'Cabernet Sauvignon': 'assets/cabernet.jpg.png',
    'Sauvignon Blanc': 'assets/suavignonblanc.jpg.png',
    'Rosado': 'assets/Rose.jpg.png',
    'Rose': 'assets/Rose.jpg.png',
    'Chardonnay': 'assets/chardonay.jpg.png',
    'Torrontés': 'assets/chardonay.jpg.png',
    'Espumante': 'assets/extrabrut.png',
    'Espumante Brut': 'assets/extrabrut.png',
    'Espumante Extra Brut': 'assets/extrabrut.png',
    'Syrah': 'assets/malbec.jpg.png',
    'Pinot Noir': 'assets/malbec.jpg.png'
};

function obtenerImagenVino(vino) {
    const tipoUva = vino.tipoUva || vino.tipo_uva || '';
    const nombre = vino.nombre || '';
    const tipoVino = vino.tipoVino || vino.tipo_vino || '';
    
    // Buscar por tipo de uva
    if (imagenesPorVino[tipoUva]) {
        return imagenesPorVino[tipoUva];
    }
    
    // Buscar por nombre
    for (const key in imagenesPorVino) {
        if (nombre.includes(key)) {
            return imagenesPorVino[key];
        }
    }
    
    // Buscar por tipo de vino
    if (imagenesPorVino[tipoVino]) {
        return imagenesPorVino[tipoVino];
    }
    
    // Default
    return 'assets/malbec.jpg.png';
}

// ===== ESTADO DE LA APLICACIÓN =====
let todos_los_vinos = [];
let vinos_filtrados = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let vinoSeleccionado = null;

// ===== DATOS MOCK DE VINOS (Para pruebas) =====
const vinosMock = [
    {
        id: 1,
        nombre: "Malbec Reserva",
        marca: "Fralexis",
        tipoVino: "Tinto",
        tipoUva: "Malbec",
        anoCosecha: 2022,
        tamanoMl: 750,
        precioMinorista: 1500,
        precioMayorista: 1200,
        stock: 50,
        esOferta: true
    },
    {
        id: 2,
        nombre: "Chardonnay Premium",
        marca: "Fralexis",
        tipoVino: "Blanco",
        tipoUva: "Chardonnay",
        anoCosecha: 2023,
        tamanoMl: 750,
        precioMinorista: 1800,
        precioMayorista: 1450,
        stock: 30,
        esOferta: false
    },
    {
        id: 3,
        nombre: "Syrah Deluxe",
        marca: "Fralexis",
        tipoVino: "Tinto",
        tipoUva: "Syrah",
        anoCosecha: 2021,
        tamanoMl: 750,
        precioMinorista: 2100,
        precioMayorista: 1800,
        stock: 20,
        esOferta: true
    },
    {
        id: 4,
        nombre: "Cabernet Sauvignon Gran Reserva",
        marca: "Fralexis",
        tipoVino: "Tinto",
        tipoUva: "Cabernet Sauvignon",
        anoCosecha: 2020,
        tamanoMl: 750,
        precioMinorista: 2200,
        precioMayorista: 1750,
        stock: 25,
        esOferta: false
    },
    {
        id: 5,
        nombre: "Rosado Premium",
        marca: "Fralexis",
        tipoVino: "Rosado",
        tipoUva: "Merlot",
        anoCosecha: 2023,
        tamanoMl: 750,
        precioMinorista: 1600,
        precioMayorista: 1300,
        stock: 40,
        esOferta: false
    },
    {
        id: 6,
        nombre: "Espumante Extra Brut",
        marca: "Fralexis",
        tipoVino: "Espumante",
        tipoUva: "Pinot Noir",
        anoCosecha: 2022,
        tamanoMl: 750,
        precioMinorista: 2200,
        precioMayorista: 1700,
        stock: 18,
        esOferta: true
    },
    {
        id: 7,
        nombre: "Sauvignon Blanc Premium",
        marca: "Fralexis",
        tipoVino: "Blanco",
        tipoUva: "Sauvignon Blanc",
        anoCosecha: 2023,
        tamanoMl: 750,
        precioMinorista: 1700,
        precioMayorista: 1350,
        stock: 34,
        esOferta: false
    },
    {
        id: 8,
        nombre: "Torrontés Clásico",
        marca: "Fralexis",
        tipoVino: "Blanco",
        tipoUva: "Torrontés",
        anoCosecha: 2024,
        tamanoMl: 750,
        precioMinorista: 1300,
        precioMayorista: 1050,
        stock: 60,
        esOferta: false
    }
];

const pagoDatosPrueba = {
    nombre: 'María González',
    email: 'maria.gonzalez@ejemplo.com',
    direccion: 'Av. Córdoba 2345',
    ciudad: 'Buenos Aires',
    tarjeta: '4509 9535 6623 3704',
    vencimiento: '12/28',
    cvv: '123'
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    cargarVinos();
    actualizarContadorCarrito();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Logo - Volver al listado de vinos
    document.getElementById('logoClick').addEventListener('click', () => {
        vinos_filtrados = [...todos_los_vinos];
        renderizarProductos();
        // Scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Cerrar modales si están abiertos
        cerrarCarrito();
        cerrarModalProducto();
        mostrarNotificacion('Volviendo al catálogo completo', 'info');
    });

    // Navbar
    document.getElementById('btnBuscar').addEventListener('click', buscarVinos);
    document.getElementById('inputBusqueda').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') buscarVinos();
    });

    // Carrito
    document.getElementById('btnCarrito').addEventListener('click', abrirCarrito);
    document.getElementById('btnCerrarCarrito').addEventListener('click', cerrarCarrito);
    document.getElementById('btnContinuarComprando').addEventListener('click', cerrarCarrito);
    document.getElementById('btnProcederPago').addEventListener('click', procederPago);
    document.getElementById('btnCerrarPago').addEventListener('click', cerrarPago);
    document.getElementById('btnConfirmarPago').addEventListener('click', confirmarPago);
    document.getElementById('btnVolverCarritoPago').addEventListener('click', cancelarPago);
    document.getElementById('btnCargarDatosPrueba').addEventListener('click', cargarDatosPruebaPago);
    document.querySelectorAll('input[name="metodoEntrega"]').forEach(radio => {
        radio.addEventListener('change', actualizarFormaEntrega);
    });

    // Cerrar con clic fuera del modal
    document.getElementById('modalProducto').addEventListener('click', (event) => {
        if (event.target.id === 'modalProducto') {
            cerrarModalProducto();
        }
    });
    document.getElementById('modalPago').addEventListener('click', (event) => {
        if (event.target.id === 'modalPago') {
            cancelarPago();
        }
    });
    document.getElementById('modalCarrito').addEventListener('click', (event) => {
        if (event.target.id === 'modalCarrito') {
            cerrarCarrito();
        }
    });

    // Cerrar modales con Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (document.getElementById('modalProducto').classList.contains('active')) {
                cerrarModalProducto();
            } else if (document.getElementById('modalPago').classList.contains('active')) {
                cerrarPago();
            } else if (document.getElementById('modalCarrito').classList.contains('active')) {
                cerrarCarrito();
            }
        }
    });

    // Modal Producto
    document.getElementById('btnCerrarProducto').addEventListener('click', cerrarModalProducto);

    // Filtros
    document.querySelectorAll('.filtro-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', aplicarFiltros);
    });

    document.getElementById('filtroNombre').addEventListener('keyup', aplicarFiltros);
    document.getElementById('precioMin').addEventListener('change', aplicarFiltros);
    document.getElementById('precioMax').addEventListener('change', aplicarFiltros);
    document.getElementById('filtroDisponible').addEventListener('change', aplicarFiltros);
    document.getElementById('filtroOferta').addEventListener('change', aplicarFiltros);

    // Actualizar display de precios
    document.getElementById('precioMin').addEventListener('input', (e) => {
        document.getElementById('precioMinDisplay').textContent = e.target.value;
        document.getElementById('precioMax').min = e.target.value;
    });

    document.getElementById('precioMax').addEventListener('input', (e) => {
        document.getElementById('precioMaxDisplay').textContent = e.target.value;
        document.getElementById('precioMin').max = e.target.value;
    });

    document.getElementById('btnLimpiarFiltros').addEventListener('click', limpiarFiltros);

    // Ordenamiento
    document.getElementById('ordenar').addEventListener('change', aplicarOrdenamiento);

    // Cantidad selector en modal
    document.getElementById('btnMenos').addEventListener('click', () => {
        let cantidad = parseInt(document.getElementById('cantidadProducto').value);
        if (cantidad > 1) {
            document.getElementById('cantidadProducto').value = cantidad - 1;
        }
    });

    document.getElementById('btnMas').addEventListener('click', () => {
        let cantidad = parseInt(document.getElementById('cantidadProducto').value);
        document.getElementById('cantidadProducto').value = cantidad + 1;
    });

    document.getElementById('btnAgregarDetalle').addEventListener('click', agregarAlCarrito);

}

function cargarDatosPruebaPago() {
    document.getElementById('pagoNombre').value = pagoDatosPrueba.nombre;
    document.getElementById('pagoEmail').value = pagoDatosPrueba.email;
    document.getElementById('pagoDireccion').value = pagoDatosPrueba.direccion;
    document.getElementById('pagoCiudad').value = pagoDatosPrueba.ciudad;
    document.getElementById('pagoTarjeta').value = pagoDatosPrueba.tarjeta;
    document.getElementById('pagoVencimiento').value = pagoDatosPrueba.vencimiento;
    document.getElementById('pagoCvv').value = pagoDatosPrueba.cvv;
    mostrarNotificacion('Datos de prueba cargados', 'info');
    actualizarFormaEntrega();
    renderizarResumenPago();
}

// ===== CARGAR VINOS =====
async function cargarVinos() {
    try {
        const response = await fetch(`${config.apiUrl}/api/vinos`, { timeout: 5000 });
        if (!response.ok) throw new Error('Error al cargar vinos');

        todos_los_vinos = await response.json();
        vinos_filtrados = [...todos_los_vinos];
        renderizarProductos();
        mostrarNotificacion(`✓ ${todos_los_vinos.length} vinos cargados desde API`, 'exito');
    } catch (error) {
        console.error('Error cargando desde API:', error);
        // Usar datos mock si la API no está disponible
        todos_los_vinos = [...vinosMock];
        vinos_filtrados = [...todos_los_vinos];
        renderizarProductos();
        mostrarNotificacion(`✓ ${todos_los_vinos.length} vinos cargados (Modo Demostración)`, 'info');
    }
}

// ===== RENDERIZAR PRODUCTOS =====
function renderizarProductos() {
    const grid = document.getElementById('gridProductos');
    const mensaje = document.getElementById('mensajeVacio');

    if (vinos_filtrados.length === 0) {
        grid.innerHTML = '';
        mensaje.style.display = 'block';
        return;
    }

    mensaje.style.display = 'none';
    grid.innerHTML = vinos_filtrados.map(vino => {
        const imagen = obtenerImagenVino(vino);
        return `
        <div class="card-producto" onclick="abrirModalProducto(${vino.id})">
            <div class="producto-imagen">
                <img src="${imagen}" alt="${vino.nombre}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px 8px 0 0;">
                ${vino.esOferta ? '<span class="oferta-badge">¡OFERTA!</span>' : ''}
            </div>
            <div class="producto-info">
                <div class="producto-nombre">${vino.nombre}</div>
                <div class="producto-marca">${vino.marca}</div>
                <span class="producto-tipo">${vino.tipoVino || vino.tipo_vino || 'N/A'}</span>
                <div class="producto-precio">
                    Año: ${vino.anoCosecha || vino.ano_cosecha || 'N/A'}
                </div>
                <div class="producto-precio principal">
                    $${vino.precioMinorista || vino.precio_minorista || 0}
                </div>
                <div class="producto-stock">
                    <span class="${vino.stock > 0 ? 'stock-disponible' : 'stock-agotado'}">
                        ${vino.stock > 0 ? `${vino.stock} disponibles` : 'Sin stock'}
                    </span>
                </div>
                <button class="btn-ver-detalle" ${vino.stock === 0 ? 'disabled' : ''}>
                    ${vino.stock > 0 ? '👁️ Ver Detalle' : 'Agotado'}
                </button>
            </div>
        </div>
    `}).join('');
}

// ===== MODAL PRODUCTO =====
function abrirModalProducto(id) {
    const vino = todos_los_vinos.find(v => v.id === id);
    if (!vino) return;

    vinoSeleccionado = vino;

    // Actualizar imagen del modal
    const imagenVino = obtenerImagenVino(vino);
    const imagenProductoDiv = document.getElementById('imagenProducto');
    imagenProductoDiv.style.background = 'none';
    imagenProductoDiv.innerHTML = `<img src="${imagenVino}" alt="${vino.nombre}" style="width: 100%; height: 100%; object-fit: contain;">`;

    document.getElementById('detalleNombre').textContent = vino.nombre;
    document.getElementById('detalleMarca').textContent = `${vino.marca} - Año ${vino.anoCosecha || vino.ano_cosecha || 'N/A'}`;
    document.getElementById('detalleTipo').textContent = vino.tipoVino || vino.tipo_vino || 'N/A';
    document.getElementById('detalleTipoUva').textContent = vino.tipoUva || vino.tipo_uva || 'N/A';
    document.getElementById('detalleAno').textContent = vino.anoCosecha || vino.ano_cosecha || 'N/A';
    document.getElementById('detalleTamano').textContent = vino.tamanoMl || vino.tamano_ml || 750;
    document.getElementById('detalleStock').textContent = vino.stock;

    document.getElementById('detallePrecioMin').textContent = `$${vino.precioMinorista || vino.precio_minorista || 0}`;
    document.getElementById('detallePrecioMay').textContent = `$${vino.precioMayorista || vino.precio_mayorista || 0}`;

    document.getElementById('cantidadProducto').value = 1;

    document.getElementById('modalProducto').classList.add('active');
}

function cerrarModalProducto() {
    document.getElementById('modalProducto').classList.remove('active');
    vinoSeleccionado = null;
}

// ===== CARRITO =====
function abrirCarrito() {
    renderizarCarrito();
    document.getElementById('modalCarrito').classList.add('active');
}

function cerrarCarrito() {
    document.getElementById('modalCarrito').classList.remove('active');
}

function renderizarCarrito() {
    const contenido = document.getElementById('contenidoCarrito');

    if (carrito.length === 0) {
        contenido.innerHTML = '<div class="carrito-vacio"><p>🛒 Tu carrito está vacío</p><p>¡Agrega vinos para comenzar!</p></div>';
        document.getElementById('btnProcederPago').disabled = true;
        document.getElementById('subtotal').textContent = '$0.00';
        document.getElementById('envio').textContent = '$0.00';
        document.getElementById('totalCarrito').textContent = '$0.00';
        return;
    }

    document.getElementById('btnProcederPago').disabled = false;

    contenido.innerHTML = carrito.map((item, index) => {
        // Encontrar el vino para obtener su imagen
        const vino = todos_los_vinos.find(v => v.id === item.id);
        const imagen = vino ? obtenerImagenVino(vino) : 'assets/malbec.jpg.png';
        
        return `
        <div class="carrito-item">
            <div class="carrito-item-imagen">
                <img src="${imagen}" alt="${item.nombre}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">
            </div>
            <div class="carrito-item-info">
                <div class="carrito-item-nombre">${item.nombre}</div>
                <div class="carrito-item-marca">${item.marca}</div>
                <div class="carrito-item-cantidad">
                    <button onclick="cambiarCantidad(${index}, -1)">−</button>
                    <input type="number" value="${item.cantidad}" min="1" onchange="actualizarCantidad(${index}, this.value)">
                    <button onclick="cambiarCantidad(${index}, 1)">+</button>
                </div>
            </div>
            <div>
                <div class="carrito-item-precio">$${(item.precioUnitario * item.cantidad).toFixed(2)}</div>
                <button class="carrito-item-eliminar" onclick="eliminarDelCarrito(${index})">🗑️</button>
            </div>
        </div>
    `}).join('');

    actualizarResumenCarrito();
}

function cambiarCantidad(index, cambio) {
    const nueva_cantidad = carrito[index].cantidad + cambio;
    if (nueva_cantidad > 0) {
        carrito[index].cantidad = nueva_cantidad;
        guardarCarrito();
        renderizarCarrito();
    }
}

function actualizarCantidad(index, nueva_cantidad) {
    if (nueva_cantidad > 0) {
        carrito[index].cantidad = parseInt(nueva_cantidad);
        guardarCarrito();
        renderizarCarrito();
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarContadorCarrito();
    renderizarCarrito();
    mostrarNotificacion('Vino removido del carrito', 'info');
}

function actualizarFormaEntrega() {
    const envioSeleccionado = document.querySelector('input[name="metodoEntrega"]:checked').value === 'envio';
    document.getElementById('direccionEnvio').style.display = envioSeleccionado ? 'block' : 'none';
    renderizarResumenPago();
}

function procederPago() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito está vacío', 'error');
        return;
    }

    abrirPago();
}

function abrirPago() {
    document.getElementById('modalCarrito').classList.remove('active');
    document.getElementById('modalPago').classList.add('active');
    document.getElementById('pagoNombre').value = '';
    document.getElementById('pagoEmail').value = '';
    document.getElementById('pagoDireccion').value = '';
    document.getElementById('pagoCiudad').value = '';
    document.getElementById('pagoTarjeta').value = '';
    document.getElementById('pagoVencimiento').value = '';
    document.getElementById('pagoCvv').value = '';
    document.querySelector('input[name="metodoEntrega"][value="envio"]').checked = true;
    actualizarFormaEntrega();
    renderizarResumenPago();
}

function cerrarPago() {
    document.getElementById('modalPago').classList.remove('active');
}

function cancelarPago() {
    cerrarPago();
    abrirCarrito();
}

function confirmarPago() {
    const nombre = document.getElementById('pagoNombre').value.trim();
    const email = document.getElementById('pagoEmail').value.trim();
    const entrega = document.querySelector('input[name="metodoEntrega"]:checked').value;
    const direccion = document.getElementById('pagoDireccion').value.trim();
    const ciudad = document.getElementById('pagoCiudad').value.trim();
    const tarjeta = document.getElementById('pagoTarjeta').value.trim();
    const vencimiento = document.getElementById('pagoVencimiento').value.trim();
    const cvv = document.getElementById('pagoCvv').value.trim();

    if (!nombre || !email || !tarjeta || !vencimiento || !cvv) {
        mostrarNotificacion('Completa todos los campos de pago', 'error');
        return;
    }

    if (entrega === 'envio' && (!direccion || !ciudad)) {
        mostrarNotificacion('Completa los datos de envío', 'error');
        return;
    }

    const total = calcularTotalPago(entrega === 'retiro');

    mostrarNotificacion(`¡Pago confirmado! Total: $${total.toFixed(2)}`, 'exito');
    setTimeout(() => {
        carrito = [];
        guardarCarrito();
        actualizarContadorCarrito();
        cerrarPago();
        mostrarNotificacion('Pedido procesado correctamente', 'exito');
    }, 1000);
}

function calcularTotalPago(esRetiro) {
    const subtotal = carrito.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0);
    const envio = esRetiro ? 0 : (subtotal > 5000 ? 0 : 500);
    return subtotal + envio;
}

function renderizarResumenPago() {
    const subtotal = carrito.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0);
    const esRetiro = document.querySelector('input[name="metodoEntrega"]:checked').value === 'retiro';
    const envio = esRetiro ? 0 : (subtotal > 5000 ? 0 : 500);
    const total = subtotal + envio;

    document.getElementById('pagoSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('pagoEnvio').textContent = esRetiro ? '0.00 (Retiro)' : (envio === 0 ? 'GRATIS' : `$${envio.toFixed(2)}`);
    document.getElementById('pagoTotal').textContent = `$${total.toFixed(2)}`;
}

function agregarAlCarrito() {
    if (!vinoSeleccionado) return;

    const cantidad = parseInt(document.getElementById('cantidadProducto').value);
    const precio = cantidad > 5 ? 
        (vinoSeleccionado.precioMayorista || vinoSeleccionado.precio_mayorista) :
        (vinoSeleccionado.precioMinorista || vinoSeleccionado.precio_minorista);

    // Verificar si ya existe en el carrito
    const itemExistente = carrito.find(item => item.id === vinoSeleccionado.id);
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: vinoSeleccionado.id,
            nombre: vinoSeleccionado.nombre,
            marca: vinoSeleccionado.marca,
            cantidad: cantidad,
            precioUnitario: precio
        });
    }

    guardarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion(`✓ ${cantidad} botellas agregadas al carrito`, 'exito');
    cerrarModalProducto();
}

function actualizarResumenCarrito() {
    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.precioUnitario * item.cantidad;
    });

    const envio = subtotal > 5000 ? 0 : 500;
    const total = subtotal + envio;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('envio').textContent = envio === 0 ? 'GRATIS' : `$${envio.toFixed(2)}`;
    document.getElementById('totalCarrito').textContent = `$${total.toFixed(2)}`;
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
    const cantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('contadorCarrito').textContent = cantidad;
}

// ===== FILTROS =====
function aplicarFiltros() {
    const tipos_seleccionados = Array.from(document.querySelectorAll('.filtro-checkbox:checked'))
        .map(cb => cb.value);
    const nombre = document.getElementById('filtroNombre').value.toLowerCase();
    const precioMin = parseInt(document.getElementById('precioMin').value);
    const precioMax = parseInt(document.getElementById('precioMax').value);
    const soloDisponible = document.getElementById('filtroDisponible').checked;
    const soloOfertas = document.getElementById('filtroOferta').checked;

    vinos_filtrados = todos_los_vinos.filter(vino => {
        // Filtro por tipo
        if (tipos_seleccionados.length > 0) {
            const tipoVino = vino.tipoVino || vino.tipo_vino || '';
            if (!tipos_seleccionados.includes(tipoVino)) return false;
        }

        // Filtro por nombre/marca
        if (nombre) {
            const nombreCompleto = `${vino.nombre} ${vino.marca}`.toLowerCase();
            if (!nombreCompleto.includes(nombre)) return false;
        }

        // Filtro por precio
        const precio = vino.precioMinorista || vino.precio_minorista || 0;
        if (precio < precioMin || precio > precioMax) return false;

        // Filtro disponibilidad
        if (soloDisponible && vino.stock === 0) return false;

        // Filtro ofertas
        if (soloOfertas && !vino.esOferta) return false;

        return true;
    });

    renderizarProductos();
}

function limpiarFiltros() {
    // Limpiar checkboxes
    document.querySelectorAll('.filtro-checkbox').forEach(cb => cb.checked = false);
    
    // Limpiar input de nombre
    document.getElementById('filtroNombre').value = '';
    
    // Resetear rangos de precio
    document.getElementById('precioMin').value = 0;
    document.getElementById('precioMax').value = 5000;
    document.getElementById('precioMinDisplay').textContent = '0';
    document.getElementById('precioMaxDisplay').textContent = '5000';
    
    // Limpiar checkboxes de disponibilidad y ofertas
    document.getElementById('filtroDisponible').checked = false;
    document.getElementById('filtroOferta').checked = false;

    // Aplicar filtros
    vinos_filtrados = [...todos_los_vinos];
    renderizarProductos();
    mostrarNotificacion('Filtros limpios', 'info');
}

function aplicarOrdenamiento() {
    const ordenar = document.getElementById('ordenar').value;

    switch (ordenar) {
        case 'precioAsc':
            vinos_filtrados.sort((a, b) => {
                const precioA = a.precioMinorista || a.precio_minorista || 0;
                const precioB = b.precioMinorista || b.precio_minorista || 0;
                return precioA - precioB;
            });
            break;
        case 'precioDesc':
            vinos_filtrados.sort((a, b) => {
                const precioA = a.precioMinorista || a.precio_minorista || 0;
                const precioB = b.precioMinorista || b.precio_minorista || 0;
                return precioB - precioA;
            });
            break;
        case 'nombre':
            vinos_filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'novedad':
            vinos_filtrados.sort((a, b) => {
                const añoA = a.anoCosecha || a.ano_cosecha || 0;
                const añoB = b.anoCosecha || b.ano_cosecha || 0;
                return añoB - añoA;
            });
            break;
        default:
            vinos_filtrados.sort((a, b) => a.id - b.id);
    }

    renderizarProductos();
}

// ===== BÚSQUEDA =====
function buscarVinos() {
    const termino = document.getElementById('inputBusqueda').value.toLowerCase();
    
    vinos_filtrados = todos_los_vinos.filter(vino => {
        const texto = `${vino.nombre} ${vino.marca} ${vino.tipoVino || vino.tipo_vino || ''}`.toLowerCase();
        return texto.includes(termino);
    });

    renderizarProductos();
    mostrarNotificacion(`${vinos_filtrados.length} vinos encontrados`, 'info');
}

// ===== PAGO =====
// ===== UTILIDADES =====
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notif = document.getElementById('notificacion');
    notif.textContent = mensaje;
    notif.className = `notificacion show ${tipo}`;

    setTimeout(() => {
        notif.classList.remove('show');
    }, 3000);
}
