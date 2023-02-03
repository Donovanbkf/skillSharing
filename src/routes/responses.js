const express = require('express');
const Responses = require('../models/response');
// const Requests = require('../models/requests');
// const Users = require('../models/users');
// const Skills = require('../models/skills')
// const Users = require('../models/users')
// const Responses = require('../models/response')
// const Collaborations = require('../models/collaboration')
const router = express.Router()
// const Users = require('../models/users')

router.get('/list', async (req, res)=> {
    const responses = await Responses.findAll({raw:true})
    console.log(responses)
    res.render('responses/all-responses', {responses});
})

router.get('/new-response', (req, res)=> {
    res.render('responses/new-response');
})

router.post('/new-response', async (req, res)=> {
    console.log(req.body);
    await Responses.create(req.body)
    res.send('lola');
})

router.get('/edit-response/:id', async (req, res)=> {
    const response = await Responses.findOne({raw:true, where: {id: req.params.id}})
    res.render('responses/edit-response', {response: response});
})

router.post('/edit-response/:id', async (req, res)=> {
    console.log(req.params);
    console.log(req.body);
    const description = req.body.description
    await Responses.update({description: description},{where: {id: req.params.id}})
    res.send('lola');
})



module.exports = router