const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

let favorites = [];  // Temporary in-memory store for favorites
let reviews = [];    // Temporary in-memory store for reviews

app.use(cors());
app.use(express.json());

// POST endpoint to add a book to favorites
app.post('/favorites', (req, res) => {
  const book = req.body;
  if (favorites.some(favBook => favBook.id === book.id)) {
    return res.status(400).json({ message: 'This book is already in favorites' });
  }
  favorites.push(book);
  res.status(201).json({ message: 'Book added to favorites' });
});

// GET endpoint to retrieve all favorite books
app.get('/favorites', (req, res) => {
  res.json(favorites);
});

// DELETE endpoint to remove a book from favorites
app.delete('/favorites/:bookId', (req, res) => {
  const { bookId } = req.params;

  // Find the index of the book to be removed
  const bookIndex = favorites.findIndex(book => book.id === bookId);

  if (bookIndex !== -1) {
    // Remove the book from the favorites array
    favorites.splice(bookIndex, 1);
    return res.status(200).json({ message: 'Book removed from favorites' });
  }

  return res.status(404).json({ message: 'Book not found in favorites' });
});

// POST endpoint to add a review
app.post('/reviews', (req, res) => {
  const { bookId, userName, comment } = req.body;
  if (!bookId || !userName || !comment) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newReview = { bookId, userName, comment, id: Date.now() }; // Adding unique ID
  reviews.push(newReview);
  res.status(201).json(newReview);
});

// GET endpoint to retrieve reviews for a specific book
app.get('/reviews/:bookId', (req, res) => {
  const { bookId } = req.params;
  const bookReviews = reviews.filter(review => review.bookId === bookId);
  res.json(bookReviews);
});

// DELETE endpoint to remove a review for a specific book
app.delete('/reviews/:bookId/:reviewId', (req, res) => {
  const { bookId, reviewId } = req.params;

  // Find the index of the review for the specific book
  const reviewIndex = reviews.findIndex(review => review.bookId === bookId && review.id === reviewId);

  if (reviewIndex !== -1) {
    // Remove the review from the reviews array
    reviews.splice(reviewIndex, 1);
    return res.status(200).json({ message: 'Review removed successfully' });
  }

  return res.status(404).json({ message: 'Review not found' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
