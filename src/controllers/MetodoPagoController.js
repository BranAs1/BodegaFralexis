import { MetodoPagoService } from "../services/MetodoPagoService.js";

export class MetodoPagoController {
  static async getAll(req, res) {
    try {
      const metodos = await MetodoPagoService.getAll();
      res.json(metodos);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al obtener los métodos de pago"
      });
    }
  }

  static async getById(req, res) {
    try {
      const metodo = await MetodoPagoService.getById(req.params.id);

      if (!metodo) {
        return res.status(404).json({
          error: "Método de pago no encontrado"
        });
      }

      res.json(metodo);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al obtener el método de pago"
      });
    }
  }

  static async create(req, res) {
    try {
      const creado = await MetodoPagoService.create(req.body);
      res.status(201).json(creado);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al crear el método de pago"
      });
    }
  }
}