import React from 'react'
import Card from './Card.js';
import '../styles/FlexBooks.css';

function FlexBooks({books}) {
  return (
    <div className='wrapper'>  
      {books.map(function(book){
        return(
          <td key={book.id}>
            <Card title={book.title} image={book.imageURL} author={book.author} page={"/catalog/" + book.id} dueDate={book.dueDate} />
          </td>
        )
      })}
    </div>
  )
}

export default FlexBooks