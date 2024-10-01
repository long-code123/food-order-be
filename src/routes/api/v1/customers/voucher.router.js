import express from 'express'
import voucherController from '@src/controllers/api/customers/voucher.controller'

const router = express.Router()

router.get('/', voucherController.getVouchers)
router.get('/:id', voucherController.getVoucherById)
router.delete('/:id', voucherController.deleteVoucher)

export default router
