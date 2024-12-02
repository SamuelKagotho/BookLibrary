const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters">
      <select name="genre" onChange={handleChange} value={filters.genre}>
        <option value="">All Genres</option>
        <option value="General">General</option>
        <option value="Science">Science</option>
        <option value="Business & Economics">Business & Economics</option>
        <option value="Literary">Literary</option>
      </select>
      <select name="sortBy" onChange={handleChange} value={filters.sortBy}>
        <option value="">Sort by</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highest">Highest Rating</option>
        <option value="lowest">Lowest Rating</option>
      </select>
    </div>
  );
};

export default Filters;
