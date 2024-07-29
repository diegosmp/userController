import express from 'express'
import authUser from '../helpers/authUser'
import PostController from '../controllers/PostController'

const router = express.Router()

router.post('/create', authUser, PostController.createPost)
router.get('/all', authUser, PostController.showAllPost)
router.patch('/edit/:postId', authUser, PostController.editPost)

export default router
