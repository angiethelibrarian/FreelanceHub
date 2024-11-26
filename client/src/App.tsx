import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {

  return (
    <div className='container'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App


import React from 'react';
import { Button } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Welcome to React-Bootstrap with TypeScript</h1>
      <Button variant="primary" onClick={() => alert('Button clicked!')}>
        Click Me
      </Button>
    </div>
  );
};

export default App;