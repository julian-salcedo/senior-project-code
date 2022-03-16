import React from 'react';
import FlexBooks from '../components/FlexBooks.js';

function MyBooks({user, books}) {
  function getBookFromId(id) {
    const book = books.find(book => book.id == id);
    return Object.create(book);
  }

  function getCheckedOut(){
    let checkedOutList = user.books.filter(book => book.isCheckedOut)
    checkedOutList = checkedOutList.map(checkedOut => {
      let bookInfo = getBookFromId(checkedOut.bookId)
      bookInfo.dueDate = checkedOut.dueDate
      return bookInfo
    })
    return checkedOutList
  }

  const checkedOutList = getCheckedOut()

  return (
    <div>
      {(user && user.email != "admin@gmail.com" && books &&
      <div>
        <h1>My Books</h1>
        <p>Total Overdue Fees:</p>
        <h3>Checked Out:</h3>
        <FlexBooks books={checkedOutList} />
        <h3>On Hold:</h3>
        <FlexBooks books={(user.books.filter(book => !book.isCheckedOut)).map(hold => {return getBookFromId(hold.bookId);})} />
        <br />
      </div>)
        || (user && user.email == "admin@gmail.com" &&
          <h2>Not Signed In As Student</h2>) 
        || (!user &&
        <h2>Not Logged In</h2>) 
      }
    </div>
  ) 
}

export default MyBooks;
