const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.controller')
const authorizeMiddleware = require('../middlewares/authorizeMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')


router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), paymentController.getPayments)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), paymentController.getPaymentById)
router.post('/', paymentController.createPayment)
router.put('/:id', paymentController.updatePayment)
router.delete('/:id', paymentController.deletePayment)

module.exports = router
