const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const foodquantity = sequelize.define("foodquantity", {
        foodQuantityId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderId: {
            type: Sequelize.INTEGER
        },
        foodId: {
            type: Sequelize.INTEGER
        },
        quantity: {
            type: Sequelize.INTEGER
        }
    });

    return foodquantity;
};