import express from 'express'
import foodController from '@src/controllers/api/merchants/food.Controller'
import cacheMiddleware from '@src/middlewares/redis.middleware'

const router = express.Router()

router.get('/:id', foodController.getFoodById)
router.post('/', foodController.createFood)
router.put('/:id',  foodController.updateFood)
router.delete('/:id', foodController.deleteFood)

export default router
