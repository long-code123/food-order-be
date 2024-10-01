import express from 'express'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'
import foodquantityController from '@src/controllers/sites/foodquantity.controller'
import AppConstants from '@src/common/constants'

const router = express.Router()

router.get('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), foodquantityController.getFoodquantitys)
router.get('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), foodquantityController.getFoodquantityById)
router.post('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), foodquantityController.createFoodquantity)
router.put('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), foodquantityController.updateFoodquantity)
router.delete('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), foodquantityController.deleteFoodquantity)

export default router
