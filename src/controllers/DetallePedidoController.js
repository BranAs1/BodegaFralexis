import { DetallePedidoService } from "../services/DetallePedidoService.js";

export class DetallePedidoController {

  static async getAll(req, res) {
    try {
      const detalles = await DetallePedidoService.getAll();

      res.json(detalles);

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: err.message
      });
    }
  }

  static async getById(req, res) {
    try {
      const detalle = await DetallePedidoService.getById(req.params.id);

      if (!detalle) {
        return res.status(404).json({
          error: "Detalle de pedido no encontrado"
        });
      }

      res.json(detalle);

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: "Error al obtener el detalle de pedido"
      });
    }
  }

  static async create(req, res) {
    try {
      const detalle = await DetallePedidoService.create(req.body);

      res.status(201).json(detalle);

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
}