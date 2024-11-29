import RepositoryBase from "./base.js";
import itemcarrito from '../models/itemcarrito.js';
import producto from '../models/producto.js';
import carrito from '../models/carrito.js';

class CarritoRepository extends RepositoryBase {
    constructor(model) {
        super(model);
    }

    // Crear un carrito nuevo para un usuario
    async createCart(userId) {
        try {
            return await this.model.create({
                id_usuario: userId,
                estado: 'activo',
                total: 0
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Obtener todos los carritos del usuario
    async getAllCarts(userId) {
        try {
            return await this.model.findAll({
                where: { id_usuario: userId }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async findAllCarts() {
        try {
            return await this.model.findAll();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Obtener el carrito activo de un usuario
    async getActiveCart(userId) {
        try {
            return await this.model.findOne({
                where: { id_usuario: userId, estado: 'activo' }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Completar el carrito (cambiar estado a 'completado')
    async completeCart(cartId) {
        try {
            await this.model.update(
                { estado: 'completado' },
                { where: { id: cartId } }
            );
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Eliminar el carrito activo de un usuario
    async removeActiveCart(userId) {
        try {
            const activeCart = await this.getActiveCart(userId);
            if (!activeCart) {
                console.log('No active cart found for this user');
                return false;
            }
            await this.model.destroy({ where: { id: activeCart.id } });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Actualizar el total del carrito
    async updateTotal(cartId) {
        try {
            const items = await itemcarrito.findAll({
                where: { id_carrito: cartId },
                include: [{ model: producto }]
            });

            const total = items.reduce((sum, item) => {
                return sum + item.cantidad * item.producto.precio;
            }, 0);

            await this.model.update({ total }, { where: { id: cartId } });
            return total;
        } catch (error) {
            console.log('Error actualizando total del carrito:', error.message);
            return null;
        }
    }

    //Obtener el total del carrito

    async getTotal(cartId) {
        try {
            const cart = await this.model.findOne({
                where: { id: cartId }
            });
            return cart.total;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

// Exportar la clase para su uso en otros archivos
export default CarritoRepository;
