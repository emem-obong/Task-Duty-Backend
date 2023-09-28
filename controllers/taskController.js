const Task = require("../models/task");
const validateId = require("../utils/validateID");

//CRUD
const getAllTask = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  const { title, description, tag } = req.body;

  if (!title) {
    return res.status(400).json({ message: "please provide a title " });
  }
  if (!description) {
    return res.status(400).json({ message: "please provide a description " });
  }
  if (!tag) {
    return res.status(400).json({ message: "please provide a tag " });
  }
  const task = await Task.create(req.body);
  res.status(201).json({
    message: "Task created successfully",
    newTask: task,
  });
};

const editTask = async (req, res) => {
  const { id } = req.params;
  if (!validateId(id)) {
    return res.status(400).json({ message: `ID:${id} is not valid` });
  }
  const task = await Task.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!task) {
    return res.status(404).json({ message: `No Task with ID:${id}` });
  }
  res.status(200).json({ message: "task updated successfully" });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!validateId(id)) {
    return res.status(400).json({ message: `ID:${id} is not valid` });
  }
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    return res.status(404).json({ message: `No Task with ID:${id}` });
  }
  res.status(200).json({ message: "task deleted successfully" });
};

const eachTask = async (req, res) => {
  const { id } = req.params;

  if (!validateId(id)) {
    return res.status(400).json({ message: `ID:${id} is not valid` });
  }
  const task = await Task.findOne({ _id: id });
  if (!task) {
    return res.status(404).json({ message: `No Task with ID:${id}` });
  }
  res.status(200).json({ task });
};

module.exports = {
  getAllTask,
  createTask,
  editTask,
  deleteTask,
  eachTask,
};
