const Users = require("../models/users");
const jwt = require('jsonwebtoken')
const {encrypt, compare} = require('../helpers/handleBcrypt')
const { matchedData } = require("express-validator");

const secretKey = process.env.JWT_key


const signin = async (req, res)=> {
    req = matchedData(req);
    req.password = await encrypt(req.password)
    const user = await Users.create(req)
    res.status(201).send({user});
}

const login = async (req, res)=> {
    let user = req.user
    const id = user.id;
    const rol = user.role;
    const saldo = user.saldo;
    const token = jwt.sign({ id, rol, saldo }, secretKey);
    return res.status(200).send(token)
}

const logout = (req, res)=> {
    res.status(200).send('Te has ido');
}

module.exports = { signin, login, logout };