import express from 'express'
import voucherController from '@src/controllers/sites/voucher.controller'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'

const router = express.Router()

router.get('/', voucherController.getVouchers)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), voucherController.getVoucherById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), voucherController.createVoucher)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), voucherController.updateVoucher)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), voucherController.deleteVoucher)

export default router
