
module.exports = (sequelize, Sequelize) => {
  const Foods = sequelize.define("foods", {
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
        model: 'categories',
        key: 'categoryId', // 'id' refers to column name in fathers table
      }
    },
    storeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'stores',
        key: 'storeId', // 'id' refers to column name in fathers table
      }
    }
  });

  Foods.associate = function (models) {
    Foods.belongsTo(models.categories, {
      foreignKey: 'categoryId',
      targetKey: 'categoryId'
    });
  };
  Foods.associate = function (models) {
    Foods.belongsTo(models.stores, {
      foreignKey: 'storeId',
      targetKey: 'storeId'
    });
  };

  return Foods;
};