import express from 'express'
import orderController from '@src/controllers/api/merchants/order.controller'

const router = express.Router()

router.get('/:id', orderController.getOrderById)
router.put('/:id', orderController.updateStatusOrder)
router.put('/:id/accept', orderController.acceptOrder)
router.put('/:id/cancel', orderController.cancelOrder)
router.get('/:id/total', orderController.calculateOrderTotal)


export default router
