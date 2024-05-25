const express = require('express')

const router = express.Router()
const foodquantityController = require('../../controllers/foodquantity.controller')

router.get('/', foodquantityController.getFoodquantitys)
router.get('/:id', foodquantityController.getFoodquantityById)
router.post('/', foodquantityController.createFoodquantity)
router.put('/:id', foodquantityController.updateFoodquantity)
router.delete('/:id', foodquantityController.deleteFoodquantity)

module.exports = router
