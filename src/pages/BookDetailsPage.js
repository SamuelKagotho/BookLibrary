import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BookDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { book } = location.state || {};

  // State for reviews and new review form
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [userName, setUserName] = useState('');

  // Load reviews from backend when the component mounts
  useEffect(() => {
    if (book) {
      fetch(`http://localhost:5000/reviews/${book.id}`)
        .then((response) => response.json())
        .then((data) => setReviews(data))
        .catch((error) => console.error('Error loading reviews:', error));
    }
  }, [book]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() && userName.trim()) {
      const reviewData = {
        bookId: book.id,
        userName,
        comment: newReview,
      };

      // Send the new review to the backend
      fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })
        .then((response) => response.json())
        .then((newReview) => {
          setReviews((prevReviews) => [...prevReviews, newReview]); // Update the reviews list with the new review
          setNewReview('');
          setUserName('');
        })
        .catch((error) => console.error('Error posting review:', error));
    }
  };

  const handleRemoveReview = (reviewId) => {
    // Send a DELETE request to the backend to remove the review
    fetch(`http://localhost:5000/reviews/${book.id}/${reviewId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        // Update the reviews state by removing the deleted review
        setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
      })
      .catch((error) => console.error('Error deleting review:', error));
  };

  if (!book) {
    return <p>No book details available.</p>;
  }

  return (
    <div className="book-details-page">
      <h1>{book.title}</h1>
      <img
        src={book.image || "https://via.placeholder.com/150"}
        alt={book.title}
        className="book-detail-image"
      />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Published Year:</strong> {book.publishedDate || 'Unknown'}</p>
      <p><strong>Rating:</strong> {book.rating || 'No rating available'}</p>
      <div className="description-container">
        <h2>Description</h2>
        <p>{book.description || 'No description available'}</p>
      </div>
      <div className="reviews-container">
        <h2>User Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <p><strong>{review.userName}:</strong> {review.comment}</p>
              <button 
                onClick={() => handleRemoveReview(review.id)} 
                className="remove-review-button"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No user reviews available.</p>
        )}
      </div>
      <div className="review-form">
        <h3>Leave a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="review-input"
            required
          />
          <textarea
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="review-textarea"
            required
          />
          <button type="submit" className="review-submit-button">
            Submit Review
          </button>
        </form>
      </div>
      <button className="back-button" onClick={handleBack}>
        &larr; Back
      </button>
    </div>
  );
};

export default BookDetailsPage;
