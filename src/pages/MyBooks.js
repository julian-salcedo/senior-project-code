import React from 'react';
import FlexBooks from '../components/FlexBooks.js';
import '../styles/MyBooks.css';
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
        <div className='my-books-top'>
          <div className='my-books-title'>
            My Books
          </div>
          <div className='my-books-days'>
            Total Days Overdue: {overdueDays}
          </div>
          <div className='my-books-fees'>
            Total Overdue Fees (${overdueFee} per day): ${overdueFee * overdueDays}
          </div>
        </div>
        <div className='my-books-middle'>
          <div className='my-books-checked'>
            Checked Out
          </div>
          <FlexBooks books={checkedOutList} />
        </div>
        <div className='my-books-bottom'>
          <div className='my-books-hold'>
            On Hold
          </div>
          <FlexBooks books={(user.books.filter(book => !book.isCheckedOut)).map(hold => {return getBookFromId(hold.bookId);})} />
        </div>
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
