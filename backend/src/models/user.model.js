const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define("users", {
      userName: {
        type: Sequelize.STRING
      },
      userImage: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return users;
  };