/**
 * Rutas para la entidad de usuarios.
 * @module UsersRoutes
 */
const express = require('express');
const router = express.Router()
const {validateUserCreate, validateUserLogin} = require('../validators/users') 
const { signin, login, logout } = require('../controller/auth')

/**
 * @function POST auth/signin
 * @summary Signin
 * @desc Crearse una cuenta en la aplicacióm
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {object} req.body - Objeto con las credenciales del usuario
 * @param {string} req.body.name - nombre del usuario
 * @param {string} req.body.username - Username del usuario
 * @param {string} req.body.fullname - fullname del usuario
 * @param {string} req.body.password - Contraseña del usuario
 * @param {string} req.body.role - role del usuario
 * @returns {object} 200 - Objeto con los datos del usuario y token de autenticación
 * @returns {Error}  401 - Error de autenticación: contraseña inválida
 * @returns {Error}  404 - Error de autenticación: usuario no encontrado
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/signin', validateUserCreate, signin)

/**
 * @function POST auth/login
 * @summary Loguear
 * @desc Loguearse en la aplicacion para poder utilizarla
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {object} req.body - Objeto con las credenciales del usuario
 * @param {string} req.body.username - Username del usuario
 * @param {string} req.body.password - Contraseña del usuario
 * @returns {object} 200 - Objeto con los datos del usuario y token de autenticación
 * @returns {Error}  401 - Error de autenticación: contraseña inválida
 * @returns {Error}  404 - Error de autenticación: usuario no encontrado
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/login', validateUserLogin, login)

/**
 * @function POST auth/logout
 * @summary Desloguerase
 * @desc Desloguearse de la aplicacion
 * @access Public
 * @group Auth - Operaciones de autenticación
 * @param {string} req.param.id - id del usuario
 * @returns {object} 200 - Objeto con los datos del usuario y token de autenticación
 * @returns {Error}  404 - Error de autenticación: usuario no encontrado
 * @returns {Error}  500 - Error interno del servidor
 */
router.post('/logout',logout)


module.exports = router