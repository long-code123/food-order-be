const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')
const authorizeMiddleware = require('../middlewares/authorizeMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), categoryController.getCategories)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), categoryController.getCategoryById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), categoryController.createCategory)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), categoryController.updateCategory)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), categoryController.deleteCategory)

module.exports = router
