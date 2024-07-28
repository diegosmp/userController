import express from 'express'
import UserController from '../controllers/UserController'
import authUser from '../helpers/authUser'

const router = express.Router()

router.post('/signup', UserController.signupUser)
router.post('/signin', UserController.signinUser)
router.get('/checkeduser', authUser, UserController.checkedUserToken)

export default router
