import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onSaveToFavorites, onRemoveFromFavorites, isFavoritePage, favorites = [] }) => {
  const isAlreadyInFavorites = (bookId) => {
    return favorites.some((favBook) => favBook.id === bookId); // Check if the book is already in favorites
  };

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onSaveToFavorites={onSaveToFavorites}
          onRemoveFromFavorites={onRemoveFromFavorites}
          isFavoritePage={isFavoritePage}
          isAlreadyInFavorites={isAlreadyInFavorites(book.id)} // Pass the check if the book is already in favorites
        />
      ))}
    </div>
  );
};

export default BookList;
