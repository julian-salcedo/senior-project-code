import React from 'react';
import Card from '../components/Card';
import '../styles/Catalog.css';
import DefaultCover from '../assets/random-book-cover.jpg';
import { collection, onSnapshot, getDocs} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useState, useEffect } from 'react';


function Catalog() {


  const booksColRef = collection(db, 'books');
  const [books, setBooks] = useState([]);

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


  function filter(){
    const books = document.querySelectorAll(".card-container")
    const query = document.getElementById("search-bar").value
    books.forEach(book => {
      const title = book.querySelector(".card-title").querySelector("h3").innerHTML
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

      <div className='wrapper'>
        <table>
          <tbody>
            <tr>
              {books.map(function(book){
                return(
                  <td key={book.id}>
                    <Card title={book.title} image={DefaultCover} body={book.desc} page={"/catalog/" + book.id}/>
                  </td>
                )
              })}
          </tr>

          </tbody>
        </table>
      </div>
    </div>
  ) 
}

export default Catalog;
