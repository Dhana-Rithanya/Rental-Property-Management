import { useState, useEffect } from 'react';
import { api } from '../api';
import '../styles/Notifications.css';

function Notifications() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = () => {
    api.get('/bookings/requests').then(data => {
      if (data.error) setError(data.error);
      else setRequests(data);
      setLoading(false);
    });
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleStatus = async (bookingId, status) => {
    const res = await api.post(`/bookings/${bookingId}/status`, { status });
    if (!res.error) fetchRequests();
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="notifications-page">
      <div className="container">
        <h1>Rent Requests</h1>
        {requests.length === 0 ? (
          <p className="no-requests">No rent requests yet.</p>
        ) : (
          <div className="requests-list">
            {requests.map(r => (
              <div className="request-card" key={r.id}>
                <div className="request-info">
                  <h3>{r.propertyTitle}</h3>
                  <p>📍 {r.propertyLocation} — ${r.price}/month</p>
                  <p>👤 Tenant: {r.tenantName} ({r.tenantEmail})</p>
                  <p className="request-date">🕒 Requested: {formatDate(r.createdAt)}</p>
                  <span className={`status-badge status-${r.status.toLowerCase()}`}>{r.status}</span>
                </div>
                {r.status === 'PENDING' && (
                  <div className="request-actions">
                    <button className="approve-btn" onClick={() => handleStatus(r.id, 'APPROVED')}>Approve</button>
                    <button className="reject-btn" onClick={() => handleStatus(r.id, 'REJECTED')}>Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
