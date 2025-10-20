// backend/controllers/projectController.js
import Project from '../models/Project.js';
import Task from '../models/Task.js';

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error); // Add logging
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: 'Please provide both a name and a description.' });
  }
  const newProject = new Project({ name, description });
  try {
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error); // Add logging
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateProject = async (req, res) => {
  const { projectId } = req.params; // Get ID from URL
  const { name, description } = req.body; // Get updated data from body

  // Basic validation
  if (!name && !description) {
    return res.status(400).json({ message: 'Please provide name or description to update.' });
  }

  try {
    // Find the project by ID and update it
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { name, description }, // Fields to update
      { new: true, runValidators: true } // Options: return the updated doc, run schema validation
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject); // Send back the updated project
  } catch (error) {
    console.error('Error updating project:', error); // Add logging
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    // 1. Find the project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // 2. Delete all tasks associated with this project
    await Task.deleteMany({ project: projectId });

    // 3. Delete the project itself
    await project.deleteOne(); // Use deleteOne() on the document

    res.status(200).json({ message: 'Project and associated tasks removed' });
  } catch (error) {
    console.error('Error deleting project:', error); // Add logging
    res.status(500).json({ message: 'Server Error' });
  }
};
