import express from 'express'
import orderController from '@src/controllers/sites/order.controller'

const router = express.Router()

router.get('/', orderController.getOrders)
router.get('/:id', orderController.getOrderById)
router.post('/', orderController.createOrder)
router.put('/:id/status', orderController.updateStatusOrder)
router.delete('/:id', orderController.deleteOrder)
router.post('/orders', orderController.createOrderWithItems)

export default router
