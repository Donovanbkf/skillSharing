const express = require('express');
const checkAuth = require('../middleware/auth')
const {listar, new_request, edit_request, delete_request} = require('../controller/requests')
const { validateRequestCreate, validateRequestEdit, validateRequestDelete} = require('../validators/requests')
const router = express.Router()

/**
 * @function GET requests/list
 * @summary List request
 * @desc Listar requests de la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto con los datos de los requests
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  500 - Error interno del servidor
 */
router.get('/list', checkAuth(), listar)

/**
 * @function POST requests/new-request
 * @summary New request
 * @desc Crearse una request en la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {object} req.body - Objeto con las credenciales del usuario
 * @param {string} req.body.description - descripcion del request
 * @param {id} req.body.skill_id - id de la skill
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto con los datos del request
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  404 - No existe el skill_id
 * @returns {Error}  409 - No puedes tener dos requests
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/new-request', checkAuth(), validateRequestCreate, new_request)

/**
 * @function POST requests/edit-request
 * @summary Edit request
 * @desc Editar una request en la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {object} req.body - Objeto con las credenciales del usuario
 * @param {string} req.body.description - descripcion del request
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto con los datos del request
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/edit-request/:id', checkAuth(), validateRequestEdit, edit_request)

/**
 * @function POST requests/delete-request
 * @summary eliminar request
 * @desc Eliminar una request en la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto vacío
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/delete-request/:id', checkAuth(), validateRequestDelete, delete_request)

module.exports = router