import express from 'express'
import voucherController from '@src/controllers/sites/voucher.controller'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'
import AppConstants from '@src/common/constants'

const router = express.Router()

router.get('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), voucherController.getVouchers)
router.get('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), voucherController.getVoucherById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), voucherController.createVoucher)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), voucherController.updateVoucher)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), voucherController.deleteVoucher)

export default router
