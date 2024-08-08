import express from 'express'
import reviewshipperController from '@src/controllers/sites/reviewshipper.controller'

const router = express.Router()

router.get('/', reviewshipperController.getReviewshippers)
router.get('/:id', reviewshipperController.getReviewshipperById)
router.post('/', reviewshipperController.createReviewshipper)
router.put('/:id', reviewshipperController.updateReviewshipper)
router.delete('/:id', reviewshipperController.deleteReviewshipper)

export default router
