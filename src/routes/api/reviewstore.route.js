const express = require('express')

const router = express.Router()
const reviewstoreController = require('../../controllers/reviewstore.controller')

router.get('/', reviewstoreController.getReviewstores)
router.get('/:id', reviewstoreController.getReviewstoreById)
router.post('/', reviewstoreController.createReviewstore)
router.put('/:id', reviewstoreController.updateReviewstore)
router.delete('/:id', reviewstoreController.deleteReviewstore)

module.exports = router
