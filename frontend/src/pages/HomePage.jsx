import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects, createProject, updateProject, deleteProject } from '../services/api';
import ProjectModal from '../components/ProjectModal';
import './HomePage.css'; // Import the new CSS file

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const response = await fetchProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        alert('Error: Could not load projects.');
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  const handleSaveProject = async (projectId, projectData) => {
    try {
      if (projectId) {
        const response = await updateProject(projectId, projectData);
        setProjects(currentProjects =>
          currentProjects.map(p => (p._id === projectId ? response.data : p))
        );
      } else {
        const response = await createProject(projectData);
        setProjects(currentProjects => [response.data, ...currentProjects]);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save project:", error);
      alert(`Error: Could not ${projectId ? 'update' : 'create'} the project. Please try again.`);
    }
  };

  const handleDeleteProject = async (projectIdToDelete) => {
    if (window.confirm('Are you sure you want to delete this project and all its tasks? This action cannot be undone.')) {
      try {
        await deleteProject(projectIdToDelete);
        setProjects(currentProjects => currentProjects.filter(p => p._id !== projectIdToDelete));
      } catch (error) {
        console.error("Failed to delete project:", error);
        alert('Error: Could not delete the project. Please try again.');
      }
    }
  };

  const openModal = (project = null) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setProjectToEdit(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Projects</h1>
        <button onClick={() => openModal()} className="create-project-btn">
          + Create New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="no-projects-message">No projects found. Click "Create New Project" to add one!</p>
      ) : (
        <div className="projects-grid"> {/* Changed ul to div with grid class */}
          {projects.map((project) => (
            <div key={project._id} className="project-board-card"> {/* Changed li to div */}
              <Link to={`/project/${project._id}`} className="project-link">
                <h2>{project.name}</h2>
                {/* Removed description and date for cleaner card */}
              </Link>
              <div className="project-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(project);
                  }}
                  className="project-action-btn"
                  title="Edit Project"
                >
                  ✏️
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project._id);
                  }}
                  className="project-action-btn"
                  title="Delete Project"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveProject}
        project={projectToEdit}
      />
    </div>
  );
};
export default HomePage;
