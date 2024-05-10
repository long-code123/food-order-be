const express = require('express')

const router = express.Router()
const foodController = require('../controllers/food.controller')

router.get('/', async (req, res) => {
  let data = await foodController.getFoods()
  res.json(data)
})
router.get('/:id', foodController.getFoodById)
router.post('/', foodController.createFood)
router.put('/:id', foodController.updateFood)
router.delete('/:id', foodController.deleteFood)

module.exports = router