import pool from "../config/db.js";

export class CategoriaRepository {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM categoria");
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM categoria WHERE id_categoria = ?",
      [id]
    );

    return rows[0] || null;
  }

  static async create(categoria) {
    const [result] = await pool.query(
      `INSERT INTO categoria
      (nombre, descripcion)
      VALUES (?, ?)`,
      [
        categoria.nombre,
        categoria.descripcion
      ]
    );

    return {
      id_categoria: result.insertId,
      ...categoria
    };
  }

  static async update(id, data) {
    const categoriaActual = await this.getById(id);

    if (!categoriaActual) return null;

    const categoriaActualizada = {
      ...categoriaActual,
      ...data
    };

    await pool.query(
      `UPDATE categoria SET
      nombre = ?,
      descripcion = ?
      WHERE id_categoria = ?`,
      [
        categoriaActualizada.nombre,
        categoriaActualizada.descripcion,
        id
      ]
    );

    return await this.getById(id);
  }

  static async delete(id) {
    const [result] = await pool.query(
      "DELETE FROM categoria WHERE id_categoria = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}