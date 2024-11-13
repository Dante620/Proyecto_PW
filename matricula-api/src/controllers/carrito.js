import model from '../models/carrito.js'
import CarritoRepository from '../repositories/carrito.js'

const repository = new CarritoRepository(model);

const findAll = async (req, res) => {   
    const carrito = await repository.getAllCarts(req.params.id);
    return res.status(200).json(carrito);
}

const create = async (req, res) => {
    const carrito = req.body;
    const carritoCreated = await repository.createCart(carrito.id_usuario);
    return res.status(201).json(carritoCreated)
}

const findOne = async (req,res) => {
    
    const id = req.params.id;

    const result = await repository.getActiveCart(id);

    return res.status(200).json(result);
}

const update = async (req, res) => {
    const id = req.params.id;  // Cambiado para obtener el id desde req.params
    const result = await repository.completeCart(id);

    return res.status(200).json(result);
}


const remove = async (req, res) => {
    const id = req.params.id;

    const result = await repository.removeActiveCart(id);

    return res.status(200).json(result);
   
}

const controller = { findAll, create, findOne, update, remove }

export default controller;