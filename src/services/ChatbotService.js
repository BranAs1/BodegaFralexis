import { ChatbotRepository } from "../repositories/ChatbotRepository.js";
import { FaqRepository } from "../repositories/FaqRepository.js";

export class ChatbotService {
  static limpiarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  static contiene(texto, palabras) {
    return palabras.some((palabra) => texto.includes(palabra));
  }

  static async responder(mensaje) {
    if (!mensaje || mensaje.trim() === "") {
      return {
        respuesta:
          "Escribime una consulta sobre vinos, envíos, pagos, contacto o funciones de la bodega."
      };
    }

    const texto = this.limpiarTexto(mensaje);

    if (
      this.contiene(texto, [
        "hola",
        "buenas",
        "buen dia",
        "buenas tardes",
        "buenas noches"
      ])
    ) {
      return {
        respuesta:
          "¡Hola! Soy el asistente de Bodega Fralexis. Puedo ayudarte con vinos, precios, stock, métodos de pago, envíos, contacto y funciones de la app."
      };
    }

    if (
      this.contiene(texto, [
        "contacto",
        "whatsapp",
        "telefono",
        "email",
        "correo",
        "comunicar"
      ])
    ) {
      const faq = await ChatbotRepository.buscarFaqPorCategoria("contacto");

      return {
        respuesta: faq
          ? faq.respuesta
          : "Podés comunicarte con la bodega por WhatsApp al 11-1234-5678 o por email a contacto@bodegafralexis.com."
      };
    }

    if (
      this.contiene(texto, [
        "envio",
        "envios",
        "entrega",
        "llega",
        "demora",
        "tarda",
        "caba",
        "gba"
      ])
    ) {
      const faq = await ChatbotRepository.buscarFaqPorCategoria("envios");

      return {
        respuesta: faq
          ? faq.respuesta
          : "Realizamos envíos a todo el país. En CABA y GBA el tiempo estimado de entrega es de 24 a 48 horas hábiles."
      };
    }

    if (
      this.contiene(texto, [
        "pago",
        "pagos",
        "metodo de pago",
        "metodos de pago",
        "tarjeta",
        "debito",
        "credito",
        "mercado pago",
        "efectivo"
      ])
    ) {
      return {
        respuesta:
          "Aceptamos únicamente pagos con tarjeta de débito y tarjeta de crédito. No aceptamos efectivo ni Mercado Pago."
      };
    }

    if (
      this.contiene(texto, [
        "funcion",
        "funciones",
        "app",
        "sistema",
        "puedo hacer",
        "comprar",
        "carrito",
        "registrarme",
        "login",
        "iniciar sesion"
      ])
    ) {
      const faq = await ChatbotRepository.buscarFaqPorCategoria("app");

      return {
        respuesta: faq
          ? faq.respuesta
          : "La app permite registrarse, iniciar sesión, ver el catálogo, consultar precios y stock, agregar productos al carrito, elegir método de pago y generar pedidos."
      };
    }

    if (
      this.contiene(texto, [
        "vino",
        "vinos",
        "producto",
        "productos",
        "catalogo",
        "stock",
        "precio",
        "malbec",
        "cabernet",
        "chardonnay",
        "espumante",
        "rosado",
        "tinto",
        "blanco"
      ])
    ) {
      const vinos = await ChatbotRepository.buscarVinosPorTexto(texto);

      if (vinos.length === 0) {
        const todos = await ChatbotRepository.buscarVinos();

        if (todos.length === 0) {
          return {
            respuesta: "Todavía no hay vinos cargados en el catálogo."
          };
        }

        const listaGeneral = todos
          .slice(0, 5)
          .map(
            (vino) =>
              `${vino.nombre} (${vino.tipoVino}) - $${vino.precioMinorista} - stock: ${vino.stock}`
          )
          .join(". ");

        return {
          respuesta: `Estos son algunos vinos disponibles: ${listaGeneral}.`
        };
      }

      const lista = vinos
        .map((vino) => {
          return `${vino.nombre} de ${vino.marca}, tipo ${vino.tipoVino}, uva ${vino.tipoUva}, cosecha ${vino.anoCosecha}, precio minorista $${vino.precioMinorista}, stock disponible: ${vino.stock}`;
        })
        .join(". ");

      return {
        respuesta: lista
      };
    }

    const faq = await FaqRepository.buscarPorTexto(texto);

    if (faq) {
      return {
        respuesta: faq.respuesta
      };
    }

    return {
      respuesta:
        "Disculpame, solo puedo ayudarte con consultas sobre la bodega, vinos, productos, envíos, pagos, contacto y funciones de la app."
    };
  }
}