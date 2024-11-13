import RepositoryBase from "./base.js";
import carrito from "../models/carrito.js";
import CarritoRepository from "./carrito.js"; // Asegúrate de que la ruta sea correcta

class ItemCarritoRepository extends RepositoryBase {
    constructor(model) {
        super(model);
        this.carritoRepository = new CarritoRepository(carrito); // Instancia de CarritoRepository
    }

    // Agregar un producto a un carrito y actualizar el total
    async addItemToCart(cartId, productId, quantity) {
        try {
            const newItem = await this.model.create({
                id_carrito: cartId,
                id_producto: productId,
                cantidad: quantity
            });

            // Actualizar el total del carrito después de agregar un producto
            await this.carritoRepository.updateTotal(cartId);
            return newItem;
        } catch (error) {
            console.log('Error al agregar al carrito:', error.message);
            return null;
        }
    }

    // Obtener todos los productos de un carrito
    async getItemsFromCart(cartId) {
        try {
            return await this.model.findAll({
                where: { id_carrito: cartId }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Actualizar la cantidad de un producto en un carrito y el total
    async updateItemQuantity(itemId, quantity, cartId) {
        try {
            await this.model.update(
                { cantidad: quantity },
                { where: { id: itemId, id_carrito: cartId } }
            );

            // Actualizar el total del carrito después de cambiar la cantidad de un producto
            await this.carritoRepository.updateTotal(cartId);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Eliminar un producto de un carrito y actualizar el total
    async removeItemFromCart(itemId, cartId) {
        try {
            await this.model.destroy({
                where: { id: itemId, id_carrito: cartId }
            });

            // Actualizar el total del carrito después de eliminar un producto
            await this.carritoRepository.updateTotal(cartId);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Eliminar todos los productos de un carrito
    async removeAllItemsFromCart(cartId) {
        try {
            await this.model.destroy({
                where: { id_carrito: cartId }
            });

            // Actualizar el total del carrito después de eliminar todos los productos
            await this.carritoRepository.updateTotal(cartId);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default ItemCarritoRepository;
