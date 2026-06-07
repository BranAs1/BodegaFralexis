import pool from "../config/db.js";

export class ClienteRepository {

  static async getAll() {
  const [rows] = await pool.query(
    `SELECT 
      id_cliente AS id,
      nombre,
      apellido,
      email,
      telefono,
      direccionEnvio,
      tipo,
      cuit
    FROM cliente`
  );

  return rows;
}

  static async getById(id) {
  const [rows] = await pool.query(
    `SELECT 
      id_cliente AS id,
      nombre,
      apellido,
      email,
      telefono,
      direccionEnvio,
      tipo,
      cuit
    FROM cliente
    WHERE id_cliente = ?`,
    [id]
  );

  return rows[0] || null;
}

  static async create(cliente) {

    const [result] = await pool.query(
      `INSERT INTO cliente
      (nombre, apellido, email, telefono, direccionEnvio, tipo, cuit)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        cliente.nombre,
        cliente.apellido,
        cliente.email,
        cliente.telefono,
        cliente.direccionEnvio,
        cliente.tipo,
        cliente.cuit
      ]
    );

    return {
      id_cliente: result.insertId,
      ...cliente
    };
  }

  static async update(id, data) {

    const clienteActual = await this.getById(id);

    if (!clienteActual) return null;

    const clienteActualizado = {
      ...clienteActual,
      ...data
    };

    await pool.query(
      `UPDATE cliente SET
      nombre = ?,
      apellido = ?,
      email = ?,
      telefono = ?,
      direccionEnvio = ?,
      tipo = ?,
      cuit = ?
      WHERE id_cliente = ?`,
      [
        clienteActualizado.nombre,
        clienteActualizado.apellido,
        clienteActualizado.email,
        clienteActualizado.telefono,
        clienteActualizado.direccionEnvio,
        clienteActualizado.tipo,
        clienteActualizado.cuit,
        id
      ]
    );

    return await this.getById(id);
  }

  static async delete(id) {

    const [result] = await pool.query(
      "DELETE FROM cliente WHERE id_cliente = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}