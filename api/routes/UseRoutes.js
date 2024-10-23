const express = require('express')
const router = express.Router()
const {create, isUser, getUser} = require('../controllers/UserController')

router.post('/create', create)

module.exports = router