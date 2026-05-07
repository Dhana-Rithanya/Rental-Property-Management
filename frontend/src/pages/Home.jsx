import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import PropertyCard from '../components/PropertyCard';
import '../styles/Home.css';

function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get('/properties').then(data => setFeatured(data.slice(0, 3)));
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Rental Home</h1>
          <p>Discover amazing properties at the best prices</p>
          <Link to="/properties" className="cta-btn">Browse Properties</Link>
        </div>
      </section>

      <section className="featured">
        <div className="container">
          <h2>Featured Properties</h2>
          <div className="properties-grid">
            {featured.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
