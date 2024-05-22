const express = require('express')
const router = express.Router()
const shipperController = require('../controllers/shipper.controller')
const authorizeMiddleware = require('../middlewares/authorizeMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), shipperController.getShippers)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), shipperController.getShipperById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), shipperController.createShipper)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), shipperController.updateShipper)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), shipperController.deleteShipper)

module.exports = router
