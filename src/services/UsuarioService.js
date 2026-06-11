import { UsuarioRepository } from "../repositories/UsuarioRepository.js";

export class UsuarioService {
  static async getAll() {
    return await UsuarioRepository.getAll();
  }

  static async registro(data) {
    const usuarioExistente = await UsuarioRepository.getByEmail(data.email);

    if (usuarioExistente) {
      throw new Error("Ya existe un usuario registrado con ese email");
    }

    return await UsuarioRepository.create(data);
  }

  static async login(data) {
    const usuario = await UsuarioRepository.getByEmail(data.email);

    if (!usuario) {
      throw new Error("Email o contraseña incorrectos");
    }

    if (usuario.password !== data.password) {
      throw new Error("Email o contraseña incorrectos");
    }

    return {
      mensaje: "Login correcto",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        telefono: usuario.telefono,
        direccion: usuario.direccion
      }
    };
  }
}