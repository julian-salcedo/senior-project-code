import React from 'react';
import DefaultCover from '../assets/random-book-cover.jpg';
import {useParams} from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
//test
function BookInfo() {

  let { id } = useParams();
  const docRef = doc(db, 'books', id)

  const [bookInfo, setBookInfo] = useState();

  useEffect(() => {
    getDoc(docRef).then((book) => {
      let data = book.data()
      setBookInfo(data);
    })
  }, []);

  // let title = "";
  // onSnapshot(docRef, (doc) => {
  //   title = doc.data().title;
  //   console.log(title);
  // })
  
  return (
    <div>
      {console.log(bookInfo.title)}
      <h1>{bookInfo.title}</h1>
      <img src={DefaultCover} />
    </div>
  ) 
}

export default BookInfo;
