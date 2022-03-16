import React from 'react';
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useState, useEffect } from 'react';
import FlexBooks from '../components/FlexBooks.js';
import '../styles/Catalog.css';


function Catalog({user, books}) {

  function filter(){
    const books = document.querySelectorAll(".card-container")
    const query = document.getElementById("search-bar").value
    books.forEach(book => {
      const title = book.querySelector(".card-title").querySelector("strong").innerHTML
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
      <div className='catalog-top'>
        <div className='catalog-title'>Our Catalog</div>
        <input className='catalog-search' type='text' placeholder='Search...' id='search-bar' onChange={filter}/>
      </div>
      <div className='catalog-bottom'>
        <FlexBooks className='flex-books' books={books} />
      </div>
    </div>
  ) 
}

export default Catalog;
