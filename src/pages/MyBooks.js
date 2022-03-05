import React from 'react';
import FlexBooks from '../components/FlexBooks.js';

function MyBooks() {
  return (
    <div>
      <h1>My Books</h1>
      <p>Total Overdue Fees:</p>
      <h3>Checked Out:</h3>
      <FlexBooks />
      <h3>On Hold:</h3>
      <FlexBooks />
      <br />
    </div>
  ) 
}

export default MyBooks;
