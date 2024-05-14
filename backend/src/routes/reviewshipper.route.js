const express = require('express')

const router = express.Router()
const reviewshipperController = require('../controllers/reviewshipper.controller')

router.get('/', reviewshipperController.getReviewshippers)
router.get('/:id', reviewshipperController.getReviewshipperById)
router.post('/', reviewshipperController.createReviewshipper)
router.put('/:id', reviewshipperController.updateReviewshipper)
router.delete('/:id', reviewshipperController.deleteReviewshipper)

module.exports = router
