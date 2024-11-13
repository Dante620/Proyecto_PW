import model from '../models/pedido.js'

import PedidoRepository from '../repositories/pedido.js';

const repository = new PedidoRepository(model); 

const findAll = async (req, res) => {
    const pedido = await repository.getAllOrders(req.params.id);

    return res.status(200).json(pedido);
}

const findAll2 = async (req, res) => {
    const pedido = await repository.getAllOrders2();

    return res.status(200).json(pedido);
}

const create = async (req, res) => {
    const { id_usuario, id_carrito, metodoPago,direccion } = req.body;
    
    const pedidoCreated = await repository.createOrder(id_usuario, id_carrito, metodoPago,direccion);
    return res.status(201).json(pedidoCreated)
}

const findOne = async (req,res) => {
    
    const id = req.params.id;

    const result = await repository.getOrderById(id);

    return res.status(200).json(result);
}

const update = async (req, res) => {
    const pedido = req.body;
    const result = await repository.updateOrder(pedido.id, pedido.total);

    return res.status(200).json(result)
}

const remove = async (req, res) => {
    const id = req.params.id;

    const result = await repository.removeOrder(id);

    return res.status(200).json(result);
}

const controller = { findAll,findAll2, create, findOne, update, remove }

export default controller;
