// import { Outlet } from 'react-router-dom';

// import Navbar from './components/Navbar';

// function App() {

//   return (
//     <>
//       <header>
//         <h1>FullStack Forum</h1>
//       </header>
//       <Navbar />
//       <Outlet />
//       <footer className="footer">
//           &copy; 2024 FullStack Forum. All rights reserved.
//       </footer>
//     </>
//   )
// }

// export default App

// import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Modal from './components/Modal';
//import './.css'; // custom CSS for styling

function App() {
    const [projects, setProjects] = useState([] as any[]);
    const [isModalOpen, setModalOpen] = useState(false);
  
    //hooks
     const addProject = (project: any) => {
        setProjects([...projects, project]);
        // setProjects(prevProjects => [...prevProjects].push(project));
        setModalOpen(false);
    
  };
  
    return (
        <>
      <header>
   < h1 > FullStack Forum</h1 >
          </header >
      
   < Navbar />
    
   < div className = "project-list" >
     < h2 > Projects</h2 >
              {
        projects.map((project, index) => (
           < div key = { index } className = "project" >
           < p > <strong>Project:</strong> { project.name }</p >
           < p > <strong>Budget:</strong> ${ project.budget }</p >
           < p > <strong>Status:</strong> { project.status }</p >
                  </div >
        ))
  }
   < button onClick = {() => setModalOpen(true)
}> + New Project</button >
        </div >
  
      {
  isModalOpen && (
     < Modal onClose = {() => setModalOpen(false)
} onAddProject = { addProject } />
        )}

 < footer className = "footer" >
   & copy; 2024 FullStack Forum.All rights reserved.
      </footer >
      </>
      );
}

export default App;



// import React from 'react';
// import { Button } from 'react-bootstrap';

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <h1>Welcome to React-Bootstrap with TypeScript</h1>
//       <Button variant="primary" onClick={() => alert('Button clicked!')}>
//         Click Me
//       </Button>
//     </div>
//   );
// };

// export default App;