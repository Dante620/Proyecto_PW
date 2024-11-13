import RepositoryBase from "./base.js";
import CarritoRepository from "./carrito.js";
import carrito from "../models/carrito.js"; // Importa el modelo de carrito

class PedidoRepository extends RepositoryBase {
    constructor(model) {
        super(model);
        this.carritoRepository = new CarritoRepository(carrito); // Instanciar correctamente CarritoRepository
    }

    // Crear un pedido nuevo
    async createOrder(userId, cartId, metodoPago, direccion) {
        try {
            // Obtener el total del carrito
            const total = await this.carritoRepository.getTotal(cartId);// Llamar a updateTotal

            // Verificar si se obtuvo el total correctamente
            if (total === null) {
                console.log('Error al obtener el total del carrito');
                return null;
            }

            // Crear el pedido con el total obtenido
            return await this.model.create({
                id_usuario: userId,
                id_carrito: cartId,
                total: total,
                metodoPago: metodoPago,
                direccion: direccion
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Obtener todos los pedidos
    async getAllOrders2() {
        try {
            return await this.model.findAll();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Obtener todos los pedidos del usuario
    async getAllOrders(userId) {
        try {
            return await this.model.findAll({
                where: { id_usuario: userId }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Obtener un pedido por id
    async getOrderById(orderId) {
        try {
            return await this.model.findOne({
                where: { id: orderId }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Actualizar un pedido
    async updateOrder(orderId, total) {
        try {
            await this.model.update(
                { total: total },
                { where: { id: orderId } }
            );
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Eliminar un pedido
    async removeOrder(orderId) {
        try {
            await this.model.destroy({
                where: { id: orderId }
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default PedidoRepository;
