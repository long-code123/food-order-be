const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const payment = sequelize.define("payment", {
      paymentDate: {
        type: Sequelize.STRING
      },
      totalAmount: {
        type: Sequelize.DOUBLE
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      paymentStatus: {
        type: Sequelize.STRING
      },
      orderId: {
        type: Sequelize.INTEGER
      }
    });
  
    return payment;
  };