import { VinoService } from "../services/VinoService.js";

export class VinoController {
  static async getAll(req, res) {
    try {
      const vinos = await VinoService.getAll();
      res.json(vinos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener el catálogo" });
    }
  }

  static async getById(req, res) {
    try {
      const vino = await VinoService.getById(req.params.id);

      if (!vino) {
        return res.status(404).json({ error: "Vino no encontrado" });
      }

      res.json(vino);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener el vino" });
    }
  }

  static async create(req, res) {
    try {
      const nuevoVino = await VinoService.create(req.body);
      res.status(201).json(nuevoVino);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const vinoActualizado = await VinoService.update(
        req.params.id,
        req.body
      );

      if (!vinoActualizado) {
        return res.status(404).json({ error: "Vino no encontrado" });
      }

      res.json(vinoActualizado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al actualizar el vino" });
    }
  }

  static async delete(req, res) {
    try {
      const eliminado = await VinoService.delete(req.params.id);

      if (!eliminado) {
        return res.status(404).json({ error: "Vino no encontrado" });
      }

      res.json({
        mensaje: "Vino eliminado correctamente"
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al eliminar el vino" });
    }
  }
}