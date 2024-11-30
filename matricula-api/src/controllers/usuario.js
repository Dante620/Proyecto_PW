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

const authenticate = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await repository.authenticateUser(email, password);
  
      if (user) {
        res.json(user); // Si las credenciales son correctas, devolver el usuario
      } else {
        res.status(401).json({ error: "Credenciales incorrectas" }); // Si las credenciales no son correctas
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error del servidor al autenticar el usuario" });
    }
  };

const controller = { authenticate,findAll, create, findOne, update, remove }

export default controller;