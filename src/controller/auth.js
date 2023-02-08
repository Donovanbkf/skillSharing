const Users = require("../models/users");
const jwt = require('jsonwebtoken')
const {encrypt, compare} = require('../helpers/handleBcrypt')
const { matchedData } = require("express-validator");

const secretKey = process.env.JWT_key

const get_signin = (req, res)=> {
    res.render('auth/signin');
}

const signin = async (req, res)=> {
    req = matchedData(req);
    req.password = await encrypt(req.password)
    const user = await Users.create(req)
    res.send({user});
}

const get_login = (req, res)=> {
    res.render('auth/login');
}

const login = async (req, res)=> {
    let user = req.user
    if (user == null) {
        res.render('auth/signin');
    }else{
        const compara = await compare(req.body.password, user.password);
        if (!compara){
            return res.render('auth/login', {user})
        }else{
            const id = user.id;
            const rol = user.role;
            const token = jwt.sign({ id, rol }, secretKey);
            return res.send(token)
        }
    }
}

const logout = (req, res)=> {
    // console.log(req.body)
    res.send('Welcome about 2');
}

module.exports = { get_signin, signin, get_login, login, logout };