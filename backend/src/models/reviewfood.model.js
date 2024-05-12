const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const reviewfood = sequelize.define("reviewfood", {
      rating: {
        type: Sequelize.DOUBLE
      },
      comment: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      foodId: {
        type: Sequelize.INTEGER
      }
    });
  
    return reviewfood;
  };