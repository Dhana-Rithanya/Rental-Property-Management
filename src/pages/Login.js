import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Style/Auth.css";

function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("Tenant");

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", userType);
    navigate(userType === "Owner" ? "/dashboard" : "/");
  };

  return (
    <div className="auth">
      <h2>Login</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <select onChange={(e) => setUserType(e.target.value)}>
        <option value="Tenant">Tenant</option>
        <option value="Owner">Owner</option>
      </select>
      <button className="btn" onClick={handleLogin}>Login</button>
      <p className="auth-link">Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;