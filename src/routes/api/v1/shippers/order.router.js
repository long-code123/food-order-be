import express from 'express'
import orderController from '@src/controllers/api/merchants/order.controller'

const router = express.Router()

router.get('/:id', orderController.getOrderById)

export default router
