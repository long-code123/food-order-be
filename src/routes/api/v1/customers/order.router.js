import express from 'express'

import categoryController from '@src/controllers/api/customers/category.controller'
const router = express.Router()

router.get('/', categoryController.getCategories)
router.get('/:id', categoryController.getCategoryById)

export default router
