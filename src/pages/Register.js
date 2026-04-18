import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../Style/Auth.css";

function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("Tenant");

  const handleRegister = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", userType);
    navigate(userType === "Owner" ? "/dashboard" : "/");
  };

  return (
    <div className="auth">
      <h2>Register</h2>
      <input type="text" placeholder="Full Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <select onChange={(e) => setUserType(e.target.value)}>
        <option value="Tenant">Tenant</option>
        <option value="Owner">Owner</option>
      </select>
      <button className="btn" onClick={handleRegister}>Register</button>
      <p className="auth-link">Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;