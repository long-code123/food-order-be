import 'module-alias/register'

const express = require('express')
const bodyParser = require('body-parser')

const error404Middleware = require('./src/middlewares/error404.middleware')
const cors = require('cors')
import loggers from '@src/utils/logger.utils'

import apiCustomerV1Router from '@src/routes/api/v1/customers'
import apiMerchantV1Router from '@src/routes/api/v1/merchants'

import siteRouter from '@src/routes/site'
import db from '@src/models'

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
// Define api routes to use for mobile app

app.use('/api/v1/customer/orders', apiCustomerV1Router.orderRouter)

// Define api routes to use for mobile app

app.use('/api/v1/merchant/orders', apiMerchantV1Router.orderRouter)

// define api routes to use for mobile app
app.use('/api/v1/shippers/orders', apiMerchantV1Router.orderRouter)

// define site routes to use for cms admin

// app.use('/site/foods', siteRouter.foodRoutes)
// app.use('/site/categories', siteRouter.categoryRoutes)
// app.use('/site/stores', siteRouter.storeRoutes)
// app.use('/site/users', siteRouter.userRoutes)
// app.use('/site/shippers', siteRouter.shipperRoutes)
// app.use('/site/vouchers', siteRouter.voucherRoutes)
// app.use('/site/orders', siteRouter.orderRoutes)
// app.use('/site/payments', siteRouter.paymentRoutes)
// app.use('/site/reviewfoods', siteRouter.reviewfoodRoutes)
// app.use('/site/reviewshippers', siteRouter.reviewshipperRoutes)
// app.use('/site/reviewstores', siteRouter.reviewstoreRoutes)
// app.use('/site/foodquantities', siteRouter.foodquantityRoutes)
// app.use('/site/login', siteRouter.loginRoutes)

app.use(error404Middleware)

app.listen(8000, function () {
  loggers.info('Server is running on port 8000')
})
