1. Install Postgres
2. Install library "pg" for Postgres
3. Set up the configuration for connecting to a PostgreSQL database from Node.js.
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "nguyenbalong",
    DB: "food_app",
    dialect: "postgres",
    pool:
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
4. Use the configuration settings to connect to PostgreSQL using libraries like Sequelize.
    const Sequelize = require("sequelize");
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

