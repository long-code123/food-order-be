import express from 'express'
import categoryController from '@src/controllers/api/customers/category.controller'
import foodController from '@src/controllers/api/customers/food.controller'

const router = express.Router()

router.get('/', categoryController.getCategories)
router.get('/:id', categoryController.getCategoryById)
router.get('/:id/foods', foodController.getFoodsByCategory)

export default router