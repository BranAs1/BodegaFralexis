import { VinoRepository } from "../repositories/VinoRepository.js";
import { Vino } from "../models/Vino.js";

export class VinoService {
  static async getAll() {
    const data = await VinoRepository.getAll();

    return data.map(v => new Vino(
      v.id_vino,
      v.nombre,
      v.marca,
      v.precioMinorista,
      v.precioMayorista,
      v.stock,
      v.tipoUva,
      v.tipoVino,
      v.anoCosecha,
      v.tamanoMl,
      v.esOferta
    ));
  }

  static async getById(id) {
    const v = await VinoRepository.getById(id);

    if (!v) return null;

    return new Vino(
      v.id_vino,
      v.nombre,
      v.marca,
      v.precioMinorista,
      v.precioMayorista,
      v.stock,
      v.tipoUva,
      v.tipoVino,
      v.anoCosecha,
      v.tamanoMl,
      v.esOferta
    );
  }

  static async create(data) {
    return await VinoRepository.create(data);
  }

  static async update(id, data) {
    return await VinoRepository.update(id, data);
  }

  static async delete(id) {
    return await VinoRepository.delete(id);
  }

  static async obtenerPrecio(id, tipoCliente) {
    const vino = await this.getById(id);

    if (!vino) return null;

    return tipoCliente === "MAYORISTA"
      ? vino.precioMayorista
      : vino.precioMinorista;
  }

  static async actualizarStock(id, cantidad) {
    const vino = await this.getById(id);

    if (!vino) return null;

    const nuevoStock = vino.stock + cantidad;

    return await VinoRepository.update(id, { stock: nuevoStock });
  }
}