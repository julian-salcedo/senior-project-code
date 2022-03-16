import React from 'react';
import DefaultCover from '../assets/random-book-cover.jpg';
import '../styles/BookInfo.css';
import {useParams} from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function BookInfo({user, uid, books}) {

  //book id
  let { id } = useParams();
  // const docRef = doc(db, 'books', id)

  // const [bookInfo, setBookInfo] = useState(null);
  // const [isPending, setIsPending] = useState(true);

  const bookInfo = books.find(book => book.id == id);
  console.log(bookInfo)

  // useEffect(() => {
  //   getDoc(docRef)
  //     .then((book) => {
  //       let data = book.data()
  //       setBookInfo(data);
  //       setIsPending(false);
  //     })
    
  // }, []);

  function alreadyOnHold() {
    if(user && uid != 'y4pfi7AYC7XwzsmgSKRLmF792VS2'){
      if(user.books.some((book) => { return (book.bookId == id && !book.isCheckedOut)})){
        return true;
      }
    }
    return false;
  }

  function alreadyCheckedOut(){
    if(user && uid != 'y4pfi7AYC7XwzsmgSKRLmF792VS2'){
      const checkedOutBooks = user.books.filter((book)=> {return book.isCheckedOut});
      if(checkedOutBooks.some((book)=> book.bookId == id)) return true;
    }
    return false;
  }

  function placeHold(){
    console.log('place hold clicked...');
    if(user && uid != 'y4pfi7AYC7XwzsmgSKRLmF792VS2'){
      if(user.books.some((book) => { return (book.bookId == id)})){
        console.log('you already have this book: ', id)
      }else{
        if(bookInfo.amount <= 0){
          alert("Book is out of stock")
          return;
        }
        console.log('place hold successful...')
        const docRef = doc(db, 'users', uid)
        updateDoc(docRef, {
          books: [...user.books, {bookId: id, isCheckedOut: false}]
        })
          .then(() => console.log('update doc ran'))
          .catch((err) => console.log(err.message))

        const bookRef = doc(db, 'books', bookInfo.id)
        updateDoc(bookRef, {
          amount: bookInfo.amount - 1
        })
          .then(() => console.log('book amount decremented'))
          .catch((err) => console.log(err.message))
      }
    }else{
      console.log('you must be signed into student acc to checkout')
    }
    
  }

  function cancelHold(){
    const bookToCancel = user.books.find(book => book.bookId == id && !book.isCheckedOut)
    if(!bookToCancel){
      console.log('cancel hold unsuccessful...')
      return;
    }
    console.log('cancel hold successful...')
    const docRef = doc(db, 'users', uid)
    updateDoc(docRef, {
      books: user.books.filter(book => book.bookId != id)
    })
      .then(() => console.log('update doc ran'))
      .catch((err) => console.log(err.message))
    
    const bookRef = doc(db, 'books', bookInfo.id)
    updateDoc(bookRef, {
      amount: bookInfo.amount + 1
    })
      .then(() => console.log('book amount incremented'))
      .catch((err) => console.log(err.message))
  }
  
  return (
    <div>
      {!bookInfo && <div>Loading...</div> }

      {bookInfo && 
      <div>
        <div className='info-page'>
          <img className='info-cover' src={(bookInfo.imageURL != "" && bookInfo.imageURL) || DefaultCover} />
          <div className='info-text'>
            <div className='info-title'>{bookInfo.title}</div>
            <div className='info-author'>
              by <strong>{bookInfo.author}</strong>
            </div>
            <img className='info-hidden-cover' src={(bookInfo.imageURL != "" && bookInfo.imageURL) || DefaultCover} />
            <div className='info-amount'>
              Amount: {bookInfo.amount}
            </div>
            <div className='info-description'>
              {bookInfo.desc}
            </div>
            {alreadyCheckedOut() && <p>Already checked out</p>}
            {(!alreadyCheckedOut() && !alreadyOnHold()) && <a onClick={placeHold} className='info-checkout'>Place Hold</a>}
            {alreadyOnHold() && <a onClick={cancelHold} className='info-checkout'>Cancel Hold</a>}
          </div>
        </div>
      </div>
      }

    </div>
  ) 
}

export default BookInfo;
