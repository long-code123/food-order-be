const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define("order", {
        orderId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        deleveryTime: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        },
        shipperId: {
            type: Sequelize.INTEGER
        }
    });

    return order;
};