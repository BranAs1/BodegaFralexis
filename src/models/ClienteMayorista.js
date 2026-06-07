import { Cliente } from './Cliente.js';

export class ClienteMayorista extends Cliente {
  constructor(id, nombre, apellido, email, telefono, direccionEnvio, cuit) {
    super(id, nombre, apellido, email, telefono, direccionEnvio);
    this.tipo = 'MAYORISTA';
    this.cuit = cuit;
  }
}
