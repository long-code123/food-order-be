import express from 'express'
import orderController from '@src/controllers/api/shippers/order.controller'

const router = express.Router()

router.get('/', orderController.getOrdersForShipper)
router.get('/:id', orderController.getOrderById)
router.get('/:id/total', orderController.getOrdersForShipper)


export default router
