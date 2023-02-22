/**
 * Controlador para la entidad de usuarios.
 * @module UserController
 */
const Users = require("../models/users");
const jwt = require('jsonwebtoken')
const {encrypt, compare} = require('../helpers/handleBcrypt')
const { matchedData } = require("express-validator");

const secretKey = process.env.JWT_key


/**
 * Crea un nuevo usuario 
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud con los datos del nuevo usuario.
 * @param {string} req.body.name - nombre del usuario
 * @param {string} req.body.username - Username del usuario
 * @param {string} req.body.fullname - fullname del usuario
 * @param {string} req.body.password - Contraseña del usuario
 * @param {string} req.body.role - role del usuario
 * @param {Object} res - Objeto de respuesta de Express con el user creado.
 */
const signin = async (req, res)=> {
    req = matchedData(req);
    req.password = await encrypt(req.password)
    const user = await Users.create(req)
    res.status(201).send({user});
}

/**
 * Logear un usuario
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud con los datos del nuevo usuario.
 * @param {string} req.body.username - Username del usuario
 * @param {string} req.body.password - Contraseña del usuario
 * @param {Object} res - Objeto de respuesta de Express con el token creado con JWT.
 */
const login = async (req, res)=> {
    let user = req.user
    const id = user.id;
    const rol = user.role;
    const saldo = user.saldo;
    const token = jwt.sign({ id, rol, saldo }, secretKey);
    return res.status(200).send(token)
}

/**
 * Desloguear un usuario
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
const logout = (req, res)=> {
    res.status(200).send('Te has ido');
}

module.exports = { signin, login, logout };