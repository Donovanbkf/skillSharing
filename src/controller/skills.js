const Skills = require("../models/skills")
const { matchedData } = require("express-validator");


const listar = async (req, res)=> {
    const skills = await Skills.findAll({raw:true})
    if (responses.length > 0) {
        return res.status(200).send(skills)
    }
    res.status(204).send(skills)
}

const new_skill = async (req, res)=> {
    req = matchedData(req)
    const skills = await Skills.create(req)
    res.status(201).send(skills)
}

const edit_skill = async (req, res)=> {
    let id = req.params.id
    req = matchedData(req)
    const skill = await Skills.update({asignature: req.asignature, description: req.description},{where: {id: id}})
    res.status(200).send(skill);
}

const delete_skill = async (req, res)=> {
    const skill = await Skills.destroy({where: {id: req.params.id}})
    res.status(204).send(skill);
}

module.exports = { listar, get_new_skill, new_skill, get_edit_skill, edit_skill, delete_skill }