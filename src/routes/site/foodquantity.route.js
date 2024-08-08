import express from 'express'

import foodquantityController from '@src/controllers/sites/foodquantity.controller'

const router = express.Router()

router.get('/', foodquantityController.getFoodquantitys)
router.get('/:id', foodquantityController.getFoodquantityById)
router.post('/', foodquantityController.createFoodquantity)
router.put('/:id', foodquantityController.updateFoodquantity)
router.delete('/:id', foodquantityController.deleteFoodquantity)

export default router
