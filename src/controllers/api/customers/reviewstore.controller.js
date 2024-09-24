import db from '@src/models';

const Reviewstore = db.reviewstore;

const createReviewstore = async (req, res) => {
  try {
    if (!req.body.rating || !req.body.comment) {
      return res.status(400).json({ message: 'Review is required.' });
    }
    const newReviewstore = {
      rating: req.body.rating,
      comment: req.body.comment,
      userId: req.body.userId || null,
      storeId: req.body.storeId || null,
    };
    const createdReviewstore = await Reviewstore.create(newReviewstore);
    res.status(201).json(createdReviewstore);
    console.log('Create Successfully');
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getReviewsByStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    if (!storeId) {
      return res.status(400).json({ message: 'Invalid shipperId' });
    }
    const reviews = await Reviewstore.findAll({ where: { storeId } });
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews for store' });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching Reviews by store: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  createReviewstore,
  getReviewsByStore,
};
