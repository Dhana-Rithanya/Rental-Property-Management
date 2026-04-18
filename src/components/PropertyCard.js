import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  return (
    <div className="card">
      <img src={property.image} alt="" />
      <h3>{property.title}</h3>
      <p>{property.location} | ₹{property.price}/month</p>
      <Link to={`/property/${property.id}`} className="btn">
        View Details
      </Link>
    </div>
  );
}

export default PropertyCard;