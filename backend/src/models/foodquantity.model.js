const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const foodquantity = sequelize.define("foodquantity", {
        foodQuantityId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'orders',
              key: 'orderId', // 'id' refers to column name in fathers table
           }
        },
        foodId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'foods',
              key: 'foodId', // 'id' refers to column name in fathers table
           }
        },
        quantity: {
            type: Sequelize.INTEGER
        }
    });

    foodquantity.associate = function (models) {
        foodquantity.belongsTo(models.foods, {
            foreignKey: 'foodId',
            targetKey: 'foodId'
        });
    };
    foodquantity.associate = function (models) {
        foodquantity.belongsTo(models.orders, {
            foreignKey: 'orderId',
            targetKey: 'orderId'
        });
    };

    return foodquantity;
};