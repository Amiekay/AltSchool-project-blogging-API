const express = require('express')
const router = express.Router()
const controller = require('../controllers/blogController')
const middleware= require('../middlewares/authMiddleware')



router.get('/', controller.getAllPublishedPosts)
router.get('/:postId', controller.getOnePost)
router.get('/myPosts/:userId', middleware.bearerTokenAuth, controller.getMyPosts)
router.post('/', middleware.bearerTokenAuth, controller.createPost)
router.put('/:postId', middleware.bearerTokenAuth, controller.updateAPostToPublished)
router.patch('/:postId', middleware.bearerTokenAuth, controller.editApost)
router.delete('/:postId',middleware.bearerTokenAuth, controller.deleteOnePost)




module.exports = router