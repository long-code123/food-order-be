const dbConfig = require('../configs/db.config.js')

module.exports = (sequelize, Sequelize) => {
  const reviewshipper = sequelize.define('reviewshipper', {
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
    shipperId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'shippers',
        key: 'shipperId' // 'id' refers to column name in fathers table
      }
    }
  })

  reviewshipper.associate = function (models) {
    reviewshipper.belongsTo(models.users, {
      foreignKey: 'userId',
      targetKey: 'userId'
    })
  }
  reviewshipper.associate = function (models) {
    reviewshipper.belongsTo(models.shippers, {
      foreignKey: 'shipperId',
      targetKey: 'shipperId'
    })
  }

  return reviewshipper
}
