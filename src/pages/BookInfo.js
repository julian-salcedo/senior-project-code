import React from 'react';
import DefaultCover from '../assets/random-book-cover.jpg';
import '../styles/BookInfo.css';
import {useParams} from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function BookInfo({user, uid}) {

  //book id
  let { id } = useParams();
  const docRef = doc(db, 'books', id)

  const [bookInfo, setBookInfo] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    getDoc(docRef)
      .then((book) => {
        let data = book.data()
        setBookInfo(data);
        setIsPending(false);
      })
  }, []);

  function alreadyOnHold() {
    if(user && uid != 'y4pfi7AYC7XwzsmgSKRLmF792VS2'){
      if(user.books.some((book) => { return (book.id == id && !book.isCheckedOut)})){
        return true;
      }
    }
    return false;
  }

  function placeHold(){
    console.log('place hold clicked...');
    if(user && uid != 'y4pfi7AYC7XwzsmgSKRLmF792VS2'){
      if(user.books.some((book) => { return (book.id == id)})){
        console.log('you already have this book: ', id)
      }else{
        console.log('place hold successful...')
        const docRef = doc(db, 'users', uid)
        updateDoc(docRef, {
          books: [...user.books, {id: id, title: bookInfo.title, author: bookInfo.author, desc: bookInfo.desc, isCheckedOut: false}]
        })
          .then(() => console.log('update doc ran'))
          .catch((err) => console.log(err.message))
      }
    }else{
      console.log('you must be signed into student acc to checkout')
    }
    
  }

  function cancelHold(){
    const bookToCancel = user.books.find(book => book.id == id && !book.isCheckedOut)
    if(!bookToCancel){
      console.log('cancel hold unsuccessful...')
      return;
    }
    console.log('cancel hold successful...')
    const docRef = doc(db, 'users', uid)
    updateDoc(docRef, {
      books: user.books.filter(book => book.id != id)
    })
      .then(() => console.log('update doc ran'))
      .catch((err) => console.log(err.message))
  }
  
  return (
    <div>
      {isPending && <div>Loading...</div> }

      {bookInfo && 
      <div>
        <div className='info-container'>
          <img className='cover' src={DefaultCover} />
          <h2 className='title'>{bookInfo.title}</h2>
          <p className='author'>
            by <strong>{bookInfo.author}</strong>
          </p>
          <p className='description'>
            {bookInfo.desc}
          </p>
          {!alreadyOnHold() && <a onClick={placeHold} className='btn-checkout'>Place Hold</a>}
          {alreadyOnHold() && <a  onClick={cancelHold} className='btn-checkout'>Cancel Hold</a>}
        </div>
      </div>
      }

    </div>
  ) 
}

export default BookInfo;
