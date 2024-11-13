import express from 'express';
import controller from '../controllers/itemcarrito.js';

const router = express.Router();

// Ruta para agregar un producto al carrito
router.post('/:cartId', controller.addItem);

// Ruta para obtener todos los productos de un carrito
router.get('/:cartId', controller.getItems);

// Ruta para actualizar la cantidad de un producto en el carrito
router.put('/:itemId/:cartId', controller.updateItemQuantity);

// Ruta para eliminar un producto del carrito
router.delete('/:itemId/:cartId', controller.removeItem);
router.delete('/:cartId', controller.removeAllItems);
export default router;
