import express from 'express'
import orderController from '@src/controllers/sites/order.controller'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'
import AppConstants from '@src/common/constants'

const router = express.Router()

router.get('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), orderController.getOrders)
router.get('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), orderController.getOrderById)
router.post('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), orderController.createOrder)
router.put('/:id/status', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), orderController.updateStatusOrder)
router.delete('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), orderController.deleteOrder)
router.post('/orders', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), orderController.createOrderWithItems)
router.get('/:id/total', orderController.calculateOrderTotal)

export default router
