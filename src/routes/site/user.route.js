import express from 'express'
import userController from '@src/controllers/sites/user.controller'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'
import orderController from '@src/controllers/sites/order.controller'

const router = express.Router()

router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), userController.getUsers)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), userController.getUserById)
router.post('/', userController.createUser)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), userController.updateUser)
router.put('/:id/user', userController.updateUserByUser)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), userController.deleteUser)
router.get('/:id/orders', orderController.getOrderByUser)

export default router
