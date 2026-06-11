import pool from "../config/db.js";

export class UsuarioRepository {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT
        id_usuario AS id,
        nombre,
        apellido,
        email,
        telefono,
        direccion
      FROM usuario
    `);

    return rows;
  }

  static async getByEmail(email) {
    const [rows] = await pool.query(
      `
      SELECT
        id_usuario AS id,
        nombre,
        apellido,
        email,
        password,
        telefono,
        direccion
      FROM usuario
      WHERE email = ?
      `,
      [email]
    );

    return rows[0] || null;
  }

  static async create(usuario) {
    const [result] = await pool.query(
      `
      INSERT INTO usuario
      (nombre, apellido, email, password, telefono, direccion)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        usuario.nombre,
        usuario.apellido,
        usuario.email,
        usuario.password,
        usuario.telefono,
        usuario.direccion
      ]
    );

    return {
      id: result.insertId,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      telefono: usuario.telefono,
      direccion: usuario.direccion
    };
  }
}