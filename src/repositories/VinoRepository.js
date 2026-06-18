import pool from "../config/db.js";
import { JsonRepository } from "../data/JsonRepository.js";

export class VinoRepository {
  static jsonRepo = new JsonRepository('vinos.json');

  static async getAll() {
    try {
      const [rows] = await pool.query("SELECT * FROM vino");
      return rows;
    } catch (error) {
      console.warn("DB no disponible, cargando vinos desde JSON:", error.message);
      return await VinoRepository.jsonRepo.getAll();
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM vino WHERE id_vino = ?",
        [id]
      );

      if (rows.length > 0) return rows[0];
    } catch (error) {
      console.warn("DB no disponible, buscando vino en JSON:", error.message);
    }

    return await VinoRepository.jsonRepo.getById(id);
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