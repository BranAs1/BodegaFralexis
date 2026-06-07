import { PedidoRepository } from "../repositories/PedidoRepository.js";

export class PedidoService {

  static async getAll() {
    return await PedidoRepository.getAll();
  }

  static async getById(id) {
    return await PedidoRepository.getById(id);
  }

  static async create(data) {
    return await PedidoRepository.create(data);
  }
}