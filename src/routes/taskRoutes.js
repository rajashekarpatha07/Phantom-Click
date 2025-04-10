const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getAnalytics,
} = require('../controllers/taskController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.use(authMiddleware); // Apply auth middleware to all task routes
router.post('/', createTask);
router.get('/', getTasks);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);
router.get('/analytics', getAnalytics);

module.exports = router;