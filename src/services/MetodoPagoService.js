import { MetodoPagoRepository } from "../repositories/MetodoPagoRepository.js";

export class MetodoPagoService {
  static async getAll() {
    return await MetodoPagoRepository.getAll();
  }

  static async getById(id) {
    return await MetodoPagoRepository.getById(id);
  }

  static async create(data) {
    return await MetodoPagoRepository.create(data);
  }
}