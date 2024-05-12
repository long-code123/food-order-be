const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const stores = sequelize.define("stores", {
      storeName: {
        type: Sequelize.STRING
      },
      storeImage: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      }
    });
  
    return stores;
  };