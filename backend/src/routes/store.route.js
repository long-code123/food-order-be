const express = require('express')
const router = express.Router()
const storeController = require('../controllers/store.controller')
const foodController = require('../controllers/food.controller')
const authorizeMiddleware = require('../middlewares/authorizeMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const reviewstoreController = require('../controllers/reviewstore.controller')
const paymentController = require('../controllers/payment.controller')

router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), storeController.getStores)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), storeController.getStoreById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), storeController.createStore)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), storeController.updateStore)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), storeController.deleteStore)
router.get('/:id/foods', foodController.getFoodsByStore)
router.get('/:id/reviews', reviewstoreController.getReviewsByStore)
router.get('/:id/payments', paymentController.getPaymentsByStore)

module.exports = router
