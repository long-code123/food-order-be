const dbConfig = require('../configs/db.config.js')

module.exports = (sequelize, Sequelize) => {
  const foodquantity = sequelize.define('foodquantity', {
    foodQuantityId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'orders',
        key: 'orderId'
      }
    },
    foodId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'foods',
        key: 'foodId'
      }
    },
    quantity: {
      type: Sequelize.INTEGER
    }
  })

  foodquantity.associate = function (models) {
    foodquantity.belongsTo(models.foods, {
      foreignKey: 'foodId',
      targetKey: 'foodId',
      as: 'food'
    })
    foodquantity.belongsTo(models.orders, {
      foreignKey: 'orderId',
      targetKey: 'orderId',
      as: 'order'
    })
  }

  return foodquantity
}
