const express = require('express')
const bodyParser = require('body-parser')

const error404Middleware = require('./src/middlewares/error404Middleware')
const authMiddleware = require('./src/middlewares/authMiddleware')
const db = require("./src/models");

db.sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log("Unable to connect to the database: " + err.message);
  });

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const router = require('./src/routes')

const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
app.use(bodyParser.json())

app.use('/api/v1/foods', router.foodRoutes)
app.use('/api/v1/categories', router.categoryRoutes)
app.use('/api/v1/stores', router.storeRoutes)
app.use('/api/v1/users', router.userRoutes)
app.use('/api/v1/shippers', router.shipperRoutes)
app.use('/api/v1/vouchers', router.voucherRoutes)
app.use('/api/v1/orders', router.orderRoutes)
app.use('/api/v1/payments', router.paymentRoutes)
app.use('/api/v1/reviewfoods', router.reviewfoodRoutes)
app.use('/api/v1/reviewshippers', router.reviewshipperRoutes)
app.use('/api/v1/reviewstores', router.reviewstoreRoutes)
app.use('/api/v1/foodquantities', router.foodquantityRoutes)


app.use(error404Middleware)
app.use(authMiddleware)

app.listen(3000, function () {
  console.log('Server is running on port 3000')
})
