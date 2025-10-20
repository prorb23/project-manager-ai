// frontend/src/components/EditTaskModal.jsx
import { useState, useEffect } from 'react';
import './Modal.css';

const EditTaskModal = ({ task, isOpen, onClose, onSave }) => {
  const [editedTitle, setEditedTitle] = useState('');
  // 1. Add state for description
  const [editedDescription, setEditedDescription] = useState('');

  // 2. Pre-fill both title and description
  useEffect(() => {
    if (task) {
      setEditedTitle(task.title);
      setEditedDescription(task.description || ''); // Handle cases where description might be initially undefined
    } else {
      setEditedTitle('');
      setEditedDescription('');
    }
  }, [task, isOpen]); // Rerun if task or isOpen changes

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    // 3. Include description in the saved data
    onSave(task._id, { title: editedTitle, description: editedDescription });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Task</h2>
        {/* Title Input */}
        <div style={{ marginBottom: '15px' }}>
           <label htmlFor="taskTitleEdit" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
           <input
             id="taskTitleEdit"
             type="text"
             value={editedTitle}
             onChange={(e) => setEditedTitle(e.target.value)}
             className="modal-textarea" // Reusing class, adjust CSS if needed
             style={{ height: '30px' }}
             required
           />
        </div>

        {/* 4. Add Description Textarea */}
        <div style={{ marginBottom: '15px' }}>
           <label htmlFor="taskDescEdit" style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
           <textarea
             id="taskDescEdit"
             value={editedDescription}
             onChange={(e) => setEditedDescription(e.target.value)}
             className="modal-textarea"
             placeholder="Add a more detailed description..."
             style={{ height: '80px' }} // Adjust height as needed
           />
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={onClose} className="cancel-btn-modal">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;