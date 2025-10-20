// frontend/src/components/TaskCard.jsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task, onDeleteTask, onUpdateTask, onAskAI }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task._id });

  // Style for drag animation and visual feedback
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1, // Slightly transparent when dragging
    boxShadow: isDragging ? '0px 4px 12px rgba(0, 0, 0, 0.2)' : '0 1px 1px rgba(9, 30, 66, 0.25)', // More pronounced shadow when dragging
  };

  // Prevent drag listeners from interfering with button clicks
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  // Handlers for action buttons
  const handleEditClick = (event) => {
    event.stopPropagation();
    onUpdateTask(task); // Opens the edit modal
  };
  const handleAskAI = (event) => {
    event.stopPropagation();
    onAskAI(task);
  };
  const handleDelete = (event) => {
    event.stopPropagation();
    onDeleteTask(task._id);
  };

  return (
    // Attach drag listeners to the main div
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} // Apply drag listeners here
      className="task-card" // Base class
      // onClick={() => onUpdateTask(task)} // Optional: Make card click open edit modal too
    >
      {/* Task Title */}
      <p>{task.title}</p>

      {/* Action buttons (Appear on hover) */}
      <div className="task-actions">
        <button
          onPointerDown={stopPropagation}
          onClick={handleAskAI}
          className="task-action-button"
          title="Ask AI"
        >
          {/* SVG Question Mark Icon */}
          <svg fill="currentColor" viewBox="0 0 16 16" width="1em" height="1em"><path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m.5-10.25a.75.75 0 0 0-1.5 0v.254a1.93 1.93 0 0 0-.877 1.18c-.176.38.038.835.419.986l.004.002c.31.124.688.034.9-.176.136-.136.21-.326.21-.527a.75.75 0 0 0-1.498-.056c-.001.018-.002.037-.002.056v.254a.5.5 0 0 0 .5.5h.75a.5.5 0 0 0 .5-.5V7.75a2.5 2.5 0 0 0-4.665-1.419A.75.75 0 0 0 5 6.44v.31a.75.75 0 0 0 1.5 0V6.5a1 1 0 1 1 2 0v.25ZM8 11.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path></svg>
        </button>
        <button
          onPointerDown={stopPropagation}
          onClick={handleEditClick}
          className="task-action-button"
          title="Edit Task"
        >
          {/* SVG Edit Icon */}
          <svg fill="currentColor" viewBox="0 0 16 16" width="1em" height="1em"><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25a1.75 1.75 0 0 1 .445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Z"></path></svg>
        </button>
        <button
          onPointerDown={stopPropagation}
          onClick={handleDelete}
          className="task-action-button" // No special delete class needed now
          title="Delete Task"
        >
          {/* SVG Trash Can Icon */}
          <svg fill="currentColor" viewBox="0 0 16 16" width="1em" height="1em"><path fillRule="evenodd" d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75M4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.75 1.75 0 0 1 10.596 15H5.404a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15M6.5 7.75a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75m2.5 0a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;