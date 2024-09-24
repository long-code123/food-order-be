import express from 'express'
import paymentController from '@src/controllers/api/customers/payment.controller'

const router = express.Router()

router.get('/:id', paymentController.getPaymentById)
router.post('/', paymentController.createPayment)

export default router
