import express from 'express'
import loginController from '@src/controllers/api/customers/login.controller.js'
import authMiddleware from '@src/middlewares/auth.middleware'

const router = express.Router()

router.post('/', loginController.login)
router.get('/me', authMiddleware, loginController.getCurrentUser)

export default router
