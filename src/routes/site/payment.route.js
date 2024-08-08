import express from 'express'
import paymentController from '@src/controllers/sites/payment.controller'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'

const router = express.Router()

router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), paymentController.getPayments)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), paymentController.getPaymentById)
router.post('/', paymentController.createPayment)
router.put('/:id', paymentController.updatePayment)
router.delete('/:id', paymentController.deletePayment)

export default router
