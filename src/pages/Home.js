import { Link } from "react-router-dom";
import "../Style/Home.css";

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Rental Home</h1>
          <p className="hero-subtitle">Discover thousands of properties across the city. Easy. Secure. Reliable.</p>
          <Link to="/properties" className="cta-button">Browse Properties</Link>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose RentEase?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏠</div>
            <h3>Wide Selection</h3>
            <p>Browse through hundreds of verified rental properties</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Booking</h3>
            <p>Safe and secure payment process for your peace of mind</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick Process</h3>
            <p>Find and book your dream home in just a few clicks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>Our team is always here to help you with any questions</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Find Your New Home?</h2>
        <p>Join thousands of happy renters who found their perfect place</p>
        <Link to="/register" className="cta-button-secondary">Get Started Today</Link>
      </section>
    </div>
  );
}

export default Home;