/**
 * Clase base Producto
 * Define la estructura común para todos los productos de la bodega
 */
export class Producto {
  constructor(id, nombre, marca, precioMinorista, precioMayorista, stock, esOferta = false) {
    this.id = id;
    this.nombre = nombre;
    this.marca = marca;
    this.precioMinorista = precioMinorista;
    this.precioMayorista = precioMayorista;
    this.stock = stock;
    this.esOferta = esOferta;
  }

  /**
   * Obtiene el precio según la cantidad
   * @param {number} cantidad - Cantidad de productos
   * @returns {number} Precio unitario (minorista si cantidad <= 5, mayorista si > 5)
   */
  obtenerPrecio(cantidad = 1) {
    return cantidad > 5 ? this.precioMayorista : this.precioMinorista;
  }

  /**
   * Verifica si el producto está disponible
   * @returns {boolean}
   */
  estaDisponible() {
    return this.stock > 0;
  }

  /**
   * Reduce el stock
   * @param {number} cantidad - Cantidad a restar
   * @returns {boolean} True si fue exitoso, false si no hay stock suficiente
   */
  restarStock(cantidad) {
    if (this.stock >= cantidad) {
      this.stock -= cantidad;
      return true;
    }
    return false;
  }

  /**
   * Suma stock
   * @param {number} cantidad - Cantidad a agregar
   */
  agregarStock(cantidad) {
    this.stock += cantidad;
  }

  /**
   * Calcula el subtotal
   * @param {number} cantidad - Cantidad de unidades
   * @returns {number}
   */
  calcularSubtotal(cantidad) {
    return this.obtenerPrecio(cantidad) * cantidad;
  }
}
