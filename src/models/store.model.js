const dbConfig = require('../configs/db.config.js')

module.exports = (sequelize, Sequelize) => {
  const stores = sequelize.define('stores', {
    storeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    storeName: {
      type: Sequelize.STRING
    },
    storeImage: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    }
  })

  return stores
}
