import express from 'express'
import AppConstants from '@src/common/constants'
import shipperController from '@src/controllers/sites/shipper.controller'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'
import reviewshipperController from '@src/controllers/sites/reviewshipper.controller'
import orderController from '@src/controllers/sites/order.controller'

const router = express.Router()
router.get('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), shipperController.getShippers)
router.get('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), shipperController.getShipperById)
router.post('/', shipperController.createShipper)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), shipperController.updateShipper)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), shipperController.deleteShipper)
router.get('/:id/review', reviewshipperController.getReviewsByShipper)
router.get('/:id/orders', orderController.getOrderByShipper)

export default router
