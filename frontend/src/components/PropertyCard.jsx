import { Link } from 'react-router-dom';
import '../styles/PropertyCard.css';

function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img src={property.image} alt={property.title} className="property-image" />
      <div className="property-info">
        <h3>{property.title}</h3>
        <p className="property-location">📍 {property.location}</p>
        <p className="property-price">${property.price}/month</p>
        <Link to={`/property/${property.id}`} className="view-btn">View Details</Link>
      </div>
    </div>
  );
}

export default PropertyCard;
