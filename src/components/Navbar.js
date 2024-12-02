import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-links">
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/favorites" className="navbar-link">Favorites</Link>
    </div>
  </nav>
);

export default Navbar;
