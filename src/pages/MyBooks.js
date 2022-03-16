import React from 'react';
import FlexBooks from '../components/FlexBooks.js';
import {Timestamp} from 'firebase/firestore'

function MyBooks({user, books}) {
  function getBookFromId(id) {
    const book = books.find(book => book.id == id);
    return Object.create(book);
  }

  function getCheckedOut(){
    if(!user){
      return
    }
    let checkedOutList = user.books.filter(book => book.isCheckedOut)
    checkedOutList = checkedOutList.map(checkedOut => {
      let bookInfo = getBookFromId(checkedOut.bookId)
      bookInfo.dueDate = checkedOut.dueDate
      return bookInfo
    })
    return checkedOutList
  }
  
  const checkedOutList = getCheckedOut()

  function getOverdueDays(){
    if(!user){
      return
    }
    let overdueDays = 0;
    checkedOutList.forEach(book => {
      const daysLate = Math.floor((Timestamp.now().seconds - book.dueDate.seconds) / 86400)
      if(daysLate > 0){
        overdueDays += daysLate
      }
    });
    return overdueDays
  }

  const overdueDays = getOverdueDays()
  const overdueFee = 0.25

  return (
    <div>
      {(user && user.email != "admin@gmail.com" && books &&
      <div>
        <h1>My Books</h1>
        <p>Total Days Overdue: {overdueDays}</p>
        <p>Overdue Fee per Day: ${overdueFee}</p>
        <p>Total Overdue Fees: ${overdueFee * overdueDays}</p>
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
