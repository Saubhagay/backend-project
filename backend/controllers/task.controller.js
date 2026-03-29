const Task = require("../models/task.model");

const createTask = async (req, res) => {
  const { title, description, status, priority } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    user: req.user._id,
  });

  res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  res.json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await task.deleteOne();
  res.json({ message: "Task deleted" });
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
