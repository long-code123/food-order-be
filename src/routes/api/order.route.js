const express = require('express')

const router = express.Router()
const orderController = require('../../controllers/order.controller')

router.get('/', orderController.getOrders)
router.get('/:id', orderController.getOrderById)
router.post('/', orderController.createOrder)
router.put('/:id', orderController.updateOrder)
router.delete('/:id', orderController.deleteOrder)

module.exports = router
