import pool from "../config/db.js";

export class ChatbotRepository {
  static async buscarVinos() {
    const [rows] = await pool.query(`
      SELECT
        id_vino AS id,
        nombre,
        marca,
        precioMinorista,
        precioMayorista,
        stock,
        tipoUva,
        tipoVino,
        anoCosecha,
        tamanoMl,
        esOferta
      FROM vino
    `);

    return rows;
  }

  static async buscarVinosPorTexto(texto) {
    const busqueda = `%${texto}%`;

    const [rows] = await pool.query(
      `
      SELECT
        id_vino AS id,
        nombre,
        marca,
        precioMinorista,
        precioMayorista,
        stock,
        tipoUva,
        tipoVino,
        anoCosecha,
        tamanoMl,
        esOferta
      FROM vino
      WHERE nombre LIKE ?
      OR marca LIKE ?
      OR tipoUva LIKE ?
      OR tipoVino LIKE ?
      LIMIT 5
      `,
      [busqueda, busqueda, busqueda, busqueda]
    );

    return rows;
  }

  static async buscarMetodosPago() {
    const [rows] = await pool.query(`
      SELECT
        id_metodo_pago AS id,
        nombre,
        descripcion
      FROM metodo_pago
      WHERE activo = true
    `);

    return rows;
  }

  static async buscarFaqPorCategoria(categoria) {
    const [rows] = await pool.query(
      `
      SELECT
        id_faq AS id,
        pregunta,
        respuesta,
        categoria
      FROM faq
      WHERE categoria = ?
      AND activo = true
      LIMIT 1
      `,
      [categoria]
    );

    return rows[0] || null;
  }
}