import React from 'react';
import Card from '../components/Card';
import DefaultCover from '../assets/random-book-cover.jpg';

function MyBooks() {
  return (
    <div>
      <h1>My Books</h1>
      <p>Total Overdue Fees:</p>
      <h3>Checked Out:</h3>
      <div className='wrapper'>
        <Card image={DefaultCover} title='Test Book' author='person' />   
      </div>
      <h3>On Hold:</h3>
    </div>
  ) 
}

export default MyBooks;
