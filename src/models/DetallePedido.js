export class DetallePedido {
  constructor(id, idPedido, idVino, cantidad, precioUnitario, subtotal) {
    this.id = id;
    this.idPedido = idPedido;
    this.idVino = idVino;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    this.subtotal = subtotal;
  }
}