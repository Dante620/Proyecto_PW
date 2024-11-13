import model from '../models/imagenesproducto.js'

import ImagenesProductoRepository from '../repositories/imagenesproducto.js';

const repository = new ImagenesProductoRepository(model);

const findAll = async (req, res) => {
    const imagenesproducto = await repository.TodasLasImagenes();

    return res.status(200).json(imagenesproducto);
}

const create = async (req, res) => {
    const imagenesproducto = req.body;
    const imagenesproductoCreated = await repository.createImage(imagenesproducto.url, imagenesproducto.id_producto);
    return res.status(201).json(imagenesproductoCreated)

}

const findOne = async (req,res) => {
    
    const id = req.params.id;

    const result = await repository.getImagesByProductId(id);

    return res.status(200).json(result);
}

const update = async (req, res) => {
    const imagenesproducto = req.body;
    const result = await repository.updateImage(imagenesproducto.id, imagenesproducto.url);

    return res.status(200).json(result)
}

const remove = async (req, res) => {
    const id = req.params.id;

    const result = await repository.deleteImage(id);

    return res.status(200).json(result);
}

const controller = { findAll, create, findOne, update, remove }

export default controller;