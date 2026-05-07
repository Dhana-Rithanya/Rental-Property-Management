import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import '../styles/PropertyDetail.css';

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [requested, setRequested] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/properties/${id}`).then(data => {
      if (data.error || !data.id) setNotFound(true);
      else setProperty(data);
    });
  }, [id]);

  const handleRent = async () => {
    setLoading(true);
    const res = await api.post(`/bookings/${id}`, {});
    setLoading(false);
    if (res.error) {
      if (res.error === 'Not logged in') navigate('/login');
      else setError(res.error);
    } else {
      setMessage(res.message);
      setError('');
      setRequested(true);
    }
  };

  if (notFound) return <div className="container"><h2>Property not found</h2></div>;
  if (!property) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="property-detail">
      <div className="container">
        <img src={property.image} alt={property.title} className="detail-image" />
        <div className="detail-content">
          <h1>{property.title}</h1>
          <p className="detail-location">📍 {property.location}</p>
          <p className="detail-price">${property.price}/month</p>
          <p className="detail-description">{property.description}</p>
          {message && <p className="rent-success">{message}</p>}
          {error && <p className="rent-error">{error}</p>}
          <button
            className="rent-btn"
            onClick={handleRent}
            disabled={requested || loading}
          >
            {loading ? 'Submitting...' : requested ? 'Request Sent ✓' : 'Request to Rent'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
