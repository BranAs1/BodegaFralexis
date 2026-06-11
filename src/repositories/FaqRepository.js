import pool from "../config/db.js";

export class FaqRepository {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT
        id_faq AS id,
        pregunta,
        respuesta,
        categoria,
        activo
      FROM faq
      WHERE activo = true
    `);

    return rows;
  }

  static async getByCategoria(categoria) {
    const [rows] = await pool.query(
      `
      SELECT
        id_faq AS id,
        pregunta,
        respuesta,
        categoria,
        activo
      FROM faq
      WHERE categoria = ?
      AND activo = true
      `,
      [categoria]
    );

    return rows;
  }

  static async buscarPorTexto(texto) {
    const busqueda = `%${texto}%`;

    const [rows] = await pool.query(
      `
      SELECT
        id_faq AS id,
        pregunta,
        respuesta,
        categoria,
        activo
      FROM faq
      WHERE activo = true
      AND (
        pregunta LIKE ?
        OR respuesta LIKE ?
        OR categoria LIKE ?
      )
      LIMIT 1
      `,
      [busqueda, busqueda, busqueda]
    );

    return rows[0] || null;
  }
}