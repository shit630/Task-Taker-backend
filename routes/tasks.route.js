const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const TaskRouter = express.Router();

TaskRouter.get("/", getTasks);
TaskRouter.post("/", createTask);

TaskRouter.put("/:id", updateTask);
TaskRouter.delete("/:id", deleteTask);

module.exports = TaskRouter;
