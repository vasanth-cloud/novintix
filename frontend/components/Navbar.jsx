import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Job Portal
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/jobs" className="nav-link">Browse Jobs</Link>
          </li>
          {user ? (
            <>
              {user.role === 'company' ? (
                <>
                  <li className="nav-item">
                    <Link to="/post-job" className="nav-link">Post Job</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/my-jobs" className="nav-link">My Jobs</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/my-applications" className="nav-link">My Applications</Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link">Welcome, {user.username}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link btn-logout">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link btn-signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
