const express = require(`express`);
const app = express();
app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

//DB
const sequelize = require("./config/db.connection.js");
const userModel = require("./models/user.model.js");
const taskModel = require("./models/task.model.js");
//CONTROLLERS
const user = require("./controllers/user.controller.js");
const task = require("./controllers/task.controller.js");
const middleware = require("./middlewares/authMiddleware.js");
app.post("/register", user.register);
app.post("/login", user.login);
app.post("/addtask", middleware.verifyToken, task.addtask);
app.get("/tasks", middleware.verifyToken, task.getTask);
app.put("/update/:taskId", middleware.verifyToken, task.updateTask);
app.delete("/delete/:taskId", middleware.verifyToken, task.deleteTask);

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
