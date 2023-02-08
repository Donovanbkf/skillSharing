const Requests = require('../models/requests');
const { matchedData } = require("express-validator");

const listar =  async (req, res)=> {
    const requests = await Requests.findAll({raw:true, where:{ user_id: req.user.id }})
    // res.render('requests/all-requests', {requests});
    res.send(requests)
}

const get_new_request = async (req, res)=> {
    res.render('requests/new-request');
}

const new_request = async (req, res)=> {
    user = req.user
    req = matchedData(req)
    req.user_id = user.id
    await Requests.create(req)
    res.redirect('/requests/list');
}

const get_edit_request = async (req, res)=> {
    const request = await Requests.findOne({raw:true, where: {id: req.params.id}})
    res.render('/requests/edit-request',{request});
}

const edit_request = async (req, res)=> {
    user = req.user
    req = matchedData(req)
    const request = await Requests.update({description: req.description, skill_id: req.id, user_id: user.id},{where: {id: id}})
    res.send(request);
}

module.exports = { listar, get_new_request, new_request, get_edit_request, edit_request }