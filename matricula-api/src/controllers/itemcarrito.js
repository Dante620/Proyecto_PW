import ItemCarritoRepository from '../repositories/itemcarrito.js';
import model from '../models/itemcarrito.js';

const repository = new ItemCarritoRepository(model);

// Agregar un producto al carrito
const addItem = async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;
    const newItem = await repository.addItemToCart(cartId, productId, quantity);
    
    if (newItem) {
        return res.status(201).json(newItem);
    } else {
        return res.status(500).json({ message: 'Error al agregar el producto al carrito' });
    }
}

// Obtener todos los productos de un carrito
const getItems = async (req, res) => {
    const { cartId } = req.params;
    const items = await repository.getItemsFromCart(cartId);
    
    if (items) {
        return res.status(200).json(items);
    } else {
        return res.status(500).json({ message: 'Error al obtener los productos del carrito' });
    }
}

// Actualizar la cantidad de un producto en el carrito
const updateItemQuantity = async (req, res) => {
    const { itemId,cartId} = req.params;
    const { quantity} = req.body;
    const result = await repository.updateItemQuantity(itemId, quantity, cartId);
    
    if (result) {
        return res.status(200).json({ message: 'Cantidad actualizada exitosamente' });
    } else {
        return res.status(500).json({ message: 'Error al actualizar la cantidad' });
    }
}

// Eliminar un producto del carrito
const removeItem = async (req, res) => {
    const { itemId, cartId } = req.params;
    const result = await repository.removeItemFromCart(itemId, cartId);
    
    if (result) {
        return res.status(200).json({ message: 'Producto eliminado del carrito' });
    } else {
        return res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
    }
}

//Eliminar todos los items de un carrito
const removeAllItems = async (req, res) => {
    const { cartId } = req.params;
    const result = await repository.removeAllItemsFromCart(cartId);
    
    if (result) {
        return res.status(200).json({ message: 'Items eliminados del carrito' });
    } else {
        return res.status(500).json({ message: 'Error al eliminar los items del carrito' });
    }
}

const controller = { addItem, getItems, updateItemQuantity, removeItem , removeAllItems};
export default controller;
