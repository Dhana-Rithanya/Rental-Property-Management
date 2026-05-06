import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'Owner' ? '/dashboard' : '/'} />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to={user.role === 'Owner' ? '/dashboard' : '/'} />} />

        {/* Tenant routes */}
        <Route path="/" element={user?.role !== 'Owner' ? <Home /> : <Navigate to="/dashboard" />} />
        <Route path="/properties" element={user?.role !== 'Owner' ? <Properties /> : <Navigate to="/dashboard" />} />
        <Route path="/property/:id" element={user?.role !== 'Owner' ? <PropertyDetail /> : <Navigate to="/dashboard" />} />

        {/* Owner routes */}
        <Route path="/dashboard" element={user?.role === 'Owner' ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={user?.role === 'Owner' ? <Notifications /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to={user ? (user.role === 'Owner' ? '/dashboard' : '/') : '/login'} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
