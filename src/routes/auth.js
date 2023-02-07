const express = require('express');
const router = express.Router()
const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const {encrypt, compare} = require('../helpers/handleBcrypt')
const {validateUserCreate, validateUserLogin} = require('../validators/users') 
const { matchedData } = require("express-validator");

const secretKey = process.env.JWT_key

router.get('/signin', (req, res)=> {

    res.render('auth/signin');
})

router.post('/signin', validateUserCreate, async (req, res)=> {
    req = matchedData(req);
    req.password = await encrypt(req.password)
    const user = await Users.create(req)
    res.send({user});
})

router.get('/login', (req, res)=> {
    res.render('auth/login');
})

router.post('/login', validateUserLogin, async (req, res)=> {
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
            const token = jwt.sign({ id, rol}, secretKey);
            return res.send(token)
        }
    }
    
})


router.post('/logout/:id', (req, res)=> {
    const {id} = req.params
    console.log(id);
    console.log(req.body)
    res.send('Welcome about 2');
})


module.exports = router