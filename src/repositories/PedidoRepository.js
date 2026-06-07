import pool from "../config/db.js";

export class PedidoRepository {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT
        p.id_pedido AS id,
        p.estado,
        p.total,
        p.fecha,
        c.nombre,
        c.apellido
      FROM pedido p
      JOIN cliente c
      ON p.id_cliente = c.id_cliente
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
        c.nombre,
        c.apellido
      FROM pedido p
      JOIN cliente c
      ON p.id_cliente = c.id_cliente
      WHERE p.id_pedido = ?
      `,
      [id]
    );

    return rows[0] || null;
  }

  static async create(pedido) {
    const [result] = await pool.query(
      `INSERT INTO pedido
      (id_cliente, estado, total)
      VALUES (?, ?, ?)`,
      [
        pedido.id_cliente,
        pedido.estado || "pendiente",
        pedido.total || 0
      ]
    );

    return {
      id: result.insertId,
      ...pedido
    };
  }
}