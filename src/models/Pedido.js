export class Pedido {
  constructor(id, idCliente, estado, total, fecha) {
    this.id = id;
    this.idCliente = idCliente;
    this.estado = estado;
    this.total = total;
    this.fecha = fecha;
  }
}