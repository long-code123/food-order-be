import db from '@src/models'
import config from '@src/configs/redis.config'
import Redis from 'ioredis'

const Food = db.foods
const redis = new Redis(config)

const createFood = async (req, res) => {
  try {
    // Kiểm tra xem tên món ăn và giá đã được cung cấp hay chưa
    if (!req.body.foodName || !req.body.price) {
      return res.status(400).json({ message: 'Food name and price are required.' })
    }

    // Tạo một món ăn mới từ dữ liệu trong yêu cầu
    const newFood = {
      foodName: req.body.foodName,
      price: req.body.price,
      rating: req.body.rating || null,
      description: req.body.description || null,
      foodImage: req.body.foodImage || null,
      categoryId: req.body.categoryId || null,
      storeId: req.body.storeId || null
    }

    // Lưu món ăn vào cơ sở dữ liệu
    const createdFood = await Food.create(newFood)

    // Trả về món ăn đã được tạo
    res.status(201).json(createdFood)
    console.log('Create Successfully')
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error creating food:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

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

    res.status(200).json(allFoods)
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

const updateFood = async (req, res) => {
  try {
    const foodId = req.params.id

    // Kiểm tra xem món ăn có tồn tại trong cơ sở dữ liệu không
    const existingFood = await Food.findByPk(foodId)
    if (!existingFood) {
      return res.status(404).json({ message: 'Food not found' })
    }

    // Cập nhật thông tin của món ăn từ dữ liệu trong yêu cầu
    existingFood.foodName = req.body.foodName || existingFood.foodName
    existingFood.price = req.body.price || existingFood.price
    existingFood.rating = req.body.rating || existingFood.rating
    existingFood.description = req.body.description || existingFood.description
    existingFood.foodImage = req.body.foodImage || existingFood.foodImage
    existingFood.categoryId = req.body.categoryId || existingFood.categoryId
    existingFood.storeId = req.body.storeId || existingFood.storeId

    // Lưu các thay đổi vào cơ sở dữ liệu
    const updatedFood = await existingFood.save()

    // Trả về món ăn đã được cập nhật
    res.status(200).json(updatedFood)
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error updating food:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id

    // Kiểm tra xem món ăn có tồn tại trong cơ sở dữ liệu không
    const existingFood = await Food.findByPk(foodId)
    if (!existingFood) {
      return res.status(404).json({ message: 'Food not found' })
    }

    // Xóa món ăn khỏi cơ sở dữ liệu
    await existingFood.destroy()

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Food deleted successfully' })
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error deleting food:', error)
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
    res.status(200).json(foods)
  } catch (error) {
    console.error('Error fetching foods by category:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  getFoodsByStore,
  getFoodsByCategory
}
