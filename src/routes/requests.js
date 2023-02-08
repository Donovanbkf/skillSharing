const express = require('express');
const checkAuth = require('../middleware/auth')
const {listar, get_new_request, new_request, get_edit_request, edit_request} = require('../controller/requests')
const { validateRequestCreate, validateRequestEdit} = require('../validators/requests')

const router = express.Router()

router.get('/list', checkAuth(), listar)

router.get('/new-request', checkAuth(), get_new_request)

router.post('/new-request', checkAuth(), validateRequestCreate, new_request)

router.get('/edit-request/:id', checkAuth(), get_edit_request)

router.post('/edit-request/:id', checkAuth(), validateRequestEdit, edit_request)


module.exports = router