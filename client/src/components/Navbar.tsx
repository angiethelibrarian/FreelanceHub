import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar: React.FC = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation(); 

  // function to check user is logged in...
  const checkLogin = () => {
    setLoginCheck(auth.loggedIn());
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const toggleMenu = () => {
    console.log('MENU OPEN????', menuOpen)
    setMenuOpen(!menuOpen);
    // menuOpen ? setMenuOpen(false): setMenuOpen(true)
  };

  const handleLogout = () => {
    auth.logout();
    setLoginCheck(false); // Update login status after logout
    setMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // document.body.classList.toggle('dark-mode', !darkMode);
  }

  return (
    <div className="nav-container">
      {/* <button className="hamburger" onClick={toggleMenu} onBlur={toggleMenu}>
        Menu <span>&#9776;</span>
      </button> */}
      {loginCheck ? (
            <>
              <Link to="/profile" onClick={toggleMenu} className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link>
              <button type='button' onClick={handleLogout}>Logout</button>
              <button onClick={toggleDarkMode}>
                {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </>
          ) : (
            <Link to="/login" onClick={toggleMenu} className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
          )}
      {/* {menuOpen && (
        <div className="dropdown-menu show">
          {loginCheck ? (
            <>
              <Link to="/profile" onClick={toggleMenu} className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link>
              <button type='button' onClick={handleLogout}>Logout</button>
              <button onClick={toggleDarkMode}>
                {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </>
          ) : (
            <Link to="/login" onClick={toggleMenu} className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Navbar;