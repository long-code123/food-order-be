import express from 'express'
import foodController from '@src/controllers/sites/food.controller'
import cacheMiddleware from '@src/middlewares/redis.middleware'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'

const router = express.Router()

router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), foodController.getFoods)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), foodController.getFoodById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), foodController.createFood)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), foodController.updateFood)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), foodController.deleteFood)

export default router
