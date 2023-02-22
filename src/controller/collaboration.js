/**
 * Controlador para la entidad de usuarios.
 * @module CollaborationController
 */
const Requests = require('../models/requests');
const Responses = require('../models/response');
const { matchedData } = require("express-validator");
const Collaborations = require('../models/collaboration');
const Users = require("../models/users");
const {sendMail} = require("../helpers/helpermail")


/**
 * Listar collaboraciones
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con las colaboraciones.
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const listar =  async (req, res)=> {
    const collaborations = await Collaborations.findAll({raw:true})
    if (collaborations.length > 0) {
        return res.status(200).send(collaborations)
    }
    res.status(204).send(collaborations)
}

/**
 * Crear collaboracion a partir del request
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con la colaboracion.
 * @param {string} req.params.id - El ID del requets que se acepta
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const new_collaboration_req = async (req, res)=> {
    const user = req.user
    let request_id = req.params.id
    req = matchedData(req)
    const request = await Requests.findOne({raw:true, where: {id: request_id}})
    req.user_id_req = request.user_id
    req.user_id_res = user.id
    req.skill_id = request.skill_id
    await Requests.destroy({where: {id: request_id}})
    await Responses.update({disponible: false},{where: {user_id: req.user_id_req}})
    await Requests.update({disponible: false},{where: {user_id: req.user_id_res}})
    await Responses.update({disponible: false},{where: {user_id: req.user_id_res}})
    const collaboration = await Collaborations.create(req)
    const user_req = Users.findOne({where: {id: req.user_id_req}})
    const user_res = Users.findOne({where: {id: req.user_id_res}})
    sendMail(user_req.email, 'Collaboración iniciada', `Tu request: ${request.description}. Ha sido aceptada por ${user_res.username}`);
    sendMail(user_res.email, 'Collaboración iniciada', `Has aceptado la request: ${request.description}. Del usuario ${user_req.username}`);
    res.status(201).send(collaboration);
}

/**
 * Crear collaboracion a partir del response
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con la colaboracion.
 * @param {string} req.params.id - El ID del response que se acepta
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const new_collaboration_res = async (req, res)=> {
    const user = req.user
    let response_id = req.params.id
    req = matchedData(req)
    const response = await Responses.findOne({raw:true, where: {id: response_id}})
    req.user_id_res = response.user_id
    req.user_id_req = user.id
    req.skill_id = response.skill_id
    await Responses.destroy({where: {id: response_id}}) 
    await Requests.update({disponible: false},{where: {user_id: req.user_id_res}})
    await Requests.update({disponible: false},{where: {user_id: req.user_id_req}})
    await Responses.update({disponible: false},{where: {user_id: req.user_id_req}})
    const collaboration = await Collaborations.create(req)
    const user_req = Users.findOne({where: {id: req.user_id_req}})
    const user_res = Users.findOne({where: {id: req.user_id_res}})
    sendMail(user_res.email, 'Collaboración iniciada', `Tu response: ${response.description}. Ha sido aceptada por ${user_res.username}`);
    sendMail(user_req.email, 'Collaboración iniciada', `Has aceptado la request: ${response.description}. Del usuario ${user_req.username}`);
    res.status(201).send(collaboration);
}

/**
 * Editar collaboracion 
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con la colaboracion.
 * @param {string} req.params.id - El ID del collaboration
 * @param {string} req.body.description - descripción de la collab
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const edit_collaboration = async (req, res)=> { 
    let id = req.params.id
    req = matchedData(req)
    const collaboration = await Collaborations.update({description: req.description},{where: {id: id}})
    res.status(200).send(collaboration);
}

/**
 * Crear collaboracion a partir del response
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {string} req.params.id - El ID del response que se acepta
 * @param {string} req.body.description - descripción de la collab
 * @param {int} req.body.saldo - horas de la collab
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const finish_collaboration = async (req, res)=> { 
    const collaboration = await Collaborations.findOne({where: {id: req.params.id}})
    await Collaborations.update({state: "terminado"},{where: {id: req.params.id}})
    const id_req = collaboration.user_id_req
    const id_res = collaboration.user_id_res
    req = matchedData(req)
    const user_req = await Users.increment('saldo', { by: -req.duracion, where: {id: id_req}})
    await Users.increment('saldo', { by: req.duracion, where: {id: id_res}})
    if(user_req.saldo > 0) {
        await Requests.update({disponible: true},{where: {user_id: id_req}})    
    }
    await Responses.update({disponible: true},{where: {user_id: id_req}})
    await Requests.update({disponible: true},{where: {user_id: id_res}})
    await Responses.update({disponible: true},{where: {user_id: id_res}})
    const user_res = Users.findOne({where: {id: id_res}})
    sendMail(user_res.email, 'Collaboración terminada', `Tu collaboracion con ${user_req.username} ha finalizado`);
    sendMail(user_req.email, 'Collaboración terminada', `Tu collaboracion con ${user_res.username} ha finalizado`);
    res.status(204).send();
}

/**
 * Eliminar collaboracion a partir del response
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {string} req.params.id - El ID de la collaboration.
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const delete_collaboration = async (req, res)=> { 
    const collaboration = await Collaborations.findOne({where: {id: req.params.id}})
    const id_req = collaboration.user_id_req
    const id_res = collaboration.user_id_res
    await Requests.update({disponible: true},{where: {user_id: id_req}})
    await Responses.update({disponible: true},{where: {user_id: id_req}})
    await Requests.update({disponible: true},{where: {user_id: id_res}})
    await Responses.update({disponible: true},{where: {user_id: id_res}})
    await Collaborations.destroy({where: {id: req.params.id}})
    res.status(204).send();
}

module.exports = { listar, new_collaboration_req, new_collaboration_res, edit_collaboration, finish_collaboration, delete_collaboration }