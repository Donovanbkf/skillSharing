const express = require('express');
const checkAuth = require('../middleware/auth')
const { listar, new_collaboration_req, new_collaboration_res, edit_collaboration, finish_collaboration, delete_collaboration } = require('../controller/collaboration')
const { validateCollaborationCreate, validateCollaborationEdit, validateCollaborationDelete, validateCollaborationFinish } = require('../validators/collaborations')

const router = express.Router()

router.get('/list', checkAuth(), listar)

router.post('/new-collaboration_req/:id', checkAuth(), validateCollaborationCreate, new_collaboration_req)

router.post('/new-collaboration_res/:id', checkAuth(), validateCollaborationCreate, new_collaboration_res)

router.post('/edit-collaboration/:id', checkAuth(), validateCollaborationEdit, edit_collaboration)

router.post('/finish-collaboration/:id', checkAuth(), validateCollaborationFinish, finish_collaboration)

router.post('/delete-collaboration/:id', checkAuth(), validateCollaborationDelete, delete_collaboration)


module.exports = router