import express from 'express'
import authUser from '../helpers/authUser'
import PostController from '../controllers/PostController'

const router = express.Router()

router.post('/create', PostController.createPost)

export default router
