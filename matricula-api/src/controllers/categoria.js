import model from '../models/categoria.js'
import RepositoryBase from '../repositories/base.js';

const repository = new RepositoryBase(model);

const findAll = async (req, res) => {
    const categoria = await repository.findAll();

    return res.status(200).json(categoria);
}

const create = async (req, res) => {
    const categoria = req.body;
    const categoriaCreated = await repository.create(categoria);
    return res.status(201).json(categoriaCreated)
}

const findOne = async (req,res) => {
    
    const id = req.params.id;

    const result = await repository.findOne(id);

    return res.status(200).json(result);
}

const update = async (req, res) => {
    const categoria = req.body;
    const result = await repository.update(categoria);

    return res.status(200).json(result)
}

const remove = async (req, res) => {
    const id = req.params.id;

    const result = await repository.remove(id);

    return res.status(200).json(result);
}

const controller = { findAll, create, findOne, update, remove }

export default controller;