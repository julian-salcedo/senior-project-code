import React from 'react';
import DefaultCover from '../assets/random-book-cover.jpg';
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
        <h2>{bookInfo.title}</h2>
        <img src={DefaultCover} />
      </div>
      }

    </div>
  ) 
}

export default BookInfo;
