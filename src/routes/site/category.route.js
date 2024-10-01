import express from 'express'
import categoryController from '@src/controllers/sites/category.controller'
import foodController from '@src/controllers/sites/food.controller'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'
import AppConstants from '@src/common/constants'

const router = express.Router()

router.get('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), categoryController.getCategories)
router.get('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), categoryController.getCategoryById)
router.post('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), categoryController.createCategory)
router.put('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), categoryController.updateCategory)
router.delete('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), categoryController.deleteCategory)
router.get('/:id/foods', foodController.getFoodsByCategory)

export default router
