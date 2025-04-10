const Task = require('../models/Task.js');
const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('pending', 'completed'),
  priority: Joi.string().valid('low', 'medium', 'high'),
  dueDate: Joi.date().allow(null),
  labels: Joi.array().items(Joi.string()),
});

const createTask = async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const task = await Task.create({ ...req.body, userId: req.user.id });
  res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const { status, priority, dueDate, page = 1, limit = 10 } = req.query;

  const query = { userId: req.user.id };
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (dueDate === 'overdue') query.dueDate = { $lt: new Date() };
  if (dueDate === 'today') query.dueDate = { $gte: new Date(), $lt: new Date().setHours(23, 59, 59, 999) };
  if (dueDate === 'upcoming') query.dueDate = { $gt: new Date() };

  const tasks = await Task.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  res.json(tasks);
};

const updateTask = async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const task = await Task.findOneAndUpdate(
    { _id: req.params.taskId, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ error: 'Task not found or unauthorized' });

  res.json(task);
};

const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.taskId, userId: req.user.id });
  if (!task) return res.status(404).json({ error: 'Task not found or unauthorized' });

  res.json({ message: 'Task deleted' });
};

const getAnalytics = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });

  const analytics = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter((t) => t.status === 'completed').length,
    overdueTasks: tasks.filter((t) => t.dueDate && t.dueDate < new Date() && t.status !== 'completed').length,
    tasksPerLabel: tasks.reduce((acc, t) => {
      t.labels.forEach((label) => (acc[label] = (acc[label] || 0) + 1));
      return acc;
    }, {}),
  };

  res.json(analytics);
};

module.exports = { createTask, getTasks, updateTask, deleteTask, getAnalytics };