import { Cliente } from './Cliente.js';

export class ClienteMinorista extends Cliente {
  constructor(id, nombre, apellido, email, telefono, direccionEnvio) {
    super(id, nombre, apellido, email, telefono, direccionEnvio);
    this.tipo = 'MINORISTA';
  }
}
