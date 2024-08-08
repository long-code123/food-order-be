import express from 'express'
import storeController from '@src/controllers/sites/store.controller'
import foodController from '@src/controllers/sites/food.controller'
import authorizeMiddleware from '@src/middlewares/authorize.middleware'
import authMiddleware from '@src/middlewares/auth.middleware'
import reviewstoreController from '@src/controllers/sites/reviewstore.controller'
import paymentController from '@src/controllers/sites/payment.controller'

const router = express.Router()

router.get('/', storeController.getStores)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), storeController.getStoreById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), storeController.createStore)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), storeController.updateStore)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), storeController.deleteStore)
router.get('/:id/foods', foodController.getFoodsByStore)
router.get('/:id/reviews', reviewstoreController.getReviewsByStore)
router.get('/:id/payments', paymentController.getPaymentsByStore)

export default router
