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
        key: 'userId'
      }
    },
    shipperId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'shippers',
        key: 'shipperId'
      }
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    storeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'stores',
        key: 'storeId'
      }
    }
  })

  orders.associate = function (models) {
    orders.belongsTo(models.users, {
      foreignKey: 'userId',
      targetKey: 'userId'
    })
    orders.belongsTo(models.shippers, {
      foreignKey: 'shipperId',
      targetKey: 'shipperId'
    })
    orders.hasMany(models.foodquantity, {
      foreignKey: 'orderId',
      as: 'items'
    })
    orders.belongsTo(models.stores, {
      foreignKey: 'storeId',
      targetKey: 'storeId'
    })
  }

  return orders
}
