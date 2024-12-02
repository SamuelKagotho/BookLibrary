import React, { useState, useEffect, useCallback } from 'react';

const BookDetailsPage = ({ match }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the fetchBookDetails function to avoid re-creating it on each render
  const fetchBookDetails = useCallback((id) => {
    setLoading(true);
    setError(null);
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject('Failed to fetch book details');
        }
        return response.json();
      })
      .then((data) => {
        setBook(data);  // Set book data to state
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures the function is memoized once

  // UseEffect to trigger book data fetching based on the book ID
  useEffect(() => {
    const bookId = match.params.id;
    fetchBookDetails(bookId);  // Call memoized fetchBookDetails
  }, [fetchBookDetails, match.params.id]);  // Depend on the book ID and fetchBookDetails

  // Return loading or error states if necessary
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // If book is fetched, render the details
  return (
    <div>
      <h1>Book Details</h1>
      {book && (
        <div>
          <h2>{book.volumeInfo.title}</h2>
          <p>Author: {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
          <p>Genre: {book.volumeInfo.categories?.join(', ') || 'No category available'}</p>
          <p>Published: {book.volumeInfo.publishedDate || 'Unknown'}</p>
          <p>Rating: {book.volumeInfo.averageRating || 'No rating'}</p>
          <p>{book.volumeInfo.description || 'No description available'}</p>
        </div>
      )}
    </div>
  );
};

export default BookDetailsPage;
