const express = require('express');
const router = express.Router()
const {validateUserCreate, validateUserLogin} = require('../validators/users') 
const { get_signin, signin, get_login, login, logout } = require('../controller/auth')

router.get('/signin', get_signin)

router.post('/signin', validateUserCreate, signin)

router.get('/login', get_login)

router.post('/login', validateUserLogin, login)

router.post('/logout',logout)


module.exports = router