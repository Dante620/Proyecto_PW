import model from '../models/producto.js'
import RepositoryBase from '../repositories/base.js';

const repository = new RepositoryBase(model);

const findAll = async (req, res) => {
    const producto = await repository.findAll();

    return res.status(200).json(producto);
}

const create = async (req, res) => {
    const producto = req.body;
    const productoCreated = await repository.create(producto);
    return res.status(201).json(productoCreated)
}

const findOne = async (req,res) => {
    
    const id = req.params.id;

    const result = await repository.findOne(id);

    return res.status(200).json(result);
}

const update = async (req, res) => {
    const producto = req.body;
    const result = await repository.update(producto);

    return res.status(200).json(result)
}

const remove = async (req, res) => {
    const id = req.params.id;

    const result = await repository.remove(id);

    return res.status(200).json(result);
}

// Suponiendo que tu controlador de productos en el backend está ajustado de esta forma:
const findByCategoria = async (req, res) => {
    const { categoria } = req.query; // Aquí obtenemos el nombre de la categoría desde la query
  
    try {
      // Aquí buscas todos los productos relacionados con la categoría
      const productos = await productoRepository.findByCategoria(categoria);
      return res.status(200).json(productos);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los productos' });
    }
  }
  

const controller = { findAll, create, findOne, update, remove , findByCategoria}

export default controller;