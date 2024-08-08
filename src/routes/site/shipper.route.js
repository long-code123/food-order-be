import express from 'express'

import shipperController from '@src/controllers/sites/shipper.controller'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'
import reviewshipperController from '@src/controllers/sites/reviewshipper.controller'
import orderController from '@src/controllers/sites/order.controller'

const router = express.Router()
router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), shipperController.getShippers)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), shipperController.getShipperById)
router.post('/', shipperController.createShipper)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), shipperController.updateShipper)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), shipperController.deleteShipper)
router.get('/:id/review', reviewshipperController.getReviewsByShipper)
router.get('/:id/orders', orderController.getOrderByShipper)

export default router
