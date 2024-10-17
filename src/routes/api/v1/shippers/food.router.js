import express from 'express'
import foodController from '@src/controllers/api/shippers/food.controller'

const router = express.Router()

router.get('/', foodController.getFoods)
router.get('/:id', foodController.getFoodById)

export default router
