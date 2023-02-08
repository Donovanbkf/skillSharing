const express = require('express');
const { matchedData } = require("express-validator");
const Skills = require('../models/skills');
const checkAuth = require('../middleware/auth')
const router = express.Router()
const  {validateSkillCreate, validateSkillEdit} = require('../validators/skills')

router.get('/list', checkAuth(), async (req, res)=> {
    const skills = await Skills.findAll({raw:true})
    res.send(skills)
    // res.render('skills/all-skills', {skills});
})

router.get('/new-skill', checkAuth("admin") ,(req, res)=> {
    res.render('skills/new-skill');
})

router.post('/new-skill', checkAuth("admin"), validateSkillCreate, async (req, res)=> {
    // console.log(req.body);
    req = matchedData(req)
    // console.log(req)
    await Skills.create(req)
    res.redirect('/skills/list');
})

router.get('/edit-skill/:id', checkAuth("admin"), async (req, res)=> {
    console.log(req.params);
    const skill = await Skills.findOne({raw:true, where: {id: req.params.id}})
    res.render('skills/edit-skill', {skill});
})

router.post('/edit-skill/:id', checkAuth("admin"), validateSkillEdit, async (req, res)=> {
    let id = req.params.id
    req = matchedData(req)
    const skill = await Skills.update({asignature: req.asignature},{where: {id: id}})
    res.send(skill);
})

router.post('/delete-skill/:id', checkAuth("admin"), async (req, res)=> {
    // console.log(req.params);
    const skill = await Skills.destroy({where: {id: req.params.id}})
    // console.log('deleted  deekiedjijdiewj ', skill);
    res.send(skill);
})


module.exports = router