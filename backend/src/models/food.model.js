const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
  const Foods = sequelize.define("Foods", {
    foodId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    foodName: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DOUBLE
    },
    rating: {
      type: Sequelize.DOUBLE
    },
    description: {
      type: Sequelize.STRING
    },
    foodImage: {
      type: Sequelize.STRING
    },
    categoryId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'category',
        key: 'id', // 'id' refers to column name in fathers table
     }
    },
    storeId: {
      type: Sequelize.INTEGER
    }
  });
  
  Foods.associate = function(models) {
    Foods.belongsTo(models.Categories, {
      foreignKey : 'id',
      targetKey: 'categoryId'
    });
  };

  return Foods;
};