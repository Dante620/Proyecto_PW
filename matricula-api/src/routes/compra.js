import express from 'express';
import controller from '../controllers/compra.js';

const router = express.Router();

// Ruta para obtener todos los compras filtrados (asumiendo que `findAll` necesita un parámetro en req.params.id)
router.get('/usuario/:id', controller.findAll); 

// Ruta para obtener todos los compras sin filtro (usando `findAll2`)
router.get('/', controller.findAll2); 

// Ruta para obtener un compra por su ID
router.get('/:id', controller.findOne);

// Ruta para crear un nuevo compra
router.post('/', controller.create);

// Ruta para actualizar un compra existente
router.put('/', controller.update);

// Ruta para eliminar un compra por su ID
router.delete('/:id', controller.remove);

export default router;