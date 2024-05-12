const dbConfig = require("../configs/db.config.js");
console.log('abc')
const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// })
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.foods = require("./food.model.js")(sequelize, Sequelize);
db.sequelize.authenticate((err) => {
  if (err) {
      console.log("Unable to connect to the database: " + err.message);
  } else {
      console.log('Connection has been established successfully.');
  }
})
module.exports = db;