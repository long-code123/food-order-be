const express = require('express')

const router = express.Router()
const orderController = require('../controllers/order.controller')

router.get('/', orderController.getOrders)
router.get('/:id', orderController.getOrderById)
router.post('/', orderController.createOrder)
router.put('/:id/status', orderController.updateStatusOrder)
router.delete('/:id', orderController.deleteOrder)
router.post('/orders', orderController.createOrderWithItems)

module.exports = router
