import express from 'express';
import controller from '../controllers/pedido.js';

const router = express.Router();

// Ruta para obtener todos los pedidos filtrados (asumiendo que `findAll` necesita un parámetro en req.params.id)
router.get('/usuario/:id', controller.findAll); 

// Ruta para obtener todos los pedidos sin filtro (usando `findAll2`)
router.get('/', controller.findAll2); 

// Ruta para obtener un pedido por su ID
router.get('/:id', controller.findOne);

// Ruta para crear un nuevo pedido
router.post('/', controller.create);

// Ruta para actualizar un pedido existente
router.put('/', controller.update);

// Ruta para eliminar un pedido por su ID
router.delete('/:id', controller.remove);

export default router;
