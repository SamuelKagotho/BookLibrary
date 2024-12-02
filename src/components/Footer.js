import React from 'react';

const Footer = () => (
  <footer className="app-footer">
    <p>&copy; {new Date().getFullYear()} Book Search Library. All rights reserved.</p>
    <p>
      Made with <span style={{ color: 'red' }}>❤</span> by Group 5.
    </p>
  </footer>
);

export default Footer;
