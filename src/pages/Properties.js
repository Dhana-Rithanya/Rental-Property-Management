import { useState } from "react";
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/FilterBar";
import "../Style/Properties.css";

function Properties({ properties }) {
  const [location, setLocation] = useState("All");
  const [price, setPrice] = useState("All");

  const filtered = properties.filter((property) => {
    let locationMatch = location === "All" || property.location === location;
    let priceMatch = true;

    if (price === "Low") priceMatch = property.price < 20000;
    if (price === "Mid") priceMatch = property.price >= 20000 && property.price <= 40000;
    if (price === "High") priceMatch = property.price > 40000;

    return locationMatch && priceMatch;
  });

  return (
    <div className="page">
      <FilterBar setLocation={setLocation} setPrice={setPrice} />
      
      <div className="grid">
        {filtered.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

export default Properties;