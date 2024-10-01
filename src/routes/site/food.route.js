import express from 'express'
import foodController from '@src/controllers/sites/food.controller'
import cacheMiddleware from '@src/middlewares/redis.middleware'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'
import AppConstants from '@src/common/constants'

const router = express.Router()

router.get('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), foodController.getFoods)
router.get('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), foodController.getFoodById)
router.post('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), foodController.createFood)
router.put('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), foodController.updateFood)
router.delete('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), foodController.deleteFood)

export default router
