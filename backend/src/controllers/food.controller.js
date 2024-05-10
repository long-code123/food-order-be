const foods = [
  { id: 1, name: 'Burger', price: 10 },
  { id: 2, name: 'Pizza', price: 12 },
  { id: 3, name: 'Salad', price: 8 }
]
const getFoods = async (req, res) => {
  //   app.get('/foods', function (req, res) {
  //     res.json(foods);
  //   });
  // sai là tự nhiên app.get chi ở đây đây là chỗ xử lí logic thôi
  // chỗ này k có response kết quả chỉ trả về kết quả
  // tương tự như vậy cho các hàm khác
  console.log('getFoods')
  return foods
}

const getFoodById = async (req, res) => {
  app.get('/foods/:id', function (req, res) {
    const foodId = parseInt(req.params.id) // Lấy id từ tham số của URL và chuyển đổi sang số nguyên
    const foundFood = foods.find((food) => food.id === foodId) // Tìm food trong mảng dựa trên id

    if (foundFood) {
      res.json(foundFood)
    } else {
      res.status(404).send('Food not found')
    }
  })
}
const createFood = async (req, res) => {
  app.post('/foods', function (req, res) {
    const { name, price } = req.body

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!name || !price || typeof price !== 'number') {
      return res.status(400).json({ message: 'Invalid data' })
    }

    const newFood = {
      id: foods.length + 1,
      name: name,
      price: price
    }

    foods.push(newFood)
    res.status(201).json(newFood)
  })
}
const updateFood = async (req, res) => {
  app.put('/foods/:id', function (req, res) {
    const foodId = parseInt(req.params.id)
    const { name, price } = req.body

    if (!Number.isInteger(foodId) || foodId <= 0) {
      return res.status(400).json({ message: 'Invalid food ID' })
    }

    const foundFoodIndex = foods.findIndex((food) => food.id === foodId)
    if (foundFoodIndex === -1) {
      return res.status(404).json({ message: 'Food not found' })
    }

    if (name) {
      foods[foundFoodIndex].name = name
    }
    if (price) {
      foods[foundFoodIndex].price = price
    }

    res.json(foods[foundFoodIndex])
  })
}
const deleteFood = async (req, res) => {
  app.delete('/foods/:id', function (req, res) {
    const foodId = parseInt(req.params.id)

    if (!Number.isInteger(foodId) || foodId <= 0) {
      return res.status(400).json({ message: 'Invalid food ID' })
    }
    const foundFoodIndex = foods.findIndex((food) => food.id === foodId)
    if (foundFoodIndex === -1) {
      return res.status(404).json({ message: 'Food not found' })
    }

    foods.splice(foundFoodIndex, 1)

    res.json({ message: 'Food deleted successfully' })
  })
}
module.exports = {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
}
