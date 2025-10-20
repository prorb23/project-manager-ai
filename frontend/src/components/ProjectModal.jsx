// frontend/src/components/ProjectModal.jsx
import { useState, useEffect } from 'react';
import './Modal.css'; // Reuse existing modal CSS

// Renamed component, receives project data for editing
const ProjectModal = ({ isOpen, onClose, onSave, project }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const isEditing = !!project; // Determine if we are editing or creating

  // Pre-fill form if editing
  useEffect(() => {
    if (isEditing) {
      setName(project.name);
      setDescription(project.description);
    } else {
      // Reset form if creating (or opening after editing)
      setName('');
      setDescription('');
    }
  }, [project, isOpen]); // Rerun effect when project or isOpen changes

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert('Please provide both a name and description.');
      return;
    }
    // Pass back project ID if editing, otherwise just the data
    onSave(isEditing ? project._id : null, { name, description });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Change title based on mode */}
        <h2>{isEditing ? 'Edit Project' : 'Create New Project'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="projectName" style={{ display: 'block', marginBottom: '5px' }}>Project Name:</label>
            <input
              type="text"
              id="projectName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="modal-textarea"
              style={{ height: '30px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="projectDesc" style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
            <textarea
              id="projectDesc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="modal-textarea"
              style={{ height: '80px' }}
              required
            />
          </div>
          <div className="modal-actions">
            {/* Change button text based on mode */}
            <button type="submit" className="save-btn">{isEditing ? 'Save Changes' : 'Create Project'}</button>
            <button type="button" onClick={onClose} className="cancel-btn-modal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;