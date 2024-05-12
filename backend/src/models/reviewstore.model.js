const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const reviewstore = sequelize.define("reviewstore", {
      rating: {
        type: Sequelize.DOUBLE
      },
      comment: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      storeId: {
        type: Sequelize.INTEGER
      }
    });
  
    return reviewstore;
  };