import { ClienteRepository } from '../repositories/ClienteRepository.js';
import { ClienteMinorista } from '../models/ClienteMinorista.js';
import { ClienteMayorista } from '../models/ClienteMayorista.js';



export class ClienteService {
  static instantiateCliente(c) {
    if (c.tipo === 'MAYORISTA') {
      return new ClienteMayorista(c.id, c.nombre, c.apellido, c.email, c.telefono, c.direccionEnvio, c.cuit);
    }
    return new ClienteMinorista(c.id, c.nombre, c.apellido, c.email, c.telefono, c.direccionEnvio);
  }

  static async getAll() {
    const data = await ClienteRepository.getAll();
    return data.map(c => this.instantiateCliente(c));
  }

  static async getById(id) {
    const c = await ClienteRepository.getById(id);
    if (!c) return null;
    return this.instantiateCliente(c);
  }

  static async create(data) {
    const { id, nombre, apellido, email, telefono, direccionEnvio, tipo, cuit } = data;
    let nuevoCliente;
    if (tipo === 'MAYORISTA') {
      nuevoCliente = new ClienteMayorista(id, nombre, apellido, email, telefono, direccionEnvio, cuit);
    } else {
      nuevoCliente = new ClienteMinorista(id, nombre, apellido, email, telefono, direccionEnvio);
    }
    return await ClienteRepository.create(nuevoCliente);
  }

  static async update(id, data) {
    return await ClienteRepository.update(id, data);
  }

  static async delete(id) {
    return await ClienteRepository.delete(id);
  }
}
