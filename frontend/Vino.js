import { Producto } from './Producto.js';

/**
 * Clase Vino
 * Extiende Producto con propiedades específicas de vinos
 */
export class Vino extends Producto {
  constructor(id, nombre, marca, precioMinorista, precioMayorista, stock, tipoUva, tipoVino, anoCosecha, tamanoMl, esOferta = false) {
    super(id, nombre, marca, precioMinorista, precioMayorista, stock, esOferta);
    this.tipoUva = tipoUva;
    this.tipoVino = tipoVino;
    this.anoCosecha = anoCosecha;
    this.tamanoMl = tamanoMl;
  }

  /**
   * Obtiene la descripción completa del vino
   * @returns {string}
   */
  obtenerDescripcion() {
    return `${this.nombre} - ${this.marca} (${this.anoCosecha})`;
  }

  /**
   * Obtiene información técnica del vino
   * @returns {object}
   */
  obtenerInfoTecnica() {
    return {
      tipo: this.tipoVino,
      uva: this.tipoUva,
      año: this.anoCosecha,
      tamaño: `${this.tamanoMl}ml`,
      pMinorista: `$${this.precioMinorista}`,
      pMayorista: `$${this.precioMayorista}`,
      stock: this.stock,
      enOferta: this.esOferta
    };
  }

  /**
   * Valida si el vino es válido para venta
   * @returns {boolean}
   */
  esValido() {
    return this.estaDisponible() && 
           this.tipoVino && 
           this.tipoUva && 
           this.anoCosecha > 1900 && 
           this.tamanoMl > 0;
  }

  /**
   * Calcula el descuento aplicable según cantidad
   * @param {number} cantidad
   * @returns {object} {precioUnitario, descuento%, ahorro}
   */
  calcularDescuento(cantidad) {
    const precioMin = this.precioMinorista;
    const precioMay = this.precioMayorista;
    
    if (cantidad <= 5) {
      return {
        precioUnitario: precioMin,
        descuentoPorcentaje: 0,
        ahorro: 0,
        tipo: 'Minorista'
      };
    }
    
    const descuento = ((precioMin - precioMay) / precioMin) * 100;
    const ahorro = (precioMin - precioMay) * cantidad;
    
    return {
      precioUnitario: precioMay,
      descuentoPorcentaje: descuento.toFixed(1),
      ahorro: ahorro.toFixed(2),
      tipo: 'Mayorista'
    };
  }

  /**
   * Convierte el vino a objeto JSON para API
   * @returns {object}
   */
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      marca: this.marca,
      tipoVino: this.tipoVino,
      tipoUva: this.tipoUva,
      anoCosecha: this.anoCosecha,
      tamanoMl: this.tamanoMl,
      precioMinorista: this.precioMinorista,
      precioMayorista: this.precioMayorista,
      stock: this.stock,
      esOferta: this.esOferta
    };
  }
}
