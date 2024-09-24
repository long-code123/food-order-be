import express from 'express'
import foodController from '@src/controllers/sites/food.controller'
import cacheMiddleware from '@src/middlewares/redis.middleware'

const router = express.Router()

router.get('/', foodController.getFoods)
router.get('/:id', foodController.getFoodById)

export default router
