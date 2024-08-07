const db = require('../models')
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
const getReviewfoods = async (req, res) => {
  try {
    const allReviewfoods = await Reviewfood.findAll()

    res.status(200).json(allReviewfoods)
  } catch (error) {
    console.error('Error getting reviewfoods:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getReviewfoodById = async (req, res) => {
  const reviewfoodId = req.params.id

  try {
    const reviewfood = await Reviewfood.findByPk(reviewfoodId)

    if (!reviewfood) {
      return res.status(404).json({ message: 'Reviewfood not found' })
    }

    res.status(200).json(reviewfood)
  } catch (error) {
    console.error('Error getting reviewfood by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const updateReviewfood = async (req, res) => {
  try {
    const reviewfoodId = req.params.id
    const existingReviewfood = await Reviewfood.findByPk(reviewfoodId)
    if (!existingReviewfood) {
      return res.status(404).json({ message: 'Reviewfood not found' })
    }
    existingReviewfood.rating = req.body.rating || existingReviewfood.rating
    existingReviewfood.comment = req.body.comment || existingReviewfood.comment
    existingReviewfood.userId = req.body.userId || existingReviewfood.userId
    existingReviewfood.foodId = req.body.orderId || existingReviewfood.orderId

    const updatedReviewfood = await existingReviewfood.save()
    res.status(200).json(updatedReviewfood)
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error updating reviewfood:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const deleteReviewfood = async (req, res) => {
  try {
    const reviewfoodId = req.params.id
    const existingReviewfood = await Reviewfood.findByPk(reviewfoodId)
    if (!existingReviewfood) {
      return res.status(404).json({ message: 'Reviewfood not found' })
    }

    // Xóa món ăn khỏi cơ sở dữ liệu
    await existingReviewfood.destroy()

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Reviewfood deleted successfully' })
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error deleting reviewfood:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
module.exports = {
  getReviewfoods,
  getReviewfoodById,
  createReviewfood,
  updateReviewfood,
  deleteReviewfood
}
