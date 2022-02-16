import React from 'react';
import Card from '../components/Card';
import DefaultCover from '../random-book-cover.jpg';

function Catalog() {
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
  return (
    <div>
      <h1>Our Catalog</h1>
      <table>
        <tr>
          <td>
            <Card 
              title='Random Book' 
              image={DefaultCover}
              body='random description'
            />
          </td>
          <td>
            <Card 
              title='React Textbook' 
              image={DefaultCover}
              body='random description'
            />
          </td>
          <td>
            <Card 
              title='Shakespeare' 
              image={DefaultCover}
              body='random description'
            />
          </td>
      </tr>
      </table>
      <input type='text' placeholder='Search...' id='search-bar' onChange={filter}/>
      <p>Book 1</p>
      <p>Book 2</p>
      <p>Book 3</p>
    </div>
  ) 
}

export default Catalog;
