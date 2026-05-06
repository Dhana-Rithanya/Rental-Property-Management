import { useState, useEffect } from 'react';
import { api } from '../api';
import PropertyCard from '../components/PropertyCard';
import FilterBar from '../components/FilterBar';
import '../styles/Properties.css';

function Properties() {
  const [properties, setProperties] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    api.get('/properties').then(setProperties);
  }, []);

  const filteredProperties = properties.filter(property => {
    const matchesLocation = !locationFilter || property.location === locationFilter;
    let matchesPrice = true;
    if (priceFilter) {
      if (priceFilter === '0-2000') matchesPrice = property.price <= 2000;
      else if (priceFilter === '2000-3000') matchesPrice = property.price > 2000 && property.price <= 3000;
      else if (priceFilter === '3000-5000') matchesPrice = property.price > 3000 && property.price <= 5000;
      else if (priceFilter === '5000+') matchesPrice = property.price > 5000;
    }
    return matchesLocation && matchesPrice;
  });

  return (
    <div className="properties-page">
      <div className="container">
        <h1>Available Properties</h1>
        <FilterBar onLocationChange={setLocationFilter} onPriceChange={setPriceFilter} />
        <div className="properties-grid">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        {filteredProperties.length === 0 && (
          <p className="no-results">No properties found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Properties;
