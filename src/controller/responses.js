const { matchedData } = require("express-validator");
const Responses = require("../models/response");


const listar = async (req, res)=> {
    const responses = await Responses.findAll({raw:true, where:{user_id : req.user.id}})
    // res.render('responses/all-responses', {responses});
    res.send(responses)
}

const get_new_response = (req, res)=> {
    res.render('responses/new-response');
}

const new_response = async (req, res)=> {
    user = req.user
    req = matchedData(req)
    req.user_id = user.id
    await Responses.create(req)
    res.redirect('/responses/list');
}

const get_edit_response = async (req, res)=> {
    const response = await Responses.findOne({raw:true, where: {id: req.params.id}})
    res.render('responses/edit-response', {response: response});
}

const edit_response = async (req, res)=> {
    let id = req.params.id
    user = req.user
    req = matchedData(req)
    await Responses.update({description: req.description, skill_id: req.skill_id, user_id: user.id},{where: {id: id}})
    res.send('lola');
}

module.exports = {listar, get_new_response, new_response, get_edit_response, edit_response}