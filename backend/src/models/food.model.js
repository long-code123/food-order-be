const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const Foods = sequelize.define("foods", {
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
        type: Sequelize.INTEGER
      },
      storeId: {
        type: Sequelize.INTEGER
      }
    });
  
    return Foods;
  };