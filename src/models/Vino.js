import { Producto } from './Producto.js';

export class Vino extends Producto {
  constructor(id, nombre, marca, precioMinorista, precioMayorista, stock, tipoUva, tipoVino, anoCosecha, tamanoMl, esOferta) {
    super(id, nombre, marca, precioMinorista, precioMayorista, stock, esOferta);
    this.tipoUva = tipoUva;
    this.tipoVino = tipoVino;
    this.anoCosecha = anoCosecha;
    this.tamanoMl = tamanoMl;
  }
}
