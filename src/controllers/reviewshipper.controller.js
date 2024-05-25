const db = require('../models')
const Reviewshipper = db.reviewshipper

const createReviewshipper = async (req, res) => {
  try {
    if (!req.body.rating || !req.body.comment) {
      return res.status(400).json({ message: 'Review is required.' })
    }
    const newReviewshipper = {
      rating: req.body.rating,
      comment: req.body.comment,
      userId: req.body.userId || null,
      shipperId: req.body.shipperId || null
    }
    const createdReviewshipper = await Reviewshipper.create(newReviewshipper)
    res.status(201).json(createdReviewshipper)
    console.log('Create Successfully')
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error creating reviewshipper:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const getReviewshippers = async (req, res) => {
  try {
    const allReviewshippers = await Reviewshipper.findAll()

    res.status(200).json(allReviewshippers)
  } catch (error) {
    console.error('Error getting reviewshippers:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getReviewshipperById = async (req, res) => {
  const reviewshipperId = req.params.id

  try {
    const reviewshipper = await Reviewshipper.findByPk(reviewshipperId)

    if (!reviewshipper) {
      return res.status(404).json({ message: 'Reviewshipper not found' })
    }

    res.status(200).json(reviewshipper)
  } catch (error) {
    console.error('Error getting reviewshipper by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const updateReviewshipper = async (req, res) => {
  try {
    const reviewshipperId = req.params.id
    const existingReviewshipper = await Reviewshipper.findByPk(reviewshipperId)
    if (!existingReviewshipper) {
      return res.status(404).json({ message: 'Reviewshipper not found' })
    }
    existingReviewshipper.rating = req.body.rating || existingReviewshipper.rating
    existingReviewshipper.comment = req.body.comment || existingReviewshipper.comment
    existingReviewshipper.userId = req.body.userId || existingReviewshipper.userId
    existingReviewshipper.shipperId = req.body.shipperId || existingReviewshipper.shipperId

    const updatedReviewshipper = await existingReviewshipper.save()
    res.status(200).json(updatedReviewshipper)
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error updating reviewshipper:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const deleteReviewshipper = async (req, res) => {
  try {
    const reviewshipperId = req.params.id
    const existingReviewshipper = await Reviewshipper.findByPk(reviewshipperId)
    if (!existingReviewshipper) {
      return res.status(404).json({ message: 'Reviewshipper not found' })
    }

    // Xóa món ăn khỏi cơ sở dữ liệu
    await existingReviewshipper.destroy()

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Reviewshipper deleted successfully' })
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error deleting reviewshipper:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
module.exports = {
  getReviewshippers,
  getReviewshipperById,
  createReviewshipper,
  updateReviewshipper,
  deleteReviewshipper
}
