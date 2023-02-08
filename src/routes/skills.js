const express = require('express');

const checkAuth = require('../middleware/auth')
const router = express.Router()
const  {validateSkillCreate, validateSkillEdit} = require('../validators/skills');
const { listar, get_new_skill, new_skill, get_edit_skill, edit_skill, delete_skill} = require('../controller/skills');

router.get('/list', checkAuth(), listar)

router.get('/new-skill', checkAuth("admin") , get_new_skill)

router.post('/new-skill', checkAuth("admin"), validateSkillCreate, new_skill)

router.get('/edit-skill/:id', checkAuth("admin"), get_edit_skill)

router.post('/edit-skill/:id', checkAuth("admin"), validateSkillEdit, edit_skill)

router.post('/delete-skill/:id', checkAuth("admin"), delete_skill)


module.exports = router