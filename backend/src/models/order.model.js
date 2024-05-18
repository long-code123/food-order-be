const dbConfig = require('../configs/db.config.js')

module.exports = (sequelize, Sequelize) => {
  const orders = sequelize.define('orders', {
    orderId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    deliveryTime: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'userId' // 'id' refers to column name in fathers table
      }
    },
    shipperId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'shippers',
        key: 'shipperId' // 'id' refers to column name in fathers table
      }
    }
  })

  orders.associate = function (models) {
    orders.belongsTo(models.users, {
      foreignKey: 'userId',
      targetKey: 'userId'
    })
  }
  orders.associate = function (models) {
    orders.belongsTo(models.shippers, {
      foreignKey: 'shipperId',
      targetKey: 'shipperId'
    })
  }

  return orders
}
