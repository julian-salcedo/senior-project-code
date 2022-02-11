import React from 'react';
import Card from '../components/Card';

function Catalog() {
  return (
    <div>
      <h1>Our Catalog</h1>
      <Card 
        title='Random Book' 
        imageUrl='https://m.media-amazon.com/images/I/41gr3r3FSWL.jpg'
        body='random description'
      />
      <form>
        <input type='text' name='search-bar' id='search-bar' placeholder='Search...' />
      </form>
      <p>Book 1</p>
      <p>Book 2</p>
      <p>Book 3</p>
    </div>
  ) 
}

export default Catalog;
