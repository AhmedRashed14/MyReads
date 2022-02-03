//using react hooks
import React, { useState, useEffect } from 'react';
// turn the button to search page and controling routing
import { Link } from 'react-router-dom';
//shelf importing to render the three
import Shelf from '../components/Shelf';
//import API methods
import * as BooksAPI from '../API/BooksAPI'
//importing loading animation

export default function Home(props) {
  const [booksByShelf,setBooksByShelf] = useState([]);

  const shelves = [{name:'Currently Reading',value:'currentlyReading'},
            {name:'Want To Read',value:'wantToRead'},
            {name:'Read',value:'read'}]

  const populateShelves = () => {
    BooksAPI.getAll()
    .then(books => {
      const booksByShelf = shelves.map(shelf => ({
        name: shelf.name,
        books: books.filter(book => book.shelf === shelf.value)
      }))
      setBooksByShelf(booksByShelf)
    })
  }
  const onChangeShelf = (newShelf, book) => {
    BooksAPI.update(book, newShelf)
    .then(() => populateShelves())
  }
  // eslint-disable-next-line
  useEffect(populateShelves,[])
  return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {booksByShelf.map((entry, index) => (
              <Shelf
                title={entry.name}
                books={entry.books}
                key={index}
                onChangeShelf={onChangeShelf}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a new book</button>
          </Link>
        </div>
      </div>
    );
}
