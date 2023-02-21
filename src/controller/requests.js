/**
 * Controlador para la entidad de usuarios.
 * @module RequestController
 */
const Requests = require('../models/requests');
const { matchedData } = require("express-validator");

/**
 * Listar requests
 * @async
 * @function listar
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con las requests.
 */
const listar =  async (req, res)=> {
    const requests = await Requests.findAll({raw:true})
    if (requests.length > 0) {
        return res.status(200).send(requests)
    }
    res.status(204).send(requests)
}

/**
 * Crear request
 * @async
 * @function new_request
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con el request.
 * @param {Object} req.body - Datos del request
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const new_request = async (req, res)=> {
    let user = req.user
    req = matchedData(req)
    req.user_id = user.id
    const request = await Requests.create(req)
    res.status(201).send(request);
}

/**
 * Editar el request
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con el request.
 * @param {string} req.params.id - El ID del requets que se edita
 * @param {Object} req.body - Datos del request
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const edit_request = async (req, res)=> {
    let id = req.params.id
    req = matchedData(req)
    const request = await Requests.update({description: req.description, skill_id: req.skill_id},{where: {id: id}})
    res.status(200).send(request);
}

/**
 * Eliminar el request
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {string} req.params.id - El ID del requets que se edita
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const delete_request = async (req, res)=> { 
    await Requests.destroy({where: {id: req.params.id}})
    res.status(204).send();
}

module.exports = { listar, new_request, edit_request, delete_request }