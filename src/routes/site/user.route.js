const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const authorizeMiddleware = require('../../middlewares/authorizeMiddleware')
const authMiddleware = require('../../middlewares/authMiddleware')
const orderController = require('../controllers/order.controller')

router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), userController.getUsers)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), userController.getUserById)
router.post('/', userController.createUser)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), userController.updateUser)
router.put('/:id/user', userController.updateUserByUser)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), userController.deleteUser)
router.get('/:id/orders', orderController.getOrderByUser)

module.exports = router
