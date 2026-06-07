import pool from "../config/db.js";

export class VinoRepository {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM vino");
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM vino WHERE id_vino = ?",
      [id]
    );

    return rows[0] || null;
  }

  static async create(vino) {
    const [result] = await pool.query(
      `INSERT INTO vino
      (nombre, marca, precioMinorista, precioMayorista, stock, tipoUva, tipoVino, anoCosecha, tamanoMl, esOferta)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        vino.nombre,
        vino.marca,
        vino.precioMinorista,
        vino.precioMayorista,
        vino.stock,
        vino.tipoUva,
        vino.tipoVino,
        vino.anoCosecha,
        vino.tamanoMl,
        vino.esOferta
      ]
    );

    return {
      id_vino: result.insertId,
      ...vino
    };
  }

  static async update(id, data) {
    const vinoActual = await this.getById(id);
    if (!vinoActual) return null;

    const vinoActualizado = {
      ...vinoActual,
      ...data
    };

    await pool.query(
      `UPDATE vino SET
      nombre = ?,
      marca = ?,
      precioMinorista = ?,
      precioMayorista = ?,
      stock = ?,
      tipoUva = ?,
      tipoVino = ?,
      anoCosecha = ?,
      tamanoMl = ?,
      esOferta = ?
      WHERE id_vino = ?`,
      [
        vinoActualizado.nombre,
        vinoActualizado.marca,
        vinoActualizado.precioMinorista,
        vinoActualizado.precioMayorista,
        vinoActualizado.stock,
        vinoActualizado.tipoUva,
        vinoActualizado.tipoVino,
        vinoActualizado.anoCosecha,
        vinoActualizado.tamanoMl,
        vinoActualizado.esOferta,
        id
      ]
    );

    return await this.getById(id);
  }

  static async delete(id) {
    const [result] = await pool.query(
      "DELETE FROM vino WHERE id_vino = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}