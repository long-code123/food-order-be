import express from 'express'
import categoryController from '@src/controllers/sites/category.controller'
import foodController from '@src/controllers/sites/food.controller'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'

const router = express.Router()

router.get('/', categoryController.getCategories)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), categoryController.getCategoryById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), categoryController.createCategory)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), categoryController.updateCategory)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), categoryController.deleteCategory)
router.get('/:id/foods', foodController.getFoodsByCategory)

export default router
