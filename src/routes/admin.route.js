const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.controller')
const authMiddleware = require('../middlewares/authMiddleware')
const authorizeMiddleware = require('../middlewares/authorizeMiddleware')

router.post('/register', authMiddleware, authorizeMiddleware(['super admin']), adminController.createAdmin)
router.post('/login', adminController.adminLogin)
router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), adminController.getAdmins)
// router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), adminController.getAdminById)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), adminController.updateAdmin)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), adminController.deleteAdmin)
router.get('/me', authMiddleware, adminController.getCurrentAdmin);

module.exports = router
