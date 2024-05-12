const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const reviewshipper = sequelize.define("reviewshipper", {
      rating: {
        type: Sequelize.DOUBLE
      },
      comment: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      shipperId: {
        type: Sequelize.INTEGER
      }
    });
  
    return reviewshipper;
  };