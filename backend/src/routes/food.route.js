const express = require('express')
const router = express.Router()
const foodController = require('../controllers/food.controller')
const cacheMiddleware = require('../middlewares/redisMiddleware')
const authorizeMiddleware = require('../middlewares/authorizeMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, foodController.getFoods)
router.get('/:id', authorizeMiddleware(['super admin']), foodController.getFoodById)
router.post('/', foodController.createFood)
router.put('/:id', foodController.updateFood)
router.delete('/:id', foodController.deleteFood)

module.exports = router
