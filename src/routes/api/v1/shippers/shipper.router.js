import express from 'express'
import shipperController from '@src/controllers/api/shippers/shipper.controller'
import reviewshipperController from '@src/controllers/api/shippers/reviewshipper.controller'
import orderController from '@src/controllers/api/shippers/order.controller'

const router = express.Router()
router.post('/', shipperController.createShipper)
router.put('/:id',  shipperController.updateShipper)
router.delete('/:id',  shipperController.deleteShipper)
router.get('/:id/reviews', reviewshipperController.getReviewsByShipper)
router.get('/:id/orders', orderController.getOrderByShipper)
router.post('/login', shipperController.loginShipper)
router.get('/:id/me', shipperController.getCurrentShipper)

export default router
