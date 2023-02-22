const express = require('express');
const { listar, new_response, edit_response, delete_response } = require('../controller/responses')
const router = express.Router()
const checkAuth = require('../middleware/auth')
const { validateResponseCreate, validateResponseEdit, validateResponseDelete } = require('../validators/responses')

/**
 * @function GET responses/list
 * @summary List response
 * @desc Listar responses de la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto con los datos de las responses
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  500 - Error interno del servidor
 */
router.get('/list', checkAuth(), listar)

/**
 * @function POST responses/new-response
 * @summary New response
 * @desc Crearse una response en la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {object} req.body - Objeto con las credenciales del usuario
 * @param {string} req.body.description - descripcion del response
 * @param {id} req.body.skill_id - id de la skill
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto con los datos de la response
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  404 - No existe el skill_id
 * @returns {Error}  409 - No puedes tener dos responses
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/new-response', checkAuth(), validateResponseCreate,new_response)

/**
 * @function POST responses/edit-response
 * @summary Edit response
 * @desc Editar una response en la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {object} req.body - Objeto con las credenciales del usuario
 * @param {string} req.body.description - descripcion del response
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - OObjeto con los datos de la response
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/edit-response/:id', checkAuth(), validateResponseEdit, edit_response)

/**
 * @function POST responses/delete-response
 * @summary eliminar response
 * @desc Eliminar una response en la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto vacío
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/delete-response/:id', checkAuth(), validateResponseDelete, delete_response)

module.exports = router