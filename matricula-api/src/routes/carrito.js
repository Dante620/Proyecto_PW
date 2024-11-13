import express from 'express';
import controller from '../controllers/carrito.js';

const router = express.Router();

// Ruta para obtener todos los carritos de un usuario
router.get('/:id', controller.findAll);

// Ruta para obtener el carrito activo de un usuario
router.get('/active/:id', controller.findOne);

// Ruta para crear un nuevo carrito
router.post('/', controller.create);

// Ruta para actualizar el estado del carrito (completar carrito)
router.put('/:id', controller.update);  // Se añade el id en la URL

// Ruta para eliminar el carrito activo de un usuario
router.delete('/:id', controller.remove);

export default router;
