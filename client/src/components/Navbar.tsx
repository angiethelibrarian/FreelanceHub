import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar: React.FC = () => {
    const [loginCheck, setLoginCheck] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Function to check if the user is logged in
    const checkLogin = () => {
        setLoginCheck(auth.loggedIn());
    };

    useEffect(() => {
        checkLogin();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        auth.logout();
        setLoginCheck(false); // Update login status after logout
    };

  return (
    <div className="nav-container">
      <button className="hamburger" onClick={toggleMenu}>
        Menu <span>&#9776;</span>
      </button>
      <nav id="navbar" className={menuOpen ? 'open' : 'closed'}>
        <div className="nav-title">
          <Link to="/">FullStack Forum</Link>
        </div>
        <ul>
          <li>
            <Link to='/profile' className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link>
          </li>
          <li>
            <Link to='/settings' className={location.pathname === '/settings' ? 'active' : ''}>Settings</Link>
          </li>
          {
            !loginCheck ? (
              <li>
                <Link to='/login' className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
              </li>
            ) : (
              <li>
                <button type='button' className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )
          }
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;



