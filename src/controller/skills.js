const Skills = require("../models/skills")
const { matchedData } = require("express-validator");

const listar = async (req, res)=> {
    const skills = await Skills.findAll({raw:true})
    res.send(skills)
    // res.render('skills/all-skills', {skills});
}

const get_new_skill = (req, res)=> {
    res.render('skills/new-skill');
}

const new_skill = async (req, res)=> {
    req = matchedData(req)
    await Skills.create(req)
    res.redirect('/skills/list');
}

const get_edit_skill = async (req, res)=> {
    const skill = await Skills.findOne({raw:true, where: {id: req.params.id}})
    res.render('skills/edit-skill', {skill});
}

const edit_skill = async (req, res)=> {
    let id = req.params.id
    req = matchedData(req)
    const skill = await Skills.update({asignature: req.asignature, description: req.description},{where: {id: id}})
    res.send(skill);
}

const delete_skill = async (req, res)=> {
    const skill = await Skills.destroy({where: {id: req.params.id}})
    res.send('skill');
}

module.exports = { listar, get_new_skill, new_skill, get_edit_skill, edit_skill, delete_skill }