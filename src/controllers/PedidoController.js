import { PedidoService } from "../services/PedidoService.js";

export class PedidoController {

  static async getAll(req, res) {
    try {
      const pedidos = await PedidoService.getAll();

      res.json(pedidos);

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: err.message
      });
    }
  }

  static async getById(req, res) {
    try {
      const pedido = await PedidoService.getById(req.params.id);

      if (!pedido) {
        return res.status(404).json({
          error: "Pedido no encontrado"
        });
      }

      res.json(pedido);

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: "Error al obtener el pedido"
      });
    }
  }

  static async create(req, res) {
    try {
      const pedido = await PedidoService.create(req.body);

      res.status(201).json(pedido);

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
}