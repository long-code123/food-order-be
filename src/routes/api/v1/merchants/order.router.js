import express from 'express'

import orderController from '@src/controllers/api/merchants/order.controller'
const router = express.Router()

router.get('/:id', orderController.getOrderById)
router.put('/:id', orderController.updateStatusOrder)

export default router
