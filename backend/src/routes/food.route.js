const express = require('express')
const router = express.Router()
const foodController = require('../controllers/food.controller')
const cacheMiddleware = require('../middlewares/redisMiddleware')

router.get('/', foodController.getFoods)
router.get('/:id', foodController.getFoodById)
router.post('/', foodController.createFood)
router.put('/:id', foodController.updateFood)
router.delete('/:id', foodController.deleteFood)

module.exports = router
