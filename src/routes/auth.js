const express = require('express');
const router = express.Router()
const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const {encrypt, compare} = require('../helpers/handleBcrypt')

const secretKey = process.env.JWT_key

router.get('/signin', (req, res)=> {
    // var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    // console.log(req.connection.remoteAddress);
    // console.log(req)
    res.render('auth/signin');
})

router.post('/signin', async (req, res)=> {
    console.log(req.body)
    // console.log(typeof JSON.stringify(req.body));
    // console.log(JSON.stringify(req.body));
    // console.log(typeof JSON.parse(JSON.stringify(req.body)));
    req.body.password = await encrypt(req.body.password)
    const user = await Users.create(req.body)
    // const users = await Users.findAll({raw: true})
    // console.log(users)
    res.send({user});
})

router.get('/login', (req, res)=> {
    res.render('auth/login');
})

router.post('/login', async (req, res)=> {
    // console.log(req.params);
    const user = await Users.findOne({raw: true, where: {username: req.body.username}});
    console.log(user)
    if (user == null) {
        // console.log('no esta')
        res.render('auth/signin');
    }else{
        console.log(user.id);
        const compara = await compare(req.body.password, user.password);
        console.log(req.body.password);
        console.log(user.password);
        if (!compara){
            console.log(compara)
            return res.render('auth/login', {user})
        }else{
            const id = user.id;
            const rol = user.role;
            const token = jwt.sign({ id, rol}, secretKey);
            console.log(token);
            // res.json(token);
            // return res.render('skills/all-skills', { token });
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