import 'module-alias/register'

const express = require('express')
const bodyParser = require('body-parser')

const error404Middleware = require('./src/middlewares/error404.middleware')
const cors = require('cors')
import loggers from '@src/utils/logger.utils'

import apiCustomerV1Router from '@src/routes/api/v1/customers'
import apiMerchantV1Router from '@src/routes/api/v1/merchants'
import apiShipperV1Router from '@src/routes/api/v1/shippers'
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
// Define api routes to use for mobile app role customer

app.use('/api/v1/customer/orders', apiCustomerV1Router.orderRouter)
app.use('/api/v1/customer/login', apiCustomerV1Router.loginRouter)
app.use('/api/v1/customer/categories', apiCustomerV1Router.categoryRouter)
app.use('/api/v1/customer/foods', apiCustomerV1Router.foodRouter)
app.use('/api/v1/customer/reviewfoods', apiCustomerV1Router.reviewFoodRouter)
app.use('/api/v1/customer/reviewstores', apiCustomerV1Router.reviewStoreRouter)
app.use('/api/v1/customer/vouchers', apiCustomerV1Router.voucherRouter)
app.use('/api/v1/customer/stores', apiCustomerV1Router.storeRouter)
app.use('/api/v1/customer/users', apiCustomerV1Router.userRouter)


// Define api routes to use for mobile app role merchant

app.use('/api/v1/merchant/orders', apiMerchantV1Router.orderRouter)
app.use('/api/v1/merchant/stores', apiMerchantV1Router.storeRouter)
app.use('/api/v1/merchant/foods', apiMerchantV1Router.foodRouter)
app.use('/api/v1/merchant/categories', apiMerchantV1Router.categoryRouter)

// define api routes to use for mobile app role shipper
app.use('/api/v1/shippers/orders', apiShipperV1Router.orderRouter)
app.use('/api/v1/shippers/foods', apiShipperV1Router.foodRouter)
app.use('/api/v1/shippers', apiShipperV1Router.shipperRouter)
app.use('/api/v1/shippers/users', apiShipperV1Router.userRouter)


// define site routes to use for cms admin

app.use('/site/foods', siteRouter.foodRoutes)
app.use('/site/categories', siteRouter.categoryRoutes)
app.use('/site/stores', siteRouter.storeRoutes)
app.use('/site/users', siteRouter.userRoutes)
app.use('/site/shippers', siteRouter.shipperRoutes)
app.use('/site/vouchers', siteRouter.voucherRoutes)
app.use('/site/orders', siteRouter.orderRoutes)
app.use('/site/reviewfoods', siteRouter.reviewfoodRoutes)
app.use('/site/reviewshippers', siteRouter.reviewshipperRoutes)
app.use('/site/reviewstores', siteRouter.reviewstoreRoutes)
app.use('/site/foodquantities', siteRouter.foodquantityRoutes)
app.use('/site/admin', siteRouter.adminRoutes)

app.use(error404Middleware)

app.listen(8000, function () {
  loggers.info('Server is running on port 8000')
})
//aaaaaaaaaaa