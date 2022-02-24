import React from 'react';
import DefaultCover from '../assets/random-book-cover.jpg';
import '../styles/BookInfo.css';
import {useParams} from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function BookInfo() {

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
  
  return (
    <div>
      {isPending && <div>Loading...</div> }

      {bookInfo && 
      <div>
        {/* <h2>{bookInfo.title}</h2>
        <img src={DefaultCover} />
        <p className='thing'>Hello</p> */}
        <div className='info-container'>
          <img className='cover' src={DefaultCover} />
          <h2 className='title'>{bookInfo.title}</h2>
          <p className='author'>
            by <strong>Anita Nipane</strong>
          </p>
          <hr className='divider' />
          <p className='description'>
            Most probably, while browsing a display of books on online bookstores, you have noticed that some of the books stand-out while others don’t. The design of these book covers somehow grab your attention and spur interest.
          </p>
          <button className='btn-checkout'>Checkout</button>
        </div>
      </div>
      }

    </div>
  ) 
}

export default BookInfo;
