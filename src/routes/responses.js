const express = require('express');
const {listar, get_new_response, new_response, get_edit_response, edit_response} = require('../controller/responses')
const router = express.Router()
const checkAuth = require('../middleware/auth')
const { validateResponseCreate, validateResponseEdit } = require('../validators/responses')

router.get('/list', checkAuth(), listar)

router.get('/new-response', checkAuth(), get_new_response)

router.post('/new-response', checkAuth(), validateResponseCreate,new_response)

router.get('/edit-response/:id', checkAuth(), get_edit_response)

router.post('/edit-response/:id', checkAuth(), validateResponseEdit, edit_response)



module.exports = router