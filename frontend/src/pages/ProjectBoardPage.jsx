// frontend/src/pages/ProjectBoardPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DndContext, closestCorners } from '@dnd-kit/core';
import KanbanBoard from '../components/KanbanBoard';
import EditTaskModal from '../components/EditTaskModal';
import AskAIModal from '../components/AskAIModal';
import {
  fetchTasksForProject,
  updateTaskStatus,
  createTask,
  deleteTask,
  updateTask,
  summarizeProject,
  askTaskQuestion
} from '../services/api';

const ProjectBoardPage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTaskForEdit, setSelectedTaskForEdit] = useState(null);
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [selectedTaskForAsk, setSelectedTaskForAsk] = useState(null);
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);


  // Fetch tasks on initial load or when projectId changes
  useEffect(() => {
    const getTasks = async () => {
      try {
        setLoading(true);
        const response = await fetchTasksForProject(projectId);
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        alert('Error: Could not load tasks for this project.');
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, [projectId]);

  // Handle drag and drop completion
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return; // Dropped outside a valid area
    const taskId = active.id;
    const originalTask = tasks.find(t => t._id === taskId);
    if (!originalTask) return; // Task not found

    // Determine the target column ID
    const newStatus = over.data.current?.sortable?.containerId || over.id;
    const validStatuses = ['To Do', 'In Progress', 'Done'];

    // Check if the drop target is a valid column and different from original
    if (!validStatuses.includes(newStatus) || newStatus === originalTask.status) {
      return;
    }

    // Optimistic UI update
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // API Call to persist change
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error("Failed to update task status via API:", error);
      alert('Error: Could not save task move. Reverting change.');
      // Revert UI on failure
      setTasks(currentTasks =>
        currentTasks.map(task =>
          task._id === taskId ? { ...task, status: originalTask.status } : task
        )
      );
    }
  };

  // Handle creating a new task
  const handleAddTask = async (title, status) => {
    try {
      const newTaskData = { title, projectId, status };
      const response = await createTask(newTaskData);
      setTasks(currentTasks => [...currentTasks, response.data]);
    } catch (error) {
      console.error("Failed to create task:", error);
      alert('Error: Could not create the task. Please try again.');
    }
  };

  // Handle deleting a single task (from hover action)
 const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        // Only update the tasks list, remove selection logic
        setTasks(currentTasks => currentTasks.filter(task => task._id !== taskId));
        // setSelectedTaskIds(prev => prev.filter(id => id !== taskId)); // <-- DELETE THIS LINE
      } catch (error) {
        console.error("Failed to delete task:", error);
        alert('Error: Could not delete the task. Please try again.');
      }
    }
  };

  // Handle saving updates from the Edit Task modal
  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const response = await updateTask(taskId, updatedData);
      setTasks(currentTasks =>
        currentTasks.map(task =>
          task._id === taskId ? response.data : task
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Failed to update task:", error);
      alert('Error: Could not update the task. Please try again.');
    }
  };

  // Open the Edit Task modal
  const openEditModal = (task) => {
    setSelectedTaskForEdit(task);
    setIsEditModalOpen(true);
  };

  // Close the Edit Task modal
  const closeEditModal = () => {
    setSelectedTaskForEdit(null);
    setIsEditModalOpen(false);
  };

  // Handle clicking the Summarize Project button
  const handleSummarize = async () => {
    setSummaryLoading(true);
    setSummary('');
    try {
      const response = await summarizeProject(projectId);
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Failed to get summary:", error);
      setSummary('Could not generate summary.');
      alert('Error: Could not generate project summary.');
    } finally {
      setSummaryLoading(false);
    }
  };

  // Open the Ask AI modal
  const openAskAIModal = (task) => {
    setSelectedTaskForAsk(task);
    setAiAnswer(''); // Clear previous answer
    setIsAskModalOpen(true);
  };

  // Close the Ask AI modal
  const closeAskAIModal = () => {
    setSelectedTaskForAsk(null);
    setIsAskModalOpen(false);
  };

  // Handle submitting a question to the Ask AI modal
  const handleAskAIQuestion = async (taskId, question) => {
    setAiLoading(true);
    setAiAnswer('');
    try {
      const response = await askTaskQuestion(taskId, question);
      setAiAnswer(response.data.answer);
    } catch (error) {
      console.error("Failed to get AI answer:", error);
      setAiAnswer('Sorry, I could not get an answer.');
      alert('Error: Could not get an answer from the AI.');
    } finally {
      setAiLoading(false);
    }
  };

  
  // Render loading state if tasks haven't loaded yet
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  // Main component render
  return (
    <>
      {/* Top action bar */}
      <div style={{
        padding: '8px 10px',
        display: 'flex',          // Use flexbox for layout
        alignItems: 'flex-start', // Align items to the top to handle multi-line summary
        justifyContent: 'space-between', // Keep space between left/right sides
        minHeight: '40px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        gap: '15px' // Add space between elements if needed
      }}>
        {/* Container for button and summary */}
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, minWidth: 0 }}> {/* Allow this container to grow and wrap text */}
          <button
            onClick={handleSummarize}
            disabled={summaryLoading}
            style={{
              padding: '6px 10px',
              cursor: 'pointer',
              backgroundColor: 'rgba(255,255,255,0.3)',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              marginRight: '10px',
              flexShrink: 0 // Prevent button from shrinking
            }}
          >
            {summaryLoading ? 'Generating...' : '🤖 Summarize'}
          </button>

          {/* Display area for summary text */}
          {summary && !summaryLoading && (
            // Changed span to p and added wrapping styles
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontStyle: 'italic',
              fontSize: '13px',
              margin: 0, // Reset default paragraph margin
              borderLeft: '2px solid rgba(255,255,255,0.5)',
              paddingLeft: '10px',
              lineHeight: '1.4',
              whiteSpace: 'pre-wrap', // Allows text to wrap
              wordBreak: 'break-word'  // Breaks long words if necessary
            }}>
              {summary} {/* Display full summary */}
            </p>
          )}
          {/* Show loading text */}
          {summaryLoading && (
             <span style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', fontSize: '13px' }}>Generating summary...</span>
          )}
        </div>
         {/* Delete selected button removed */}
      </div>

      {/* Drag and Drop Context wrapping the board */}
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <KanbanBoard
          tasks={tasks}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask} // Still needed for single delete
          onUpdateTask={openEditModal}   // Still needed for edit icon
          onAskAI={openAskAIModal}       // Still needed for ask AI icon
          // Removed selection props
        />
      </DndContext>

      {/* Modals rendered outside the DndContext */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={handleUpdateTask}
        task={selectedTaskForEdit}
      />
      <AskAIModal
        isOpen={isAskModalOpen}
        onClose={closeAskAIModal}
        onAsk={handleAskAIQuestion}
        task={selectedTaskForAsk}
        answer={aiAnswer}
        loading={aiLoading}
      />
    </>
  );
}

export default ProjectBoardPage;