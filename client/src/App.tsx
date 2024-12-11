// App.tsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import './index.css'; // Make sure this is included
import { Outlet } from 'react-router-dom';

// Define an interface for the project
interface Project {
   name: string;
   budget: number;
   status: string;
}

function App() {
   const [projects, setProjects] = useState<Project[]>([]); // Use proj interface
   const [isModalOpen, setModalOpen] = useState(false);

   // Hook to add a new project
   const addProject = (project: Project) => {
      setProjects([...projects, project]);
      setModalOpen(false);
   };

   return (
      <>
         <header>
            <h1>FullStack Forum</h1>
         </header>
         <Navbar />
         <div>
            <Outlet />
         </div>
         <div className="project-list">
            <h3>Projects</h3>
            {projects.map((project, index) => (
               <div key={index} className="project">
                  <p><strong>Project:</strong> {project.name}</p>
                  <p><strong>Budget:</strong> ${project.budget}</p>
                  <p><strong>Status:</strong> {project.status}</p>
               </div>
            ))}
         </div>

         {/* Fixed Button for New Project */}
         <button className="btn btn-primary new-project-button" onClick={() => setModalOpen(true)}>
            + New Project
         </button>

         {isModalOpen && (
            <Modal onClose={() => setModalOpen(false)} onAddProject={addProject} />
         )}

         <footer className="footer">
            &copy; 2024 FullStack Forum. All rights reserved.
            <p>
               <a href="https://github.com/raschill" target="_blank" rel="noopener noreferrer"> Rebecca Schilling</a>,
               <a href="https://github.com/angiethelibrarian" target="_blank" rel="noopener noreferrer"> Angelica Mora</a>,
               <a href="https://github.com/Aricah123" target="_blank" rel="noopener noreferrer"> Arica Hyman</a>,
               <a href="https://github.com/GabrielCisneros7811" target="_blank" rel="noopener noreferrer"> Gabriel Cisneros</a>,
               <a href="https://github.com/Saleen013" target="_blank" rel="noopener noreferrer"> Larry Martin</a>,
            </p>
         </footer>
      </>
   );
}

export default App;