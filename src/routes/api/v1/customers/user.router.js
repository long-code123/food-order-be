import express from 'express'
import userController from '@src/controllers/api/customers/user.controller'
import authMiddleware from '@src/middlewares/auth.middleware'
import orderController from '@src/controllers/api/customers/order.controller'

const router = express.Router()

router.post('/', userController.createUser)
router.put('/:id/user', userController.updateUserByUser)
router.get('/:id/orders', orderController.getOrderByUser)

export default router
