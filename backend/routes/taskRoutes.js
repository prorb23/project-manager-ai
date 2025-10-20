import express from 'express';
import {
  createTask,
  updateTaskStatus,
  updateTask, // Import updateTask
  deleteTask  // Import deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.put('/:taskId/move', updateTaskStatus);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

export default router;