// backend/controllers/taskController.js
import Task from '../models/Task.js';
import Project from '../models/Project.js'; // Ensure Project is imported if needed

// @desc    Get all tasks for a specific project
// @route   GET /api/projects/:projectId/tasks
export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(`Error fetching tasks for project ${req.params.projectId}:`, error);
    res.status(500).json({ message: 'Server Error fetching tasks' });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req, res) => {
  const { title, description, projectId, status } = req.body;

  if (!title || !projectId) {
    return res.status(400).json({ message: 'Title and Project ID are required' });
  }

  try {
    // Check if the project exists before creating the task
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      console.log(`Attempted to create task for non-existent project: ${projectId}`);
      return res.status(404).json({ message: 'Project not found' });
    }

    const newTask = new Task({
      title,
      description,
      project: projectId,
      status: status || 'To Do', // Default to 'To Do' if status not provided
    });

    const savedTask = await newTask.save();
    console.log(`Task created successfully: ${savedTask._id}`);
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(`Error creating task:`, error);
    res.status(500).json({ message: 'Server Error creating task' });
  }
};

// @desc    Update a task's status (used for drag-and-drop)
// @route   PUT /api/tasks/:taskId/move
export const updateTaskStatus = async (req, res) => {
  const { status } = req.body; // Get the new status from the request body
  const { taskId } = req.params; // Get the task's ID from the URL

  console.log(`--- Received request to move task ${taskId} to status: ${status} ---`);

  // Validate the incoming status
  if (!status) {
    console.log('Error: Status is missing in request body.');
    return res.status(400).json({ message: 'Status is required' });
  }
  const validStatuses = ['To Do', 'In Progress', 'Done']; // Define valid statuses
  if (!validStatuses.includes(status)) {
     console.log(`Error: Invalid status value: ${status}`);
     return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    console.log(`Attempting to find and update task ${taskId}...`);

    // Find the task by its ID and update its status field
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status: status }, // Update the status field
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      console.log(`Error: Task with ID ${taskId} not found.`);
      return res.status(404).json({ message: 'Task not found' });
    }

    console.log(`Success: Task ${taskId} updated successfully. New status: ${updatedTask.status}`);
    res.status(200).json(updatedTask); // Send back the updated task
  } catch (error) {
    console.error(`Error during task status update for ${taskId}:`, error);
    res.status(500).json({ message: 'Server Error during task status update' });
  }
};

// @desc    Update a task's details (title, description)
// @route   PUT /api/tasks/:taskId
export const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const { taskId } = req.params;

  console.log(`--- Received request to update task ${taskId} ---`);

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      console.log(`Error: Task with ID ${taskId} not found for update.`);
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update fields only if they are provided in the request body
    if (title !== undefined) {
      task.title = title;
    }
    if (description !== undefined) {
      task.description = description;
    }

    const updatedTask = await task.save();
    console.log(`Success: Task ${taskId} updated successfully.`);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(`Error updating task details for ${taskId}:`, error);
    res.status(500).json({ message: 'Server Error updating task details' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:taskId
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  console.log(`--- Received request to delete task ${taskId} ---`);

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      console.log(`Error: Task with ID ${taskId} not found for deletion.`);
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    console.log(`Success: Task ${taskId} deleted successfully.`);
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    console.error(`Error deleting task ${taskId}:`, error);
    res.status(500).json({ message: 'Server Error deleting task' });
  }
};