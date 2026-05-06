import { useState, useEffect } from "react";
import "../Style/Dashboard.css";

function Dashboard({ addProperty }) {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: ""
  });

  useEffect(() => {
    const ownerProperties = JSON.parse(localStorage.getItem("ownerProperties") || "[]");
    setProperties(ownerProperties);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProperty = {
      id: Date.now(),
      ...formData,
      price: parseInt(formData.price),
      image: "https://via.placeholder.com/300"
    };
    addProperty(newProperty);
    setProperties([...properties, newProperty]);
    setFormData({ title: "", location: "", price: "", description: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updatedProperties = properties.filter(p => p.id !== id);
    setProperties(updatedProperties);
    localStorage.setItem("ownerProperties", JSON.stringify(updatedProperties));
  };

  return (
    <div className="dashboard">
      <h2>Owner Dashboard</h2>
      <button className="btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Property"}
      </button>

      {showForm && (
        <form className="property-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Property Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <select
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          >
            <option value="">Select Location</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
          <input
            type="number"
            placeholder="Monthly Rent"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
          <button type="submit" className="btn">Add Property</button>
        </form>
      )}

      <div className="owner-properties">
        <h3>My Properties ({properties.length})</h3>
        <div className="grid">
          {properties.map((property) => (
            <div key={property.id} className="card">
              <h4>{property.title}</h4>
              <p>{property.location} | ₹{property.price}/month</p>
              <p>{property.description}</p>
              <button className="delete-btn" onClick={() => handleDelete(property.id)}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;