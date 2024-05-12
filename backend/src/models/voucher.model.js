const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const voucher = sequelize.define("voucher", {
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
        type: Sequelize.INTEGER
      }
    });
  
    return voucher;
  };