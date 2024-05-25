const express = require('express')
const router = express.Router()
const voucherController = require('../controllers/voucher.controller')
const authorizeMiddleware = require('../middlewares/authorizeMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), voucherController.getVouchers)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), voucherController.getVoucherById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), voucherController.createVoucher)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), voucherController.updateVoucher)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), voucherController.deleteVoucher)

module.exports = router
