const express = require('express')
const router = express.Router()
const foodController = require('../controllers/food.controller')
const cacheMiddleware = require('../../middlewares/redisMiddleware')
const authorizeMiddleware = require('../../middlewares/authorizeMiddleware')
const authMiddleware = require('../../middlewares/authMiddleware')

router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), foodController.getFoods)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), foodController.getFoodById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), foodController.createFood)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), foodController.updateFood)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), foodController.deleteFood)

module.exports = router
