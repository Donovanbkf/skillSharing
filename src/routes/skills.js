const express = require('express');
const checkAuth = require('../middleware/auth')
const router = express.Router()
const  { validateSkillCreate, validateSkillEdit, validateSkillDelete } = require('../validators/skills');
const { listar, new_skill, edit_skill, delete_skill} = require('../controller/skills');

/**
 * @function GET skills/list
 * @summary List skill
 * @desc Listar skills de la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto con los datos de los requests
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  500 - Error interno del servidor
 */
router.get('/list', checkAuth(), listar)

/**
 * @function POST Skills/new-skill
 * @summary New Skill
 * @desc Crearse una skill en la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {Object} req.body - Datos del skill
 * @param {string} req.body.asignature - nombre asignatura
 * @param {string} req.body.description - Descripción de la skill
 * @param {string} req.body.level - nivel de complejidad
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto con los datos del request
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  409 - No puedes tener dos requests
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/new-skill', checkAuth("admin"), validateSkillCreate, new_skill)

/**
 * @function POST Skills/edit-skill
 * @summary Edit skill
 * @desc Editar una skill en la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {String} req.params.id - Id del skill
 * @param {Object} req.body - Datos del skill
 * @param {string} req.body.asignature - nombre asignatura
 * @param {string} req.body.description - Descripción de la skill
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto con los datos del request
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/edit-skill/:id', checkAuth("admin"), validateSkillEdit, edit_skill)


/**
 * @function POST Skills/delete-skill
 * @summary  Delete skill
 * @desc Eliminar una skill en la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {object} req.params.id - id de la skill
 * @returns {object} 200 - Objeto con los datos del request
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/delete-skill/:id', checkAuth("admin"), validateSkillDelete, delete_skill)


module.exports = router