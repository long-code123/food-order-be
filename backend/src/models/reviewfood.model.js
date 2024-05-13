const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
  const reviewfood = sequelize.define("reviewfood", {
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
        key: 'userId', // 'id' refers to column name in fathers table
      }
    },
    foodId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'foods',
        key: 'foodId', // 'id' refers to column name in fathers table
      }
    }
  });
  reviewfood.associate = function (models) {
    reviewfood.belongsTo(models.users, {
      foreignKey: 'userId',
      targetKey: 'userId'
    });
  };
  reviewfood.associate = function (models) {
    reviewfood.belongsTo(models.foods, {
      foreignKey: 'foodId',
      targetKey: 'foodId'
    });
  };

  return reviewfood;
};