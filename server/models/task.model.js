const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.connection");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  task_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  task_body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("created", "ongoing", "finished"),
    defaultValue: "created",
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

module.exports = Task;
