const express = require('express')
const router = express.Router()
const shipperController = require('../controllers/shipper.controller')
const authorizeMiddleware = require('../middlewares/authorizeMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const reviewshipperController = require('../controllers/reviewshipper.controller')
const orderController = require('../controllers/order.controller')
const { route } = require('./category.route')

router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), shipperController.getShippers)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), shipperController.getShipperById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), shipperController.createShipper)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), shipperController.updateShipper)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), shipperController.deleteShipper)
router.get('/:id/review', reviewshipperController.getReviewsByShipper);
router.get('/:id/orders', orderController.getOrderByShipper)

module.exports = router
