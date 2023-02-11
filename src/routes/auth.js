const express = require('express');
const router = express.Router()
const {validateUserCreate, validateUserLogin} = require('../validators/users') 
const { signin, login, logout } = require('../controller/auth')


router.post('/signin', validateUserCreate, signin)

router.post('/login', validateUserLogin, login)

router.post('/logout',logout)


module.exports = router