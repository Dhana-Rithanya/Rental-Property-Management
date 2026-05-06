import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  useLocation(); // triggers re-render on route change to keep nav in sync
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = localStorage.getItem("userType");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>RentEase</h2>
      <div>
        {userType === "Owner" ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {isLoggedIn && <button onClick={handleLogout} className="btn">Logout</button>}
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/properties">Properties</Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn">Logout</button>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register" className="btn">Register</Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;