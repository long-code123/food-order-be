const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const authorizeMiddleware = require('../middlewares/authorizeMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), userController.getUsers)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), userController.getUserById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), userController.createUser)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), userController.updateUser)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), userController.deleteUser)

module.exports = router
