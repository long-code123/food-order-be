import express from 'express'
import reviewstoreController from '@src/controllers/api/customers/reviewstore.controller'

const router = express.Router()

router.post('/', reviewstoreController.createReviewstore)

export default router
