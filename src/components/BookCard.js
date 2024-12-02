import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book, onSaveToFavorites, onRemoveFromFavorites, isFavoritePage, isAlreadyInFavorites }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Track if the button should be disabled

  const handleShowDetails = () => {
    navigate(`/books/${book.id}`, { state: { book } });
  };

  const handleSaveToFavorites = () => {
    if (isAlreadyInFavorites) {
      setMessage('Already added to favorites');
    } else {
      onSaveToFavorites(book); // Save to favorites
      setIsButtonDisabled(true); // Disable the button after saving
      setMessage('Book added to favorites');
    }
  };

  const handleRemoveFromFavorites = () => {
    onRemoveFromFavorites(book.id);
    setMessage('Book removed from favorites');
    setIsButtonDisabled(false); // Re-enable the button when the book is removed
  };

  return (
    <div className="book-card">
      <img
        src={book.image || 'https://via.placeholder.com/150'}
        alt={book.title}
        className="book-image"
      />
      <h3 className="book-title">{book.title}</h3>
      <button className="details-button" onClick={handleShowDetails}>
        Show Details
      </button>

      {/* Show message if any */}
      {message && <p className="message">{message}</p>}

      {/* Conditionally render button */}
      {isFavoritePage ? (
        <button className="remove-button" onClick={handleRemoveFromFavorites}>
          Remove from Favorites
        </button>
      ) : (
        <button
          className="favorites-button"
          onClick={handleSaveToFavorites}
          disabled={isAlreadyInFavorites || isButtonDisabled} // Disable the button after adding to favorites
        >
          {isAlreadyInFavorites || isButtonDisabled ? 'Already Added' : 'Save to Favorites'}
        </button>
      )}
    </div>
  );
};

export default BookCard;
