const db = require('@src/models')
const Reviewfood = db.reviewfood

const createReviewfood = async (req, res) => {
  try {
    if (!req.body.rating || !req.body.comment) {
      return res.status(400).json({ message: 'Review is required.' })
    }
    const newReviewfood = {
      rating: req.body.rating,
      comment: req.body.comment,
      userId: req.body.userId || null,
      foodId: req.body.foodId || null
    }
    const createdReviewfood = await Reviewfood.create(newReviewfood)
    res.status(201).json(createdReviewfood)
    console.log('Create Successfully')
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error creating reviewfood:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  createReviewfood
}
