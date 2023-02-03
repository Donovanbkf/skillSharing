const express = require('express');
const Requests = require('../models/requests');
const Users = require('../models/users');
// const Skills = require('../models/skills')
// const Users = require('../models/users')
// const Responses = require('../models/response')
// const Collaborations = require('../models/collaboration')
const router = express.Router()
// const Users = require('../models/users')

router.get('/list', async (req, res)=> {
    const requests = await Requests.findAll({raw:true})
    console.log(requests)
    res.render('requests/all-requests', {requests});
})

router.get('/new-request', (req, res)=> {
    res.render('requests/new-request');
})

router.post('/new-request', async (req, res)=> {
    console.log(req.body);
    await Requests.create(req.body)
    res.send('lola');
})

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