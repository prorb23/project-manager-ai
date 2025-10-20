// frontend/src/components/Column.jsx
import { useState } from 'react';
import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import './KanbanBoard.css';

const Column = ({
  column,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  onAskAI
  // Removed selection props
}) => {
  const { setNodeRef } = useDroppable({ id: column.title });
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const handleFormSubmit = (e) => {
    e.preventDefault(); if (!taskTitle.trim()) return;
    onAddTask(taskTitle, column.title); setTaskTitle(''); setShowAddTaskForm(false);
  };
  return (
    <div ref={setNodeRef} className="kanban-column">
      <h3>{column.title}</h3>
      <div className="column-cards">
        <SortableContext id={column.title} items={column.tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
          {column.tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
              onAskAI={onAskAI}
              // Removed selection props
            />
          ))}
        </SortableContext>
      </div>
      {showAddTaskForm ? (
        <form onSubmit={handleFormSubmit} className="add-task-form">
          <textarea className="task-input" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Enter a title for this card..." autoFocus />
          <div className="form-controls">
            <button type="submit" className="submit-btn">Add card</button>
            <button type="button" className="cancel-btn" onClick={() => setShowAddTaskForm(false)}>✕</button>
          </div>
        </form>
      ) : (
        <button className="add-task-btn" onClick={() => setShowAddTaskForm(true)}>+ Add a card</button>
      )}
    </div>
  );
};
export default Column;