const mongoose = require("mongoose");

// Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function (date) {
        return !date || date > new Date();
      },
      message: "Due date must be in the future",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export Task model
const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;
