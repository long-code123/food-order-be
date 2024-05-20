const dbConfig = require('../configs/db.config.js')


module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define('Admin', {
      adminId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      adminName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true // Đảm bảo rằng mỗi email chỉ được sử dụng cho một tài khoản admin duy nhất
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return Admin;
  };
  