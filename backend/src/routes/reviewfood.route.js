const express = require('express')

const router = express.Router()
const reviewfoodController = require('../controllers/reviewfood.controller')

router.get('/', reviewfoodController.getReviewfoods)
router.get('/:id', reviewfoodController.getReviewfoodById)
router.post('/', reviewfoodController.createReviewfood)
router.put('/:id', reviewfoodController.updateReviewfood)
router.delete('/:id', reviewfoodController.deleteReviewfood)

module.exports = router
