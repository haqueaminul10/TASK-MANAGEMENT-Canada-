const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("kitchen", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
