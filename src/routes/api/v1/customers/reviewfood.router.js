import express from 'express'
import reviewfoodController from '@src/controllers/api/customers/reviewfood.controller'

const router = express.Router()

router.post('/', reviewfoodController.createReviewfood)

export default router
