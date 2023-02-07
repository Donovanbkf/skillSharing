const express = require('express');
const Requests = require('../models/requests');
const Users = require('../models/users');
const checkAuth = require('../middleware/auth')
const {listar, new_request} = require('../controller/requests')

const router = express.Router()

router.get('/list', listar)

router.get('/new-request', checkAuth ,(req, res)=> {
    res.render('requests/new-request');
})

router.post('/new-request', checkAuth , new_request)

router.post('/edit-request/:id', async (req, res)=> {
    console.log(req.params);
    // await Requests.create(req.body)
    res.send('lola');
})

router.get('/', async (req, res)=> {
    // console.log(req)
    console.log('gettt')
    // const user1 = await Users.findOne({where: {username: 'oscarin12'}})
    // .then(user1 => {
    //     // console.log("todo bien", users)
    //     console.log(user1.dataValues)
    // })
    // .catch(err => {
    //     console.log(err)
    // })

    // const users = await Users.findAll()
    // .then(users => {
    //     // console.log("todo bien", users)
    //     console.log(users[1].dataValues)
    // })
    // .catch(err => {

    //     console.log(err)
    // })
    // console.log(users)  undefined, tengo que trabajarlo en la promesa
    res.render('index');
})


module.exports = router