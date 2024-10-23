const express = require('express')
const router = express.Router()
const {login, logout, loggedin, fetchReviews} = require('../controllers/AdminController')

router.post('/login', login)
router.get('/logout', logout)
router.get('/loggedin', loggedin)
router.post('/googlereviews', fetchReviews)
module.exports = router