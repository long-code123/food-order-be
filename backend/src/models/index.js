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
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.reviewfood = require("./reviewfood.model.js")(sequelize, Sequelize);
db.reviewstore = require("./reviewstore.model.js")(sequelize, Sequelize);
db.reviewshipper = require("./reviewshipper.model.js")(sequelize, Sequelize);
db.stores = require("./store.model.js")(sequelize, Sequelize);
db.voucher = require("./voucher.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.payment = require("./payment.model.js")(sequelize, Sequelize);
db.foodquantity = require("./foodquantity.model.js")(sequelize, Sequelize);
db.shippers = require("./shipper.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

db.sequelize.authenticate((err) => {
  if (err) {
      console.log("Unable to connect to the database: " + err.message);
  } else {
      console.log('Connection has been established successfully.');
  }
})
module.exports = db;