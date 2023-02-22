/**
 * Rutas para la entidad de usuarios.
 * @module CollaborationsRoutes
 */
const express = require('express');
const checkAuth = require('../middleware/auth')
const { listar, new_collaboration_req, new_collaboration_res, edit_collaboration, finish_collaboration, delete_collaboration } = require('../controller/collaboration')
const { validateCollaborationCreate, validateCollaborationEdit, validateCollaborationDelete, validateCollaborationFinish } = require('../validators/collaborations')

const router = express.Router()

/**
 * @function GET collaboration/list
 * @summary List collaboration
 * @desc Listar collaborations de la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto con los datos de las collaborations
 * @returns {Error}  401 - Error de autenticación: requiere validación
 * @returns {Error}  500 - Error interno del servidor
 */
router.get('/list', checkAuth(), listar)

/**
 * @function POST collaboration/new-collaboration_req/:id
 * @summary Collaboration
 * @desc Crearse una collaboracion a partir de la request
 * @access Public
 * @group Collab - Operaciones de collaboracion
 * @param {string} req.params.id - El ID del requets que se acepta
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto con los datos del usuario y token de autenticación
 * @returns {Error}  400 - No puedes hacer collaboration contigo mismo
 * @returns {Error}  401 - Error de autenticación: requiere authentificación
 * @returns {Error}  404 - Request no existente
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/new-collaboration_req/:id', checkAuth(), validateCollaborationCreate, new_collaboration_req)

/**
 * @function POST collaboration/new-collaboration_req/:id
 * @summary Collaboration
 * @desc Crearse una collaboracion a partir de la request
 * @access Public
 * @group Collab - Operaciones de collaboracion
 * @param {string} req.params.id - El ID del response que se acepta
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto con los datos de la collaboration
 * @returns {Error}  400 - No puedes hacer collaboration contigo mismo
 * @returns {Error}  401 - Error de autenticación: requiere authentificación
 * @returns {Error}  404 - Request no existente
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/new-collaboration_res/:id', checkAuth(), validateCollaborationCreate, new_collaboration_res)

/**
 * @function POST collaboration/edit-collaboration/:id
 * @summary Editar collaboration
 * @desc Crearse una collaboracion a partir del response
 * @access Public
 * @group Collab - Operaciones de collaboracion
 * @param {string} req.params.id - El ID del requets que se acepta
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto con los datos de la collaboration
 * @returns {Error}  400 - No puedes hacer collaboration contigo mismo
 * @returns {Error}  401 - Error de autenticación: requiere authentificación
 * @returns {Error}  404 - Request no existente
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/edit-collaboration/:id', checkAuth(), validateCollaborationEdit, edit_collaboration)

/**
 * @function POST collaboration/finish-collaboration/:id
 * @summary Finalizar collaboration
 * @desc Crearse una collaboracion a partir de la request
 * @access Public
 * @group Collab - Operaciones de collaboracion
 * @param {string} req.params.id - El ID del requets que se acepta
 * @param {string} req.body.description - descripción de la collab
 * @param {int} req.body.saldo - horas de la collab
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto vacío
 * @returns {Error}  400 - No puedes hacer collaboration contigo mismo
 * @returns {Error}  401 - Error de autenticación: requiere authentificación
 * @returns {Error}  404 - Request no existente
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/finish-collaboration/:id', checkAuth(), validateCollaborationFinish, finish_collaboration)

/**
 * @function POST collaboration/delete-collaboration/:id
 * @summary Collaboration
 * @desc Crearse una collaboracion a partir de la request
 * @access Public
 * @group Collab - Operaciones de collaboracion
 * @param {string} req.params.id - El ID del requets que se acepta
 * @param {Object} req.user - Objeto de usuario con id, rol y saldo
 * @returns {object} 200 - Objeto vacio
 * @returns {Error}  400 - No puedes hacer collaboration contigo mismo
 * @returns {Error}  401 - Error de autenticación: requiere authentificación
 * @returns {Error}  404 - Request no existente
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/delete-collaboration/:id', checkAuth(), validateCollaborationDelete, delete_collaboration)


module.exports = router