/**
 * Controlador para la entidad de usuarios.
 * @module ResponseController
 */
const { matchedData } = require("express-validator");
const Responses = require("../models/response");

/**
 * Listar responses
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con los responses.
 */
const listar = async (req, res)=> {
    const responses = await Responses.findAll({raw:true})
    if (responses.length > 0) {
        return res.status(200).send(responses)
    }
    res.status(204).send(responses)
}

/**
 * Crear response
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con el response.
 * @param {Object} req.body - Datos del response
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const new_response = async (req, res)=> {
    user = req.user
    req = matchedData(req)
    req.user_id = user.id
    const response = await Responses.create(req)
    res.status(201).send(response)
}

/**
 * Editar el response
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con el response.
 * @param {string} req.params.id - El ID del response que se edita
 * @param {Object} req.body - Datos del response
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const edit_response = async (req, res)=> {
    let id = req.params.id
    user = req.user
    req = matchedData(req)
    const response = await Responses.update({description: req.description, skill_id: req.skill_id, user_id: user.id},{where: {id: id}})
    res.status(200).send(response)
}

/**
 * Eliminar el response
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {string} req.params.id - El ID del response que se edita
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const delete_response = async (req, res)=> { 
    await Responses.destroy({where: {id: req.params.id}})
    res.status(204).send();
}

module.exports = {listar, new_response, edit_response, delete_response}