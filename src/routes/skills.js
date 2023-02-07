const express = require('express');

const Skills = require('../models/skills');
const checkAuth = require('../middleware/auth')
const router = express.Router()


router.get('/list', async (req, res)=> {
    const skills = await Skills.findAll({raw:true})
    console.log(skills)
    res.render('skills/all-skills', {skills});
})

router.get('/new-skill', checkAuth ,(req, res)=> {
    res.render('skills/new-skill');
})

router.post('/new-skill', checkAuth ,async (req, res)=> {
    console.log(req.body);
    // if (req.user.role === 'user'){
    //     res.redirect('/skills/list');
    // }
    await Skills.create(req.body)
    res.redirect('/skills/list');
})

router.get('/edit-skill/:id', async (req, res)=> {
    console.log(req.params);
    const skill = await Skills.findOne({raw:true, where: {id: req.params.id}})
    res.render('skills/edit-skill', {skill});
})

router.post('/edit-skill/:id', async (req, res)=> {
    console.log(req.params);
    const asignatura = req.body.asignature
    const skill = await Skills.update({asignature: asignatura},{where: {id: req.params.id}})
    console.log(skill);
    res.redirect('/list');
})

router.post('/delete-skill/:id', async (req, res)=> {
    console.log(req.params);
    const skill = await Skills.destroy({where: {id: req.params.id}})
    console.log('deleted  deekiedjijdiewj ', skill);
    res.send('lolalolooo');
})


module.exports = router