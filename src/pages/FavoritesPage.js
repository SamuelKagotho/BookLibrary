import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import BookList from '../components/BookList';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate(); // Use navigate to navigate between pages

  useEffect(() => {
    fetch('http://localhost:5000/favorites')
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);
      });
  }, []);

  const handleRemoveFromFavorites = (bookId) => {
    fetch(`http://localhost:5000/favorites/${bookId}`, {
      method: 'DELETE',  // This will send a DELETE request to the server
    })
      .then((response) => response.json())
      .then(() => {
        // Remove the book from the local state to update the UI
        setFavorites(favorites.filter((book) => book.id !== bookId));
      })
      .catch((error) => {
        console.error('Error removing favorite:', error);
      });
  };
  

  const handleBackToHome = () => {
    navigate('/'); // Navigate back to the home page
  };

  if (!favorites.length) {
    return <p>No favorites available.</p>;
  }

  return (
    <div className="favorites-page">
      <h1>Your Favorite Books</h1>
      {/* Book List */}
      <BookList
        books={favorites}
        onRemoveFromFavorites={handleRemoveFromFavorites}
        isFavoritePage={true}  // Indicate that we are on the Favorites page
      />

      {/* Back to Home button */}
      <button className="back-to-home-button" onClick={handleBackToHome}>
      &larr; Back to Home
      </button>
    </div>
  );
};

export default FavoritesPage;
