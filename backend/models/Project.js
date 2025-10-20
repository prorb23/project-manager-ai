import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
  // 'name' field configuration
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date, 
    default: Date.now,
  },
});
const Project = mongoose.model('Project', projectSchema);
export default Project;