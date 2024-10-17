const { where } = require('sequelize')
import db from '@src/models'
const Reviewshipper = db.reviewshipper


const getReviewsByShipper = async (req, res) => {
  try {
    const shipperId = req.params.id
    if (!shipperId) {
      return res.status(400).json({ message: 'Invalid shipperId' })
    }
    const reviews = await Reviewshipper.findAll({ where: { shipperId } })
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews for shipper' })
    }
    res.status(200).json(reviews)
  } catch (error) {
    console.error('Error fetching Reviews by shipper: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getReviewsByShipper
}
