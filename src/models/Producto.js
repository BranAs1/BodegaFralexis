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
}
