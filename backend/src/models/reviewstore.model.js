const dbConfig = require('../configs/db.config.js')

module.exports = (sequelize, Sequelize) => {
  const reviewstore = sequelize.define('reviewstore', {
    rating: {
      type: Sequelize.DOUBLE
    },
    comment: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'userId' // 'id' refers to column name in fathers table
      }
    },
    storeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'stores',
        key: 'storeId' // 'id' refers to column name in fathers table
      }
    }
  })

  reviewstore.associate = function (models) {
    reviewstore.belongsTo(models.users, {
      foreignKey: 'userId',
      targetKey: 'userId'
    })
  }
  reviewstore.associate = function (models) {
    reviewstore.belongsTo(models.stores, {
      foreignKey: 'storeId',
      targetKey: 'storeId'
    })
  }

  return reviewstore
}
