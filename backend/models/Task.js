// backend/models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'], // The status must be one of these values
    default: 'To Do',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId, // This field will store a Project's ID
    ref: 'Project', // Establishes a relationship to the Project model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;