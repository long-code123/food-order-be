import express from 'express'
import reviewfoodController from '@src/controllers/sites/reviewfood.controller'

const router = express.Router()

router.get('/', reviewfoodController.getReviewfoods)
router.get('/:id', reviewfoodController.getReviewfoodById)
router.post('/', reviewfoodController.createReviewfood)
router.put('/:id', reviewfoodController.updateReviewfood)
router.delete('/:id', reviewfoodController.deleteReviewfood)

export default router
