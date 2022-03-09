import React from 'react';
import FlexBooks from '../components/FlexBooks.js';
import TempFlexBooks from '../components/TempFlexBooks';

function MyBooks({user}) {
  return (
    <div>
      {(user &&
      <div>
        <h1>My Books</h1>
        <p>Total Overdue Fees:</p>
        <h3>Checked Out:</h3>
        <FlexBooks books={user.books.filter(book => book.isCheckedOut)} />
        <h3>On Hold:</h3>
        <FlexBooks books={user.books.filter(book => !book.isCheckedOut)} />
        <br />
      </div>)   
        ||
        (<h2>Not Logged In</h2>)  
      }
    </div>
  ) 
}

export default MyBooks;
