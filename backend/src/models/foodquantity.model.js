const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const foodquantity = sequelize.define("foodquantity", {
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