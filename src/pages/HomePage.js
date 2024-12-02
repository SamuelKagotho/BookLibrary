import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ genre: '', sortBy: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveToFavorites = (book) => {
    fetch('http://localhost:5000/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),  // Send book details in request body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to save to favorites');
        }
        return response.json();
      })
      .then(() => {
        alert('Book saved to favorites!');
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      });
  };

  const fetchBooks = (query) => {
    setLoading(true);
    setError(null);

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=30`)
      .then((response) => response.json())
      .then((data) => {
        const formattedBooks = data.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
          genre: item.volumeInfo.categories?.[0] || 'General',
          publishedDate: item.volumeInfo.publishedDate || 'Unknown',
          rating: item.volumeInfo.averageRating || 0,
          description: item.volumeInfo.description || 'No description available',
          image: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
        }));
        setBooks(formattedBooks);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBooks('popular books');
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchBooks(searchQuery);
    }
  }, [searchQuery]);

  const filteredBooks = books.filter((book) => {
    if (filters.genre && book.genre !== filters.genre) {
      return false;
    }
    return true;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (filters.sortBy === 'newest') {
      return new Date(b.publishedDate) - new Date(a.publishedDate);
    }
    if (filters.sortBy === 'oldest') {
      return new Date(a.publishedDate) - new Date(b.publishedDate);
    }
    if (filters.sortBy === 'highest') {
      return b.rating - a.rating;
    }
    if (filters.sortBy === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });

  return (
    <div className="page">
      <header>
        <h1>Book Search Library</h1>
      </header>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filters filters={filters} setFilters={setFilters} />

      {loading && <p>Loading books...</p>}
      {error && <p>Error: {error}</p>}

      <div className="book-list">
        <BookList
          books={sortedBooks}
          onSaveToFavorites={handleSaveToFavorites}  
          isFavoritePage={false}  
        />
      </div>
    </div>
  );
};

export default HomePage;
