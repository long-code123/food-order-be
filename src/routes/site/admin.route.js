import express from 'express'
import adminController from '@src/controllers/sites/admin.controller'
import authMiddleware from '@src/middlewares/auth.middleware'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'

import AppConstants from '@src/common/constants'
const router = express.Router()

router.post('/register', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), adminController.createAdmin)
router.post('/login', adminController.adminLogin)
router.get('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), adminController.getAdmins)
// router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), adminController.getAdminById);
router.put('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), adminController.updateAdmin)
router.delete('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), adminController.deleteAdmin)
router.get('/me', authMiddleware, adminController.getCurrentAdmin)

export default router
