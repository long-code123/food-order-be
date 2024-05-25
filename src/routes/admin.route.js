const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.controller')
const adminMiddleware = require('../middlewares/adminMiddleware')

router.post('/register', adminController.createAdmin)
router.post('/login', adminController.adminLogin)
router.get('/dashboard', adminMiddleware, adminController.dashboard)

module.exports = router
