const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const Foods = sequelize.define("foods", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Foods;
  };