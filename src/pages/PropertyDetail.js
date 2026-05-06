import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import "../Style/PropertyDetail.css";

function PropertyDetail({ properties }) {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));
  const [success, setSuccess] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!property) {
    return <div className="detail"><h2>Property not found</h2></div>;
  }

  const handleRequest = () => {
    if (isLoggedIn) {
      setSuccess(true);
    }
  };

  return (
    <div className="detail">
      <img src={property.image} alt={property.title} />
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Rent:</strong> ₹{property.price}/month</p>

      {success ? (
        <div className="success-message">Request Successful!</div>
      ) : isLoggedIn ? (
        <button className="btn" onClick={handleRequest}>
          Request to Rent
        </button>
      ) : (
        <Link to="/login" className="btn">
          Login to Request
        </Link>
      )}
    </div>
  );
}

export default PropertyDetail;