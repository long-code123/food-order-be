import Sequelize from 'sequelize'

import sequelize from '@src/common/db.js'
import logger from '@src/utils/logger.utils'
const db = {}

db.foods = require('./food.model.js')(sequelize, Sequelize)
db.categories = require('./category.model.js')(sequelize, Sequelize)
db.reviewfood = require('./reviewfood.model.js')(sequelize, Sequelize)
db.reviewstore = require('./reviewstore.model.js')(sequelize, Sequelize)
db.reviewshipper = require('./reviewshipper.model.js')(sequelize, Sequelize)
db.stores = require('./store.model.js')(sequelize, Sequelize)
db.voucher = require('./voucher.model.js')(sequelize, Sequelize)
db.orders = require('./order.model.js')(sequelize, Sequelize)
// db.payment = require('./payment.model.js')(sequelize, Sequelize)
db.foodquantity = require('./foodquantity.model.js')(sequelize, Sequelize)
db.shippers = require('./shipper.model.js')(sequelize, Sequelize)
db.users = require('./user.model.js')(sequelize, Sequelize)
db.admin = require('./admin.model.js')(sequelize, Sequelize)

Object.keys(db).forEach((modelName) => {
  logger.info(`modelName: ${modelName}`)
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.Sequelize = Sequelize
db.sequelize = sequelize

export default db
