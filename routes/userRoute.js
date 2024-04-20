const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')
const globalmiddleware = require('../middlewares/globalMiddleware')



// Create user
router.post('/signup', globalmiddleware.checkBody, controller.createUser)

// Signin user
router.post('/login', globalmiddleware.checkBody, controller.login)



module.exports = router