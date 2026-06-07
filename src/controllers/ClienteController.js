import { ClienteService } from "../services/ClienteService.js";

export class ClienteController {
  static async getAll(req, res) {
    try {
      const clientes = await ClienteService.getAll();
      res.json(clientes);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err.message
      });
    }
  }

  static async getById(req, res) {
    try {
      const cliente = await ClienteService.getById(req.params.id);

      if (!cliente) {
        return res.status(404).json({
          error: "Cliente no encontrado"
        });
      }

      res.json(cliente);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al obtener el cliente"
      });
    }
  }

  static async create(req, res) {
    try {
      const creado = await ClienteService.create(req.body);

      res.status(201).json(creado);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al crear el cliente"
      });
    }
  }

  static async update(req, res) {
    try {
      const actualizado = await ClienteService.update(
        req.params.id,
        req.body
      );

      if (!actualizado) {
        return res.status(404).json({
          error: "Cliente no encontrado"
        });
      }

      res.json(actualizado);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al actualizar el cliente"
      });
    }
  }

  static async delete(req, res) {
    try {
      const eliminado = await ClienteService.delete(req.params.id);

      if (!eliminado) {
        return res.status(404).json({
          error: "Cliente no encontrado"
        });
      }

      res.json({
        mensaje: "Cliente eliminado correctamente"
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al eliminar el cliente"
      });
    }
  }
}