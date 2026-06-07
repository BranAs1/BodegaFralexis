import { CategoriaRepository } from "../repositories/CategoriaRepository.js";
import { Categoria } from "../models/Categoria.js";

export class CategoriaService {
  static async getAll() {
    const data = await CategoriaRepository.getAll();

    return data.map(c => new Categoria(
      c.id_categoria,
      c.nombre,
      c.descripcion
    ));
  }

  static async getById(id) {
    const c = await CategoriaRepository.getById(id);

    if (!c) return null;

    return new Categoria(
      c.id_categoria,
      c.nombre,
      c.descripcion
    );
  }

  static async create(data) {
    return await CategoriaRepository.create(data);
  }

  static async update(id, data) {
    return await CategoriaRepository.update(id, data);
  }

  static async delete(id) {
    return await CategoriaRepository.delete(id);
  }
}