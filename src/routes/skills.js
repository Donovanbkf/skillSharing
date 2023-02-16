const express = require('express');
const checkAuth = require('../middleware/auth')
const router = express.Router()
const  { validateSkillCreate, validateSkillEdit, validateSkillDelete } = require('../validators/skills');
const { listar, new_skill, edit_skill, delete_skill} = require('../controller/skills');


router.get('/list', checkAuth(), listar)

router.post('/new-skill', checkAuth("admin"), validateSkillCreate, new_skill)

router.post('/edit-skill/:id', checkAuth("admin"), validateSkillEdit, edit_skill)

router.post('/delete-skill/:id', checkAuth("admin"), validateSkillDelete, delete_skill)


module.exports = router