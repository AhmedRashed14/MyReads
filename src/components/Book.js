import React from 'react';
//bookComponent
function Book(props) {
  //bookInfo
  const {shelf='none',
  imageLinks:{ thumbnail=''}={},title,authors=[]}=props.book;

  //method to send shelf and book infos to the prop of the book
  const onChangeSelect = event => {    //prevent default behavior
    const newShelf = event.target.value;
    props.onChangeShelf(newShelf,props.book)
    event.preventDefault();
  }
  //returning the UI
  return(
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
             width: 128,
             height: 188,
             backgroundImage: `url("${thumbnail}")`}}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={onChangeSelect}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
        {authors.map((author,index,array)=>(
          <span key={index}>{author}</span>
        ))}
        </div>
      </div>
    </li>
  )
}
export default Book;
