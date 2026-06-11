export class Pedido {
  constructor(
    id,
    idCliente,
    estado,
    total,
    fecha,
    direccionEnvio,
    zonaEnvio,
    tiempoEstimado,
    idMetodoPago
  ) {
    this.id = id;
    this.idCliente = idCliente;
    this.estado = estado;
    this.total = total;
    this.fecha = fecha;
    this.direccionEnvio = direccionEnvio;
    this.zonaEnvio = zonaEnvio;
    this.tiempoEstimado = tiempoEstimado;
    this.idMetodoPago = idMetodoPago;
  }
}