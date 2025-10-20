import express from 'express';
import { getProjects, createProject, updateProject,deleteProject} from '../controllers/projectController.js';
import { getTasksByProject } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject);
router.get('/:projectId/tasks', getTasksByProject);
router.route('/:projectId')
  .put(updateProject)      
  .delete(deleteProject);

export default router;