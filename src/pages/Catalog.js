import React from 'react';
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useState, useEffect } from 'react';
import FlexBooks from '../components/FlexBooks.js';


function Catalog({user, books}) {

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
