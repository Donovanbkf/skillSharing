/**
 * Controlador para la entidad de usuarios.
 * @module SkillsController
 */
const Skills = require("../models/skills")
const { matchedData } = require("express-validator");

/**
 * Listar skills
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con las skills.
 */
const listar = async (req, res)=> {
    const skills = await Skills.findAll({raw:true})
    if (skills.length > 0) {
        return res.status(200).send(skills)
    }
    res.status(204).send(skills)
}

/**
 * Crear skill
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con el skill.
 * @param {Object} req.body - Datos del skill
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const new_skill = async (req, res)=> {
    req = matchedData(req)
    const skills = await Skills.create(req)
    res.status(201).send(skills)
}

/**
 * Editar skill
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con el skill.
 * @param {String} req.params.id - Id del skill
 * @param {Object} req.body - Datos del skill
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 */
const edit_skill = async (req, res)=> {
    let id = req.params.id
    req = matchedData(req)
    const skill = await Skills.update({asignature: req.asignature, description: req.description},{where: {id: id}})
    res.status(200).send(skill);
}

/**
 * Eliminar skill
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express con el skill.
 * @param {String} req.params.id - Id del skill
 */
const delete_skill = async (req, res)=> {
    await Skills.destroy({where: {id: req.params.id}})
    res.status(204).send();
} 

module.exports = { listar, new_skill, edit_skill, delete_skill }