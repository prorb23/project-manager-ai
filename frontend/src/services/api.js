// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001' });

export const fetchProjects = () => API.get('/api/projects');

export const createProject = (projectData) => API.post('/api/projects', projectData);

export const updateProject = (projectId, projectData) => API.put(`/api/projects/${projectId}`, projectData);

export const deleteProject = (projectId) => API.delete(`/api/projects/${projectId}`);

export const fetchTasksForProject = (projectId) => API.get(`/api/projects/${projectId}/tasks`);

export const updateTaskStatus = (taskId, status) => API.put(`/api/tasks/${taskId}/move`, { status });

export const createTask = (newTaskData) => API.post('/api/tasks', newTaskData);

export const updateTask = (taskId, taskData) => API.put(`/api/tasks/${taskId}`, taskData);

export const deleteTask = (taskId) => API.delete(`/api/tasks/${taskId}`);

export const summarizeProject = (projectId) => API.post('/api/ai/summarize', { projectId });

export const askTaskQuestion = (taskId, question) => API.post('/api/ai/ask', { taskId, question });