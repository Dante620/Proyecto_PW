import usuario from '../models/usuario.js';

class RepositoryBase {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(entity) {
    try {
      return await this.model.create(entity);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(id) {
    try {
      return await this.model.findOne({ where: { id: id } });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(entity) {
    try {
      await this.model.update(entity, { where: { id: entity.id } });
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async remove(id) {
    try {
      const entity = await this.findOne(id);
      if (entity) {
        await this.model.destroy({ where: { id: id } });
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Función para autenticar usuario
  async authenticateUser(email, password) {
    try {
      // Buscar al usuario por su correo electrónico
      const user = await usuario.findOne({ where: { email } });

      // Verificar si el usuario existe y la contraseña coincide
      if (user && user.password === password) {
        return {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          rol: user.rol,
        };
      }

      // Si el usuario no existe o la contraseña no coincide, devolver null
      return null;
    } catch (err) {
      console.error("Error en la autenticación:", err);
      throw new Error("Error al verificar el usuario.");
    }
  }
}

export default RepositoryBase;


