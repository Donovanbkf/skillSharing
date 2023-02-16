const express = require('express');
const { listar, new_response, edit_response, delete_response } = require('../controller/responses')
const router = express.Router()
const checkAuth = require('../middleware/auth')
const { validateResponseCreate, validateResponseEdit, validateResponseDelete } = require('../validators/responses')


router.get('/list', checkAuth(), listar)

router.post('/new-response', checkAuth(), validateResponseCreate,new_response)

router.post('/edit-response/:id', checkAuth(), validateResponseEdit, edit_response)

router.post('/delete-response/:id', checkAuth(), validateResponseDelete, delete_response)

module.exports = router