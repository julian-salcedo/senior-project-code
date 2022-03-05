import React from 'react'
import Card from './Card.js';
import DefaultCover from '../assets/random-book-cover.jpg';
import '../styles/FlexBooks.css';

function FlexBooks({books}) {
  return (
    <div className='wrapper'>  
      {books.map(function(book){
        return(
          <td key={book.id}>
            <Card title={book.title} image={DefaultCover} author={book.author} page={"/catalog/" + book.id}/>
          </td>
        )
      })}
    </div>
  )
}

export default FlexBooks