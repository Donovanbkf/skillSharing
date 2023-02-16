const { matchedData } = require("express-validator");
const Responses = require("../models/response");


const listar = async (req, res)=> {
    const responses = await Responses.findAll({raw:true, where:{user_id : req.user.id}})
    if (responses.length > 0) {
        return res.status(200).send(responses)
    }
    res.status(204).send(responses)
}

const new_response = async (req, res)=> {
    user = req.user
    req = matchedData(req)
    req.user_id = user.id
    const response = await Responses.create(req)
    res.status(201).send(response)
}

const edit_response = async (req, res)=> {
    let id = req.params.id
    user = req.user
    req = matchedData(req)
    const response = await Responses.update({description: req.description, skill_id: req.skill_id, user_id: user.id},{where: {id: id}})
    res.status(200).send(response)
}

const delete_response = async (req, res)=> { 
    await Responses.destroy({where: {id: req.params.id}})
    res.status(204).send();
}

module.exports = {listar, new_response, edit_response, delete_response}