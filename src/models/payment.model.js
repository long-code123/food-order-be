const dbConfig = require('../configs/db.config.js')

module.exports = (sequelize, Sequelize) => {
  const payment = sequelize.define('payment', {
    paymentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    paymentDate: {
      type: Sequelize.STRING
    },
    totalAmount: {
      type: Sequelize.DOUBLE
    },
    paymentMethod: {
      type: Sequelize.STRING
    },
    paymentStatus: {
      type: Sequelize.STRING
    },
    storeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'stores',
        key: 'storeId' // 'id' refers to column name in fathers table
      }
    },
    orderId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'orders',
        key: 'orderId' // 'id' refers to column name in fathers table
      }
    }
  })
  payment.associate = function (models) {
    payment.belongsTo(models.orders, {
      foreignKey: 'orderId',
      targetKey: 'orderId'
    })
  }
  payment.associate = function (models) {
    payment.belongsTo(models.stores, {
      foreignKey: 'storeId',
      targetKey: 'storeId'
    })
  }

  return payment
}
