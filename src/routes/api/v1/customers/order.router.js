import express from 'express'
import orderController from '@src/controllers/api/customers/order.controller'

const router = express.Router()

router.get('/', orderController.getOrders)
router.get('/:id', orderController.getOrderById)
router.post('/', orderController.createOrder)
router.post('/orders', orderController.createOrderWithItems)


export default router
