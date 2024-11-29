import model from '../models/marca.js'
import RepositoryBase from '../repositories/base.js';

const repository = new RepositoryBase(model);

const findAll = async (req, res) => {
    const marca = await repository.findAll();

    return res.status(200).json(marca);
}

const create = async (req, res) => {
    const marca = req.body;
    const marcaCreated = await repository.create(marca);
    return res.status(201).json(marcaCreated)
}

const findOne = async (req,res) => {
    
    const id = req.params.id;

    const result = await repository.findOne(id);

    return res.status(200).json(result);
}

const update = async (req, res) => {
    const marca = req.body;
    const result = await repository.update(marca);

    return res.status(200).json(result)
}

const remove = async (req, res) => {
    const id = req.params.id;

    const result = await repository.remove(id);

    return res.status(200).json(result);
}

const controller = { findAll, create, findOne, update, remove }

export default controller;