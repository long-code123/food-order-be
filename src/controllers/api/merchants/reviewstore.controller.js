import db from '@src/models'
const Reviewstore = db.reviewstore

const getReviewsByStore = async (req, res) => {
  try {
    const storeId = req.params.id
    if (!storeId) {
      return res.status(400).json({ message: 'Invalid shipperId' })
    }
    const reviews = await Reviewstore.findAll({ where: { storeId } })
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews for store' })
    }
    res.status(200).json(reviews)
  } catch (error){
    console.error('Error fetching Reviews by store: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getReviewsByStore
}