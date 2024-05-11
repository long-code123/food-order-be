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
  try {
    const foodId = parseInt(req.params.id);
    const foundFood = foods.find(food => food.id === foodId);

    if (!foundFood) {
      return res.status(404).json({ error: 'Food not found' });
    } else {
      console.log('get food ' + foodId);
      return res.json(foundFood); // Em return thẳng foundFood nó load postman k được
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' }); // Trả về thông báo lỗi tổng quát và mã trạng thái 500
  }
}
const createFood = async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price || isNaN(price)) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  const newFood = {
    id: foods.length + 1,
    name: name,
    price: parseFloat(price)
  };
  console.log('Create successfully')
  foods.push(newFood);
  return res.json(newFood);
}
const updateFood = async (req, res) => {
    const foodId = parseInt(req.params.id)
    const { name, price } = req.body

    if (isNaN(foodId) || foodId <= 0) {
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
    console.log('Update successfully')
    return res.json(foods[foundFoodIndex])
  }
const deleteFood = async (req, res) => {
    const foodId = parseInt(req.params.id)

    if (isNaN(foodId) || foodId <= 0) {
      return res.status(400).json({ message: 'Invalid food ID' })
    }
    const foundFoodIndex = foods.findIndex((food) => food.id === foodId)
    if (foundFoodIndex === -1) {
      return res.status(404).json({ message: 'Food not found' })
    }
    console.log('Delete successfully')
    foods.splice(foundFoodIndex, 1)
    return res.json({ message: 'Food deleted successfully' })
  }
module.exports = {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
}
