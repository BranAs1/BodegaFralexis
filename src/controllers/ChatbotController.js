import { ChatbotService } from "../services/ChatbotService.js";

export class ChatbotController {
  static async responder(req, res) {
    try {
      const { mensaje } = req.body;

      const respuesta = await ChatbotService.responder(mensaje);

      res.json(respuesta);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Error al procesar la consulta del chatbot"
      });
    }
  }
}