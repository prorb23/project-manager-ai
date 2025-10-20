// frontend/src/components/KanbanBoard.jsx
import Column from './Column';
import './KanbanBoard.css';

const KanbanBoard = ({
  tasks,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  onAskAI
  // Removed selection props
}) => {
  const columns = ['To Do', 'In Progress', 'Done'];
  const tasksByColumn = columns.reduce((acc, col) => {
    acc[col] = tasks.filter(task => task.status === col);
    return acc;
  }, {});
  return (
    <div className="kanban-board-container">
      {columns.map(colName => (
        <Column
          key={colName}
          column={{ title: colName, tasks: tasksByColumn[colName] || [] }}
          onAddTask={onAddTask}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
          onAskAI={onAskAI}
          // Removed selection props
        />
      ))}
    </div>
  );
};

export default KanbanBoard;