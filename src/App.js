import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import BookDetailsPage from './pages/BookDetailsPage';
import Footer from './components/Footer'; 

const App = () => (
  <Router>
    <Navbar />
    <div className="page">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
        </Routes>
      </div>
    </div>
    <Footer /> 
  </Router>
);

export default App;
