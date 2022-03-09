import React from 'react';
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import FlexBooks from '../components/FlexBooks.js';


function Catalog({user, books}) {


  // const booksColRef = collection(db, 'books');
  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   const getBooks = async () => {
  //     const data = await getDocs(booksColRef);
  //     setBooks(data.docs.map((doc) => {return ({ ...doc.data(), id: doc.id }) }));
  //   }
  //   getBooks();
  //   // console.log('catalog use effect ran. User:', user)

  // }, []);

  
  function filter(){
    const books = document.querySelectorAll(".card-container")
    const query = document.getElementById("search-bar").value
    books.forEach(book => {
      const title = book.querySelector(".title").querySelector("h3").innerHTML
      if(title.toLowerCase().startsWith(query.toLowerCase())) {
        book.hidden = false
      }
      else{
        book.hidden = true
      }
    }) 
  }
  
  //Issue: Cards stay on one row
  return (
    <div>
      <h1>Our Catalog</h1>
      <input type='text' placeholder='Search...' id='search-bar' onChange={filter}/>
      <FlexBooks books={books} />
      <br />
    </div>
  ) 
}

export default Catalog;
