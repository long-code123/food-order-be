import db from '@src/models'
const Store = db.stores

const getStores = async (req, res) => {
  try {
    const allStores = await Store.findAll()

    res.status(200).json(allStores)
  } catch (error) {
    console.error('Error getting stores:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getStoreById = async (req, res) => {
  const storeId = req.params.id

  try {
    const store = await Store.findByPk(storeId)

    if (!store) {
      return res.status(404).json({ message: 'Store not found' })
    }

    res.status(200).json(store)
  } catch (error) {
    console.error('Error getting store by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getStores,
  getStoreById
}
