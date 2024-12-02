import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="search-bar-container">
    <label htmlFor="searchBar" className="search-bar-label">
      Search Book
    </label>
    <input
      id="searchBar"
      type="text"
      placeholder="Search books by title, author, or genre:"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-bar"
    />
  </div>
);

export default SearchBar;
