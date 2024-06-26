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

  return payment
}
