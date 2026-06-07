import { CategoriaService } from "../services/CategoriaService.js";

export class CategoriaController {
  static async getAll(req, res) {
    try {
      const categorias = await CategoriaService.getAll();
      res.json(categorias);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al obtener las categorías"
      });
    }
  }

  static async getById(req, res) {
    try {
      const categoria = await CategoriaService.getById(req.params.id);

      if (!categoria) {
        return res.status(404).json({
          error: "Categoría no encontrada"
        });
      }

      res.json(categoria);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al obtener la categoría"
      });
    }
  }

  static async create(req, res) {
    try {
      const creada = await CategoriaService.create(req.body);

      res.status(201).json(creada);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err.message
      });
    }
  }

  static async update(req, res) {
    try {
      const actualizada = await CategoriaService.update(
        req.params.id,
        req.body
      );

      if (!actualizada) {
        return res.status(404).json({
          error: "Categoría no encontrada"
        });
      }

      res.json(actualizada);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al actualizar la categoría"
      });
    }
  }

  static async delete(req, res) {
    try {
      const eliminada = await CategoriaService.delete(req.params.id);

      if (!eliminada) {
        return res.status(404).json({
          error: "Categoría no encontrada"
        });
      }

      res.json({
        mensaje: "Categoría eliminada correctamente"
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al eliminar la categoría"
      });
    }
  }
}