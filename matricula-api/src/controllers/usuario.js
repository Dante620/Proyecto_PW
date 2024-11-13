import model from '../models/usuario.js'
import RepositoryBase from '../repositories/base.js';

const repository = new RepositoryBase(model);

const findAll = async (req, res) => {
    const usuario = await repository.findAll();

    return res.status(200).json(usuario);
}

const create = async (req, res) => {
    const usuario = req.body;
    const usuarioCreated = await repository.create(usuario);
    return res.status(201).json(usuarioCreated)
}

const findOne = async (req,res) => {
    
    const id = req.params.id;

    const result = await repository.findOne(id);

    return res.status(200).json(result);
}

const update = async (req, res) => {
    const usuario = req.body;
    const result = await repository.update(usuario);

    return res.status(200).json(result)
}

const remove = async (req, res) => {
    const id = req.params.id;

    const result = await repository.remove(id);

    return res.status(200).json(result);
}

const controller = { findAll, create, findOne, update, remove }

export default controller;