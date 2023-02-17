const Requests = require('../models/requests');
const { matchedData } = require("express-validator");

const listar =  async (req, res)=> {
    const requests = await Requests.findAll({raw:true})
    if (requests.length > 0) {
        return res.status(200).send(requests)
    }
    res.status(204).send(requests)
}

const new_request = async (req, res)=> {
    let user = req.user
    req = matchedData(req)
    req.user_id = user.id
    const request = await Requests.create(req)
    res.status(201).send(request);
}

const edit_request = async (req, res)=> {
    let id = req.params.id
    req = matchedData(req)
    const request = await Requests.update({description: req.description, skill_id: req.skill_id},{where: {id: id}})
    res.status(200).send(request);
}

const delete_request = async (req, res)=> { 
    await Requests.destroy({where: {id: req.params.id}})
    res.status(204).send();
}

module.exports = { listar, new_request, edit_request, delete_request }