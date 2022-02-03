// import react hooks
import React ,{ useState, useEffect } from 'react';
// import react link to switch to search page
import { Link } from 'react-router-dom';
//API methods
import * as BooksAPI from '../API/BooksAPI';
//Book component to render as results of searching
import Book from '../components/Book';

export default function Search(props) {
  const[books,setBooks] = useState([]);
  const[results,setResults] = useState([]);
  const[error,setError] = useState(undefined);
// using useEffect as componentdidMount event.
  useEffect(() => {
    BooksAPI.getAll().then(books => {
      setBooks(books);
    });
  },[])
	// updating state
  const updateState = (results = [], error = undefined) => {
    setResults(results)
    setError(error)
  };
//searching for books 
  const onSearch = (event) => {
    event.preventDefault();
    const searchValue = event.target.value;
    if (searchValue === '') {
      // no need to search - just set empty
      updateState();
      return ;
    }

    BooksAPI.search(searchValue).then(results => {
      if (results.error) {
        updateState([], results.error);
      } else {
        updateState(results);
      }
    });
  };

  const onChangeShelf = (newShelf,book) => {
    BooksAPI.update(book, newShelf)
      .then(() => BooksAPI.getAll())
      .then(books =>
      setBooks(books)
      );
  };

  const findShelf = book => {
    const matchedBooks = books.filter(elem => book.id === elem.id);
    if (matchedBooks.length > 0) {
      return matchedBooks[0].shelf;
    }
    return 'none';
  };

    const mappedBooks = results.map((book, index) => {
      book.shelf = findShelf(book);
      return (
        <Book key={index} book={book} onChangeShelf={onChangeShelf} />
      );
    });
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={onSearch}
            />
          </div>
        </div>
        <div></div>
        <div className="search-books-results">
          <ol className="books-grid">{mappedBooks}</ol>
        </div>
      </div>
    );
}
