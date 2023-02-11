const Requests = require('../models/requests');
const Responses = require('../models/response');
const { matchedData } = require("express-validator");
const Collaborations = require('../models/collaboration');

const listar =  async (req, res)=> {
    const collaborations = await Collaborations.findAll({raw:true})
    res.send(collaborations)
}


const new_collaboration_req = async (req, res)=> {
    user = req.user
    let request_id = req.params.id
    req = matchedData(req)
    const request = await Requests.findOne({raw:true, where: {id: request_id}})
    req.user_id_req = request.user_id
    req.user_id_res = user.id
    console.log(req)
    const collaboration = await Collaborations.create(req)
    res.send(collaboration);
}

const new_collaboration_res = async (req, res)=> {
    user = req.user
    let response_id = req.params.id
    req = matchedData(req)
    const response = await Responses.findOne({raw:true, where: {id: response_id}})
    req.user_id_res = response.user_id
    req.user_id_req = user.id
    const collaboration = await Collaborations.create(req)
    res.send(collaboration);
}

const edit_collaboration = async (req, res)=> { 
    let id = req.params.id
    user = req.user
    req = matchedData(req)
    const collaboration = await Collaborations.update({description: req.description, skill_id: req.id, user_id: user.id},{where: {id: id}})
    res.send(collaboration);
}

module.exports = { listar, new_collaboration_req, new_collaboration_res, edit_collaboration }