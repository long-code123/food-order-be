import express from 'express'
import reviewshipperController from '@src/controllers/sites/reviewshipper.controller'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'
import AppConstants from '@src/common/constants'

const router = express.Router()

router.get('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), reviewshipperController.getReviewshippers)
router.get('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), reviewshipperController.getReviewshipperById)
router.post('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), reviewshipperController.createReviewshipper)
router.put('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), reviewshipperController.updateReviewshipper)
router.delete('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), reviewshipperController.deleteReviewshipper)

export default router
