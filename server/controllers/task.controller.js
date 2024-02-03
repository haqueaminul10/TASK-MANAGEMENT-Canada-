const Task = require("../models/task.model");
const addtask = async (req, res) => {
  try {
    const { task_title, task_body, status } = req.body;
    const userId = req.user.userId;
    const newTask = await Task.create({
      userId,
      task_title,
      task_body,
      status,
    });
    res.json({ message: "task created", newTask });
  } catch (err) {
    console.log(err);
  }
};
const getTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await Task.findAll({ where: { userId } });

    res.json({ tasks });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { task_title, task_body, status } = req.body;

    const task = await Task.findOne({ where: { id: taskId } });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.userId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    await Task.update(
      { task_title, task_body, status },
      { where: { id: taskId } }
    );
    const updatedTask = await Task.findOne({ where: { id: taskId } });
    res.json({ message: "Task updated", updatedTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findOne({ where: { id: taskId } });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.userId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await Task.destroy({ where: { id: taskId } });

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addtask, getTask, updateTask, deleteTask };
