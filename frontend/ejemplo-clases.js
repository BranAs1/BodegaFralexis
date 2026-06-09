/**
 * EJEMPLO DE USO DE CLASES VINO Y PRODUCTO
 * 
 * Este archivo demuestra cómo usar las clases Vino y Producto
 * con los datos mock de la tienda.
 * 
 * Nota: Este es un archivo de demostración. El frontend actual usa
 * objetos JavaScript simples, pero aquí se muestra cómo usar OOP.
 */

import { Vino } from './Vino.js';
import { Producto } from './Producto.js';

// ===== INSTANCIAS DE VINOS =====

const vinosMock = [
  new Vino(
    1,
    "Malbec Reserva",
    "Finca Fralexis",
    350,        // precioMinorista
    280,        // precioMayorista
    45,         // stock
    "Malbec",   // tipoUva
    "Tinto",    // tipoVino
    2020,       // anoCosecha
    750,        // tamanoMl
    true        // esOferta
  ),

  new Vino(
    2,
    "Cabernet Sauvignon",
    "Finca Fralexis",
    380,
    300,
    32,
    "Cabernet Sauvignon",
    "Tinto",
    2019,
    750,
    false
  ),

  new Vino(
    3,
    "Torrontés",
    "Finca Fralexis",
    280,
    220,
    78,
    "Torrontés",
    "Blanco",
    2022,
    750,
    false
  ),

  new Vino(
    4,
    "Sauvignon Blanc Premium",
    "Finca Fralexis",
    320,
    250,
    56,
    "Sauvignon Blanc",
    "Blanco",
    2023,
    750,
    true
  ),

  new Vino(
    5,
    "Rosado Premium",
    "Finca Fralexis",
    300,
    240,
    41,
    "Merlot",
    "Rosado",
    2022,
    750,
    false
  ),

  new Vino(
    6,
    "Espumante Brut",
    "Finca Fralexis",
    420,
    330,
    28,
    "Chardonnay",
    "Espumante",
    2021,
    750,
    true
  ),

  new Vino(
    7,
    "Merlot Clásico",
    "Finca Fralexis",
    290,
    230,
    64,
    "Merlot",
    "Tinto",
    2021,
    750,
    false
  ),

  new Vino(
    8,
    "Pinot Noir Edición Especial",
    "Finca Fralexis",
    450,
    360,
    19,
    "Pinot Noir",
    "Tinto",
    2020,
    750,
    true
  ),

  new Vino(
    9,
    "Chardonnay Expresión",
    "Finca Fralexis",
    340,
    270,
    51,
    "Chardonnay",
    "Blanco",
    2022,
    750,
    false
  ),

  new Vino(
    10,
    "Tannat Gran Reserva",
    "Finca Fralexis",
    500,
    400,
    15,
    "Tannat",
    "Tinto",
    2018,
    750,
    true
  ),

  new Vino(
    11,
    "Moscato",
    "Finca Fralexis",
    260,
    200,
    72,
    "Moscato",
    "Blanco",
    2023,
    750,
    false
  ),

  new Vino(
    12,
    "Espumante Extra Brut",
    "Finca Fralexis",
    380,
    300,
    34,
    "Pinot Noir",
    "Espumante",
    2022,
    750,
    false
  )
];

// ===== EJEMPLOS DE USO =====

function demostrarUso() {
  console.log("========== DEMOSTRACIÓN DE CLASES VINO Y PRODUCTO ==========\n");

  // Ejemplo 1: Acceder a un vino
  const vino1 = vinosMock[0];
  console.log("📍 Ejemplo 1: Obtener información de un vino");
  console.log(`Descripción: ${vino1.obtenerDescripcion()}`);
  console.log(`Info Técnica:`, vino1.obtenerInfoTecnica());
  console.log();

  // Ejemplo 2: Calcular precio según cantidad
  console.log("📍 Ejemplo 2: Calcular precio según cantidad");
  console.log(`Precio para 3 botellas: $${vino1.obtenerPrecio(3)} (Minorista)`);
  console.log(`Precio para 10 botellas: $${vino1.obtenerPrecio(10)} (Mayorista)`);
  console.log();

  // Ejemplo 3: Calcular descuento
  console.log("📍 Ejemplo 3: Calcular descuento por cantidad");
  const desc3 = vino1.calcularDescuento(3);
  const desc10 = vino1.calcularDescuento(10);
  console.log(`3 botellas:`, desc3);
  console.log(`10 botellas:`, desc10);
  console.log();

  // Ejemplo 4: Calcular subtotal
  console.log("📍 Ejemplo 4: Calcular subtotal");
  const subtotal = vino1.calcularSubtotal(5);
  console.log(`Subtotal de 5 botellas: $${subtotal}`);
  console.log();

  // Ejemplo 5: Gestionar stock
  console.log("📍 Ejemplo 5: Gestionar stock");
  console.log(`Stock inicial: ${vino1.stock}`);
  console.log(`¿Disponible? ${vino1.estaDisponible()}`);
  console.log(`Restando 10 botellas...`);
  vino1.restarStock(10);
  console.log(`Stock final: ${vino1.stock}`);
  console.log();

  // Ejemplo 6: Filtrar vinos
  console.log("📍 Ejemplo 6: Filtrar vinos por tipo");
  const tinosDisponibles = vinosMock.filter(v => v.tipoVino === "Tinto" && v.estaDisponible());
  console.log(`Tinos disponibles:`, tinosDisponibles.map(v => v.obtenerDescripcion()));
  console.log();

  // Ejemplo 7: Vinos en oferta
  console.log("📍 Ejemplo 7: Vinos en oferta");
  const ofertas = vinosMock.filter(v => v.esOferta);
  console.log(`Total de ofertas: ${ofertas.length}`);
  ofertas.forEach(v => {
    const desc = v.calcularDescuento(10);
    console.log(`  - ${v.obtenerDescripcion()}: ${desc.descuentoPorcentaje}% descuento`);
  });
  console.log();

  // Ejemplo 8: Precio total de una compra
  console.log("📍 Ejemplo 8: Calcular total de compra");
  const carrito = [
    { vino: vinosMock[0], cantidad: 5 },
    { vino: vinosMock[2], cantidad: 12 },
    { vino: vinosMock[5], cantidad: 2 }
  ];
  let total = 0;
  carrito.forEach(item => {
    const subtotal = item.vino.calcularSubtotal(item.cantidad);
    total += subtotal;
    console.log(`${item.vino.nombre} x${item.cantidad} = $${subtotal}`);
  });
  console.log(`Total: $${total}`);
  console.log();

  // Ejemplo 9: Convertir a JSON
  console.log("📍 Ejemplo 9: Convertir vino a JSON para API");
  console.log(JSON.stringify(vino1.toJSON(), null, 2));
}

// Ejecutar demostración si el script se carga en el navegador
if (typeof window !== 'undefined') {
  // Disponible en consola: demostrarUso()
  window.demostrarUso = demostrarUso;
  window.vinosMock = vinosMock;
  console.log("✅ Clases cargadas. Ejecuta demostrarUso() en la consola para ver ejemplos");
}

export { vinosMock };
