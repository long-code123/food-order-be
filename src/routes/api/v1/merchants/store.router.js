import express from 'express'
import foodController from '@src/controllers/api/merchants/food.controller'
import reviewstoreController from '@src/controllers/api/merchants/reviewstore.controller'
import orderController from '@src/controllers/api/merchants/order.controller'
import storeController from '@src/controllers/api/merchants/store.controller'

const router = express.Router()

router.get('/:id/foods', foodController.getFoodsByStore)
router.get('/:id/reviews', reviewstoreController.getReviewsByStore)
router.get('/:id/income', orderController.calculateStoreIncome)
router.get('/:id/orders', orderController.getOrdersByStore)
router.post('/login', storeController.loginUserForStore)
router.get('/:storeId/categories/:categoryId/foods', foodController.getFoodsByStoreAndCategory);


export default router
