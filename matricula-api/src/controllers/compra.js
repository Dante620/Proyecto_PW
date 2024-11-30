import model from '../models/compra.js'

import compraRepository from '../repositories/compra.js';

const repository = new compraRepository(model); 

const findAll = async (req, res) => {
    const compra = await repository.getAllcompras(req.params.id);

    return res.status(200).json(compra);
}

const create = async (req, res) => {
    const compra = req.body;
    const compraCreated = await repository.createcompra(compra.id_usuario, compra.id_carrito, compra.tipoPago, compra.direccion);
    return res.status(201).json(compraCreated)
}

const findAll2 = async (req, res) => {
    const compra = await repository.getAllcompras2();

    return res.status(200).json(compra);
}
const findOne = async (req,res) => {
    
    const id = req.params.id;

    const result = await repository.getcompraById(id);

    return res.status(200).json(result);
}

const update = async (req, res) => {
    const compra = req.body;
    const result = await repository.updatecompra(compra.id, compra.total);

    return res.status(200).json(result)
}

const remove = async (req, res) => {
    const id = req.params.id;

    const result = await repository.removecompra(id);

    return res.status(200).json(result);
}

const controller = { findAll,findAll2, create, findOne, update, remove }

export default controller;
