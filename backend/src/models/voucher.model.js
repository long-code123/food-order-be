const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const voucher = sequelize.define("voucher", {
        voucherId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: Sequelize.STRING
        },
        value: {
            type: Sequelize.DOUBLE
        },
        conditition: {
            type: Sequelize.STRING
        },
        orderId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'orders',
                key: 'orderId', // 'id' refers to column name in fathers table
            }
        }
    });
    voucher.associate = function (models) {
        voucher.belongsTo(models.orders, {
            foreignKey: 'orderId',
            targetKey: 'orderId'
        });
    };

    return voucher;
};