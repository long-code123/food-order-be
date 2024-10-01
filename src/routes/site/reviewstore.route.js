import express from 'express'
import reviewstoreController from '@src/controllers/sites/reviewstore.controller'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'
import AppConstants from '@src/common/constants'

const router = express.Router()

router.get('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), reviewstoreController.getReviewstores)
router.get('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN, AppConstants.PERMISSION.ADMIN]), reviewstoreController.getReviewstoreById)
router.post('/', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), reviewstoreController.createReviewstore)
router.put('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), reviewstoreController.updateReviewstore)
router.delete('/:id', authMiddleware, authorizeMiddleware([AppConstants.PERMISSION.SUPER_ADMIN]), reviewstoreController.deleteReviewstore)

export default router
