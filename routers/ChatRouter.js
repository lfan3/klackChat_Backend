var express = require('express')
var router = express.Router()
var ChatController = require('../api/controllers/ChatController')

router.get('/', ChatController.valideUser)


module.exports = router
