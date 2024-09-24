import db from '@src/models'
const Food = db.foods
const config = require('@src/configs/redis.config')
const Redis = require('ioredis')
const redis = new Redis(config)

const getFoods = async (req, res) => {
  try {
    // Lấy tất cả các món ăn từ cơ sở dữ liệu
    const allFoods = await Food.findAll()
    console.log(allFoods)
    const key = req.originalUrl
    const checkOk = await redis.set(key, JSON.stringify(allFoods))
    console.log(checkOk)
    if (checkOk === 'OK') {
      console.log('Data saved to Redis:', allFoods)
    }
    res.status(200).json({allFoods})
  } catch (error) {
    console.error('Error getting foods:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getFoodById = async (req, res) => {
  const foodId = req.params.id

  try {
    const food = await Food.findByPk(foodId)

    if (!food) {
      return res.status(404).json({ message: 'Food not found' })
    }

    res.status(200).json(food)
  } catch (error) {
    console.error('Error getting food by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getFoodsByStore = async (req, res) => {
  try {
    const storeId = req.params.id
    console.log(storeId)
    if (!storeId) {
      return res.status(400).json({ message: 'Invalid storeId' })
    }

    const foods = await Food.findAll({ where: { storeId } })
    if (foods.length === 0) {
      return res.status(404).json({ message: 'No foods found for this store' })
    }
    res.status(200).json(foods)
  } catch (error) {
    console.error('Error fetching foods by store:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getFoodsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    if (!categoryId) {
      return res.status(400).json({ message: 'Invalid categoryId' })
    }
    const foods = await Food.findAll({ where: { categoryId } })
    if (foods.length === 0) {
      return res.status(404).json({ message: 'No foods found for this store' })
    }
    res.status(200).json({foods})
    
  } catch (error) {
    console.error('Error fetching foods by category:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getFoods,
  getFoodById,
  getFoodsByStore,
  getFoodsByCategory
}
