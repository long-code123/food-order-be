const dbConfig = require('../configs/db.config.js')

module.exports = (sequelize, Sequelize) => {
  const Categories = sequelize.define('categories', {
    categoryId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    categoryName: {
      type: Sequelize.STRING
    },
    categoryImage: {
      type: Sequelize.STRING
    }
  })

  return Categories
}
