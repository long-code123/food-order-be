const dbConfig = require('../configs/db.config.js')

module.exports = (sequelize, Sequelize) => {
  const shippers = sequelize.define('shippers', {
    shipperId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    shipperName: {
      type: Sequelize.STRING
    },
    shipperImage: {
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
  })

  return shippers
}
