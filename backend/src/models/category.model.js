const dbConfig = require("../configs/db.config.js");

module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("categories", {
      categoryName: {
        type: Sequelize.STRING
      },
      categoryImage: {
        type: Sequelize.STRING
      },
    });
  
    return Categories;
  };