// App.tsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Modal from './components/Modal';

// Define an interface for the project
interface Project {
   name: string;
   budget: number;
   status: string;
}

function App() {
   const [projects, setProjects] = useState<Project[]>([]); // Use the Project interface
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
         </footer>
      </>
   );
}

export default App;