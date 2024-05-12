const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define("order", {
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