import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={user?.role === 'Owner' ? '/dashboard' : '/'} className="nav-logo">RentEase</Link>
        <ul className="nav-menu">
          {!user && (
            <>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/properties" className="nav-link">Properties</Link></li>
              <li><Link to="/login" className="nav-link nav-btn">Login</Link></li>
            </>
          )}

          {user?.role === 'Tenant' && (
            <>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/properties" className="nav-link">Properties</Link></li>
              <li><button onClick={handleLogout} className="nav-link nav-btn logout-btn">Logout</button></li>
            </>
          )}

          {user?.role === 'Owner' && (
            <>
              <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
              <li><Link to="/notifications" className="nav-link">Notifications</Link></li>
              <li><button onClick={handleLogout} className="nav-link nav-btn logout-btn">Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
