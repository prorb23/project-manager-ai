// backend/routes/aiRoutes.js
import express from 'express';
import {
  summarizeProjectTasks,
  answerTaskQuestion
} from '../controllers/aiController.js';

const router = express.Router();

router.post('/summarize', summarizeProjectTasks);
router.post('/ask', answerTaskQuestion);

export default router;