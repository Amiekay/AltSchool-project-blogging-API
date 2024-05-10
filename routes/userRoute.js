const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')
const validateUser = require('../middlewares/usersMiddleware')



// Create user
router.post('/signup', validateUser.ValidateUserCreationWithJoi, controller.createUser)

// Signin user
router.post('/login', validateUser.LoginValidation, controller.login)



module.exports = router