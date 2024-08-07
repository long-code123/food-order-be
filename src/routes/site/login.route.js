const express = require('express')

const router = express.Router()
const loginController = require('../controllers/login.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

router.post('/', loginController.login)
router.get('/me', authMiddleware, loginController.getCurrentUser)

module.exports = router
