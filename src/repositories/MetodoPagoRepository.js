import pool from "../config/db.js";

export class MetodoPagoRepository {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT
        id_metodo_pago AS id,
        nombre,
        descripcion,
        activo
      FROM metodo_pago
      WHERE activo = true
    `);

    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query(
      `
      SELECT
        id_metodo_pago AS id,
        nombre,
        descripcion,
        activo
      FROM metodo_pago
      WHERE id_metodo_pago = ?
      `,
      [id]
    );

    return rows[0] || null;
  }

  static async create(metodoPago) {
    const [result] = await pool.query(
      `
      INSERT INTO metodo_pago
      (nombre, descripcion, activo)
      VALUES (?, ?, ?)
      `,
      [
        metodoPago.nombre,
        metodoPago.descripcion,
        metodoPago.activo ?? true
      ]
    );

    return {
      id: result.insertId,
      ...metodoPago
    };
  }
}