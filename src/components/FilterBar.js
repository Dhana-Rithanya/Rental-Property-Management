function FilterBar({ setLocation, setPrice }) {
  return (
    <div className="filters">
      <select onChange={(e) => setLocation(e.target.value)}>
        <option value="All">All Locations</option>
        <option value="Chennai">Chennai</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>

      <select onChange={(e) => setPrice(e.target.value)}>
        <option value="All">All Prices</option>
        <option value="Low">Below 20000</option>
        <option value="Mid">20000-40000</option>
        <option value="High">Above 40000</option>
      </select>
    </div>
  );
}

export default FilterBar;