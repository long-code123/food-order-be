const express = require('express')
const bodyParser = require('body-parser')

const error404Middleware = require('./src/middlewares/error404Middleware')
const authMiddleware = require('./src/middlewares/authMiddleware')
const db = require('./src/models')
const cors = require('cors')
const loggers = require('./src/utils/logger.utils')

const router = require('./src/routes')
const siteRouter = require('./src/routes/site')
const apiRouter = require('./src/routes/api')

const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.')
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })

app.use(bodyParser.json())
app.use(cors())

// define api routes to use for mobile app

// Define api routes to use for mobile app
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
app.use('/api/v1/login', router.loginRoutes)

// define site routes to use for cms admin

// Define cms routes to use for cms admin

app.use('/api/v1/admin', router.adminRoutes)

app.use(error404Middleware)

app.listen(8000, function () {
  loggers.info('Server is running on port 8000')
})
