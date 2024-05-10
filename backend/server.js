const express = require('express')
const bodyParser = require('body-parser')

const error404Middleware = require('./src/middlewares/error404Middleware')
const authMiddleware = require('./src/middlewares/authMiddleware')

const router = require('./src/routes')

const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
app.use(bodyParser.json())
app.use(error404Middleware)
app.use(authMiddleware)

app.use('/api/v1/foods', router.foodRoutes)

// const foods = [
//     { id: 1, name: 'Burger', price: 10 },
//     { id: 2, name: 'Pizza', price: 12 },
//     { id: 3, name: 'Salad', price: 8 }
//   ];
//   // Lấy tất cả foods
//   app.get('/foods', function(req, res) {
//     res.json(foods);
//   });
//   // Tìm food theo id
//   app.get('/foods/:id', function(req, res){
//     const foodId = parseInt(req.params.id); // Lấy id từ tham số của URL và chuyển đổi sang số nguyên
//     const foundFood = foods.find(food => food.id === foodId); // Tìm food trong mảng dựa trên id

//     if (foundFood) {
//         res.json(foundFood);
//     } else {
//     res.status(404).send('Food not found');
//   }
//   })
//   // Tạo food
//   app.post('/foods', function(req, res) {
//     const { name, price } = req.body;

//     // Kiểm tra tính hợp lệ của dữ liệu đầu vào
//     if (!name || !price || typeof price !== 'number') {
//         return res.status(400).json({ message: 'Invalid data' });
//     }

//     const newFood = {
//         id: foods.length + 1,
//         name: name,
//         price: price
//     };

//     foods.push(newFood);
//     res.status(201).json(newFood);
//   });
//   // Update món ăn theo ID
//   app.put('/foods/:id', function(req, res){
//     const foodId = parseInt(req.params.id);
//     const { name, price } = req.body;

//     if (!Number.isInteger(foodId) || foodId <= 0) {
//         return res.status(400).json({ message: 'Invalid food ID' });
//     }

//     const foundFoodIndex = foods.findIndex(food => food.id === foodId);
//     if (foundFoodIndex === -1) {
//         return res.status(404).json({ message: 'Food not found' });
//     }

//     if (name) {
//         foods[foundFoodIndex].name = name;
//     }
//     if (price) {
//         foods[foundFoodIndex].price = price;
//     }

//     res.json(foods[foundFoodIndex]);
//   });
//   // Xóa món ăn theo ID
//   app.delete('/foods/:id', function(req, res){
//     const foodId = parseInt(req.params.id);

//     if (!Number.isInteger(foodId) || foodId <= 0) {
//         return res.status(400).json({ message: 'Invalid food ID' });
//     }
//     const foundFoodIndex = foods.findIndex(food => food.id === foodId);
//     if (foundFoodIndex === -1) {
//         return res.status(404).json({ message: 'Food not found' });
//     }

//     foods.splice(foundFoodIndex, 1);

//     res.json({ message: 'Food deleted successfully' });
//   });

//   const stores = [
//     { id: 1, name: 'KFC', location: 'Thanh Khe' },
//     { id: 2, name: 'Lotte', location: 'Hai Chau' },
//     { id: 3, name: 'Vinmart', location: 'Hoa Xuan' }
//   ];

//   app.get('/stores', function(req, res) {
//     res.json(stores);
//   });
//   app.get('/stores/:id', function(req, res){
//     const storeId = parseInt(req.params.id); // Lấy id từ tham số của URL và chuyển đổi sang số nguyên
//     const foundStore = stores.find(store => store.id === storeId); // Tìm food trong mảng dựa trên id

//     if (foundStore) {
//         res.json(foundStore);
//     } else {
//     res.status(404).send('Store not found');
//   }
//   })
//   app.post('/stores', function(req, res) {
//     const { name, location } = req.body;

//     // Kiểm tra tính hợp lệ của dữ liệu đầu vào
//     if (!name || !location ) {
//         return res.status(400).json({ message: 'Invalid data' });
//     }

//     const newStore = {
//         id: stores.length + 1,
//         name: name,
//         location: location
//     };

//     stores.push(newStore);
//     res.status(201).json(newStore);
//   });
//   // Update cua hang theo ID
//   app.put('/stores/:id', function(req, res){
//     const storeId = parseInt(req.params.id);
//     const { name, location } = req.body;

//     if (!Number.isInteger(storeId) || storeId <= 0) {
//         return res.status(400).json({ message: 'Invalid store ID' });
//     }

//     const foundStoreIndex = stores.findIndex(store => store.id === storeId);
//     if (foundStoreIndex === -1) {
//         return res.status(404).json({ message: 'Store not found' });
//     }

//     if (name) {
//         stores[foundStoreIndex].name = name;
//     }
//     if (location) {
//         stores[foundStoreIndex].location = location;
//     }

//     res.json(stores[foundStoreIndex]);
//   });
//   // Xóa cua hang theo ID
//   app.delete('/stores/:id', function(req, res){
//     const storeId = parseInt(req.params.id);

//     if (!Number.isInteger(storeId) || storeId <= 0) {
//         return res.status(400).json({ message: 'Invalid store ID' });
//     }
//     const foundStoreIndex = stores.findIndex(store => store.id === storeId);
//     if (foundStoreIndex === -1) {
//         return res.status(404).json({ message: 'Store not found' });
//     }

//     stores.splice(foundStoreIndex, 1);

//     res.json({ message: 'Store deleted successfully' });
//   });

//   const users = [
//     { id: 1, name: 'Long', address: 'Thanh Khe' },
//     { id: 2, name: 'Huy', address: 'Hai Chau' },
//     { id: 3, name: 'Quan', address: 'Hoa Xuan' }
//   ];
//   app.get('/users', function(req, res) {
//     res.json(users);
//   });
//   app.get('/users/:id', function(req, res){
//     const userId = parseInt(req.params.id); // Lấy id từ tham số của URL và chuyển đổi sang số nguyên
//     const foundUser = users.find(user => user.id === userId); // Tìm food trong mảng dựa trên id

//     if (foundUser) {
//         res.json(foundUser);
//     } else {
//     res.status(404).send('User not found');
//   }
//   })
//   app.post('/users', function(req, res) {
//     const { name, address } = req.body;

//     // Kiểm tra tính hợp lệ của dữ liệu đầu vào
//     if (!name || !address ) {
//         return res.status(400).json({ message: 'Invalid data' });
//     }

//     const newUser = {
//         id: users.length + 1,
//         name: name,
//         address: address
//     };

//     users.push(newUser);
//     res.status(201).json(newUser);
//   });

//   app.put('/users/:id',  function(req, res){
//     const userId = parseInt(req.params.id);
//     const { name, address } = req.body;

//     if (!Number.isInteger(userId) || userId <= 0) {
//         return res.status(400).json({ message: 'Invalid user ID' });
//     }

//     const foundUserIndex = users.findIndex(user => user.id === userId);
//     if (foundUserIndex === -1) {
//         return res.status(404).json({ message: 'User not found' });
//     }

//     if (name) {
//         users[foundUserIndex].name = name;
//     }
//     if (address) {
//         users[foundUserIndex].address = address;
//     }

//     res.json(users[foundUserIndex]);
//   });
//   // Xóa cua hang theo ID
//   app.delete('/users/:id', function(req, res){
//     const userId = parseInt(req.params.id);

//     if (!Number.isInteger(userId) || userId <= 0) {
//         return res.status(400).json({ message: 'Invalid user ID' });
//     }
//     const foundUserIndex = users.findIndex(user => user.id === userId);
//     if (foundUserIndex === -1) {
//         return res.status(404).json({ message: 'User not found' });
//     }

//     users.splice(foundUserIndex, 1);

//     res.json({ message: 'User deleted successfully' });
//   });

//   const jwt = require('jsonwebtoken');
//   // Payload đã giải mã từ token
//   const decodedPayload = {
//     user_id: 123,
//     username: 'long'
//   };

//   // Secret key đã sử dụng để ký và xác minh token ban đầu
//   const secretKey = 'your_secret_key';

//   // Tạo lại token từ payload đã giải mã và secret key
//   const newToken = jwt.sign(decodedPayload, secretKey);
//   console.log(newToken);
//   app.use(authMiddleware);
//   // Sử dụng middleware authMiddleware để bảo vệ các tài nguyên
//   app.get('/protected/resource', authMiddleware, (req, res) => {
//     // Các xử lý tiếp theo sau khi xác thực token thành công
//     res.json({ success: true, message: 'Access granted!' });
//   });

//   app.use((err, req, res, next) => {
//     console.error(err.message);
//     res.status(404).send('Something broke!');
//   });

app.listen(3000, function () {
  console.log('Server is running on port 3000')
})
