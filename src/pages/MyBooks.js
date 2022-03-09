import React from 'react';
import FlexBooks from '../components/FlexBooks.js';

function MyBooks({user, books}) {
  function getBookFromId(id) {
    const book = books.find(book => book.id == id);
    return book;
  }

  return (
    <div>
      {(user && books &&
      <div>
        <h1>My Books</h1>
        <p>Total Overdue Fees:</p>
        <h3>Checked Out:</h3>
        <FlexBooks books={(user.books.filter(book => book.isCheckedOut)).map(checkedOut => {return getBookFromId(checkedOut.bookId);})} />
        <h3>On Hold:</h3>
        <FlexBooks books={(user.books.filter(book => !book.isCheckedOut)).map(hold => {return getBookFromId(hold.bookId);})} />
        <br />
      </div>)
        || (!user &&
        <h2>Not Logged In</h2>) 
      }
    </div>
  ) 
}

export default MyBooks;
