// frontend/src/components/AskAIModal.jsx
import { useState } from 'react';
import './Modal.css'; // Reuse the same CSS

const AskAIModal = ({ task, isOpen, onClose, onAsk, answer, loading }) => {
  const [question, setQuestion] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleAsk = () => {
    if (question.trim()) {
      onAsk(task._id, question);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Ask AI about: {task?.title}</h2>

        <label htmlFor="ai-question">Your Question:</label>
        <textarea
          id="ai-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="modal-textarea"
          placeholder="e.g., What is the main goal of this task?"
          style={{ height: '60px', marginBottom: '15px' }}
        />

        <div className="modal-actions">
          <button onClick={handleAsk} disabled={loading} className="save-btn">
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>
          <button onClick={onClose} className="cancel-btn-modal">Close</button>
        </div>

        {answer && (
          <div className="ai-answer-area" style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <strong>AI Answer:</strong>
            <p style={{ whiteSpace: 'pre-wrap' }}>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskAIModal;