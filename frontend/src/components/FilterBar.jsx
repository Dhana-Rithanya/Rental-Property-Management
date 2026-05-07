import '../styles/FilterBar.css';

function FilterBar({ onLocationChange, onPriceChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Location:</label>
        <select onChange={(e) => onLocationChange(e.target.value)}>
          <option value="">All Locations</option>
          <option value="New York, NY">New York, NY</option>
          <option value="Austin, TX">Austin, TX</option>
          <option value="Miami, FL">Miami, FL</option>
          <option value="San Francisco, CA">San Francisco, CA</option>
          <option value="Chicago, IL">Chicago, IL</option>
          <option value="Los Angeles, CA">Los Angeles, CA</option>
          <option value="Denver, CO">Denver, CO</option>
          <option value="Seattle, WA">Seattle, WA</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Price Range:</label>
        <select onChange={(e) => onPriceChange(e.target.value)}>
          <option value="">All Prices</option>
          <option value="0-2000">$0 - $2000</option>
          <option value="2000-3000">$2000 - $3000</option>
          <option value="3000-5000">$3000 - $5000</option>
          <option value="5000+">$5000+</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
