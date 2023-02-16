const express = require('express');
const checkAuth = require('../middleware/auth')
const {listar, new_request, edit_request, delete_request} = require('../controller/requests')
const { validateRequestCreate, validateRequestEdit, validateRequestDelete} = require('../validators/requests')
const router = express.Router()


router.get('/list', checkAuth(), listar)

router.post('/new-request', checkAuth(), validateRequestCreate, new_request)

router.post('/edit-request/:id', checkAuth(), validateRequestEdit, edit_request)

router.post('/delete-request/:id', checkAuth(), validateRequestDelete, delete_request)

module.exports = router