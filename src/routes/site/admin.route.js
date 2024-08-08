import express from 'express'
import adminController from '@src/controllers/sites/admin.controller'
import authMiddleware from '@src/middlewares/auth.middleware'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'

const router = express.Router()

router.post('/register', authMiddleware, authorizeMiddleware(['super admin']), adminController.createAdmin)
router.post('/login', adminController.adminLogin)
router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), adminController.getAdmins)
// router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), adminController.getAdminById);
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), adminController.updateAdmin)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), adminController.deleteAdmin)
router.get('/me', authMiddleware, adminController.getCurrentAdmin)

export default router
