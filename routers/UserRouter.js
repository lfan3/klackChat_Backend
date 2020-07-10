var express = require('express')
var router = express.Router()
var UserController = require('../api/controllers/UserController');

/** GET users listing */
router.post('/register', UserController.userRegister)
router.post('/authentication', UserController.authentication)

module.exports = router