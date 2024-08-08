import express from 'express'
import reviewstoreController from '@src/controllers/sites/reviewstore.controller'

const router = express.Router()

router.get('/', reviewstoreController.getReviewstores)
router.get('/:id', reviewstoreController.getReviewstoreById)
router.post('/', reviewstoreController.createReviewstore)
router.put('/:id', reviewstoreController.updateReviewstore)
router.delete('/:id', reviewstoreController.deleteReviewstore)

export default router
