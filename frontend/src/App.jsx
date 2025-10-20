// frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import Header
import HomePage from './pages/HomePage';
import ProjectBoardPage from './pages/ProjectBoardPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header /> {/* Add Header */}
      <main> {/* Wrap routes in main for potential layout */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:projectId" element={<ProjectBoardPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;