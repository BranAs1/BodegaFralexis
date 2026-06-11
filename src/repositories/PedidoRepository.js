import pool from "../config/db.js";

export class PedidoRepository {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT
        p.id_pedido AS id,
        p.id_cliente,
        p.estado,
        p.total,
        p.fecha,
        p.direccion_envio,
        p.zona_envio,
        p.tiempo_estimado,
        p.id_metodo_pago,
        c.nombre,
        c.apellido,
        mp.nombre AS metodo_pago
      FROM pedido p
      JOIN cliente c
      ON p.id_cliente = c.id_cliente
      LEFT JOIN metodo_pago mp
      ON p.id_metodo_pago = mp.id_metodo_pago
    `);

    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query(
      `
      SELECT
        p.id_pedido AS id,
        p.id_cliente,
        p.estado,
        p.total,
        p.fecha,
        p.direccion_envio,
        p.zona_envio,
        p.tiempo_estimado,
        p.id_metodo_pago,
        c.nombre,
        c.apellido,
        mp.nombre AS metodo_pago
      FROM pedido p
      JOIN cliente c
      ON p.id_cliente = c.id_cliente
      LEFT JOIN metodo_pago mp
      ON p.id_metodo_pago = mp.id_metodo_pago
      WHERE p.id_pedido = ?
      `,
      [id]
    );

    return rows[0] || null;
  }

  static async create(pedido) {
    const zona = pedido.zona_envio || "";
    let tiempoEstimado = pedido.tiempo_estimado;

    if (!tiempoEstimado) {
      if (
        zona.toLowerCase() === "caba" ||
        zona.toLowerCase() === "gba"
      ) {
        tiempoEstimado = "24 hs";
      } else {
        tiempoEstimado = "A coordinar";
      }
    }

    const [result] = await pool.query(
      `INSERT INTO pedido
      (
        id_cliente,
        estado,
        total,
        direccion_envio,
        zona_envio,
        tiempo_estimado,
        id_metodo_pago
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        pedido.id_cliente,
        pedido.estado || "pendiente",
        pedido.total || 0,
        pedido.direccion_envio,
        pedido.zona_envio,
        tiempoEstimado,
        pedido.id_metodo_pago
      ]
    );

    return {
      id: result.insertId,
      id_cliente: pedido.id_cliente,
      estado: pedido.estado || "pendiente",
      total: pedido.total || 0,
      direccion_envio: pedido.direccion_envio,
      zona_envio: pedido.zona_envio,
      tiempo_estimado: tiempoEstimado,
      id_metodo_pago: pedido.id_metodo_pago
    };
  }
}