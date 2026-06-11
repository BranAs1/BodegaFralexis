import { UsuarioService } from "../services/UsuarioService.js";

export class UsuarioController {
  static async getAll(req, res) {
    try {
      const usuarios = await UsuarioService.getAll();
      res.json(usuarios);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al obtener los usuarios"
      });
    }
  }

  static async registro(req, res) {
    try {
      const usuario = await UsuarioService.registro(req.body);
      res.status(201).json(usuario);
    } catch (err) {
      console.error(err);
      res.status(400).json({
        error: err.message
      });
    }
  }

  static async login(req, res) {
    try {
      const respuesta = await UsuarioService.login(req.body);
      res.json(respuesta);
    } catch (err) {
      console.error(err);
      res.status(401).json({
        error: err.message
      });
    }
  }
}