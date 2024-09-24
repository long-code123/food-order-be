import express from 'express'
import storeController from '@src/controllers/api/customers/store.controller'
import foodController from '@src/controllers/api/customers/food.controller'
import reviewstoreController from '@src/controllers/api/customers/reviewstore.controller'

const router = express.Router()

router.get('/', storeController.getStores)
router.get('/:id', storeController.getStoreById)
router.get('/:id/foods', foodController.getFoodsByStore)
router.get('/:id/reviews', reviewstoreController.getReviewsByStore)

export default router
