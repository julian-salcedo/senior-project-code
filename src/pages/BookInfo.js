import React from 'react';
import Card from '../components/Card';
import DefaultCover from '../assets/random-book-cover.jpg';
import { collection, onSnapshot, getDocs} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';


function BookInfo() {


  const booksColRef = collection(db, 'books');
  const [books, setBooks] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const getBooks = async () => {
      const data = await getDocs(booksColRef);
      setBooks(data.docs.map((doc) => {return ({ ...doc.data(), id: doc.id }) }));
    }
    getBooks();
  }, []);

  onSnapshot(booksColRef, function(snapShot){
    let b = [];
    snapShot.docs.forEach(function(doc){
      b.push({...doc.data(), id: doc.id})
    })
    setBooks(b);
  })
  
  return (
    <div>
      <h1>Book</h1>
      <p>Id: {id}</p>
    </div>
  ) 
}

export default BookInfo;
