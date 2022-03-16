import React from 'react';
import FlexBooks from '../components/FlexBooks.js';
<<<<<<< HEAD
import TempFlexBooks from '../components/TempFlexBooks';
import '../styles/MyBooks.css';
=======
>>>>>>> master

function MyBooks({user, books}) {
  function getBookFromId(id) {
    const book = books.find(book => book.id == id);
    return book;
  }

  return (
    <div>
      {(user && books &&
      <div>
        <div className='my-books-top'>
          <div className='my-books-title'>
            My Books
          </div>
          <div className='my-books-fees'>
            Total Overdue Fees:
          </div>
        </div>
        <div className='my-books-middle'>
          <div className='my-books-checked'>
            Checked Out
          </div>
          <FlexBooks books={(user.books.filter(book => book.isCheckedOut)).map(checkedOut => {return getBookFromId(checkedOut.bookId);})} />
        </div>
        <div className='my-books-bottom'>
          <div className='my-books-hold'>
            On Hold
          </div>
          <FlexBooks books={(user.books.filter(book => !book.isCheckedOut)).map(hold => {return getBookFromId(hold.bookId);})} />
        </div>
      </div>)
        || (!user &&
        <h2>Not Logged In</h2>) 
      }
    </div>
  ) 
}

export default MyBooks;
