/*import react from registery to create UI
and using jsx
*/
import React from 'react';
//importing the most basic element (component) Book UI
import Book from './Book';
//every Shelf Component
export default function Shelf(props) {
  /*props of the shelf incudes:title of the shelf,
   its books,
   method to call its prop which leads to changing state.
   */
  const {onChangeShelf,books,title} =props;
  /*mapping returned books to every shelf incuding:
     bookInfo
     key index to help react findout which book has changed if shelf rerendered
     method as a property to call outer method in the parent component
  */
  const shelfBooks = books.map((book,index,array) => (
    <Book key={index} onChangeShelf={onChangeShelf} book={book} />
  ))

  // every shelf content : title,books;
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {shelfBooks}
        </ol>
      </div>
    </div>
  )
}
