import express from 'express'
import authMiddleware from '@src/middlewares/auth.middleware'

import categoryController from '@src/controllers/api/customers/category.controller'
const router = express.Router()

router.get('/', categoryController.getCategories)
router.get('/:id', categoryController.getCategoryById)

export default router
