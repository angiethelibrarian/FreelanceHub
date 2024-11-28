import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [ loginCheck, setLoginCheck ] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck])

  const toggleMenu = () => {
    console.log("TOGGLE MENU HERE");
  }

  return (
    <div className="nav-container">
      <button className="hamburger" onClick={toggleMenu}>
        Menu <span>&#9776;</span>
      </button>
      <nav id="navbar">
        <Link to='/profile'>Profile</Link>
        <Link to='/settings'>Settings</Link>
        {
        !loginCheck ? (
          <Link to='/login'>Login</Link>
        ) : (
          <button type='button' onClick={() => {
            auth.logout();
          }}>Logout</button>
        )
      }
      </nav>
    </div>
    // <div className='nav'>
    //   <div className='nav-title'>
    //     <Link to='/'>Krazy Kanban Board</Link>
    //   </div>
    //   <ul>
      
    //   </ul>
    // </div>
  )
}

export default Navbar;
