import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import '../styles/Dashboard.css';

function Dashboard() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', location: '', price: '', image: '', description: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchDashboard = () => {
    api.get('/dashboard').then(res => {
      if (res.error) navigate('/login');
      else setData(res);
    });
  };

  useEffect(() => { fetchDashboard(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const res = await api.post('/properties', { ...form, price: parseFloat(form.price) });
    if (res.error) {
      setError(res.error);
    } else {
      setShowModal(false);
      setForm({ title: '', location: '', price: '', image: '', description: '' });
      setError('');
      fetchDashboard();
    }
  };

  if (!data) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Dashboard</h1>
        <p className="role-badge">Role: {data.role}</p>

        {data.role === 'Owner' ? (
          <div className="owner-dashboard">
            <button className="add-property-btn" onClick={() => setShowModal(true)}>+ Add Property</button>
            <h2>My Properties</h2>
            <div className="property-list">
              {data.properties && data.properties.length > 0 ? (
                data.properties.map(p => (
                  <div className="property-item" key={p.id}>
                    <h3>{p.title}</h3>
                    <p>{p.location} - ${p.price}/month</p>
                    <span className={`status-badge ${p.status === 'RENTED' ? 'status-rented' : 'status-available'}`}>
                      {p.status === 'RENTED' ? 'Rented' : 'Available'}
                    </span>
                  </div>
                ))
              ) : (
                <p>No properties added yet.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="tenant-dashboard">
            <h2>My Bookings</h2>
            <div className="booking-list">
              {data.bookings && data.bookings.length > 0 ? (
                data.bookings.map(b => (
                  <div className={`booking-item booking-${b.status.toLowerCase()}`} key={b.id}>
                    <div className="booking-header">
                      <h3>{b.propertyTitle}</h3>
                      <span className={`status-badge status-${b.status.toLowerCase()}`}>{b.status}</span>
                    </div>
                    <p>📍 {b.propertyLocation} — ${b.price}/month</p>
                    {b.status === 'APPROVED' && <p className="status-msg approved-msg">✅ Your request has been approved! Contact the owner to proceed.</p>}
                    {b.status === 'REJECTED' && <p className="status-msg rejected-msg">❌ Your request was rejected by the owner.</p>}
                    {b.status === 'PENDING' && <p className="status-msg pending-msg">⏳ Waiting for owner approval.</p>}
                  </div>
                ))
              ) : (
                <p>No bookings yet.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Property</h2>
            {error && <p className="modal-error">{error}</p>}
            <form onSubmit={handleAddProperty}>
              <div className="form-group">
                <label>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input name="location" value={form.location} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Price (per month)</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="add-property-btn">Add Property</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
