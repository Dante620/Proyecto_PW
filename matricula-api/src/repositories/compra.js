import RepositoryBase from "./base.js";
import CarritoRepository from "./carrito.js";
import carrito from "../models/carrito.js";
class compraRepository extends RepositoryBase {
 constructor(model) {
     super(model);
     this.carritoRepository = new CarritoRepository(carrito); // Instanciar correctamente CarritoRepository
 }

    // Crear un compra nuevo
    async createcompra(userId, cartId) {
        try {
            const total = await this.carritoRepository.getTotal(cartId);
            return await this.model.create({
                id_usuario: userId,
                id_carrito: cartId,
                total: total
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    // Obtener todos los compras del usuario
    async getAllcompras(userId) {
        try {
            return await this.model.findAll({
                where: { id_usuario: userId }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    //Todas las compras
    async getAllcompras2() {
        try {
            return await this.model.findAll();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    
    // Obtener un compra por id
    async getcompraById(compraId) {
        try {
            return await this.model.findOne({
                where: { id: compraId }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Actualizar un compra
    async updatecompra(compraId, total) {
        try {
            await this.model.update(
                { total: total },
                { where: { id: compraId } }
            );
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Eliminar un compra
    async removecompra(compraId) {
        try {
            await this.model.destroy({
                where: { id: compraId }
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    





}

export default compraRepository;
