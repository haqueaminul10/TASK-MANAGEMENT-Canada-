const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.connection");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactnumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Models synchronized successfully");
  })
  .catch((err) => {
    console.error("Error synchronizing models:", err);
  });

module.exports = User;
