import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Tenant');
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const isPasswordValid = passwordPattern.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setError('Password must be at least 8 characters with uppercase, lowercase, and a number');
      return;
    }
    const data = await api.post('/auth/register', { name, email, password, role });
    if (data.error) {
      setError(data.error);
    } else {
      setUser({ userId: data.id, role: data.role });
      navigate(data.role === 'Owner' ? '/dashboard' : '/');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Register</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <small style={{ color: password && !isPasswordValid ? '#e74c3c' : '#888', display: 'block', marginTop: 4 }}>
              At least 8 characters with uppercase, lowercase, and a number
            </small>
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Tenant">Tenant</option>
              <option value="Owner">Owner</option>
            </select>
          </div>
          <button type="submit" className="auth-btn" disabled={!isPasswordValid}>Register</button>
        </form>
        <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
