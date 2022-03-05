import React from 'react';
import FlexBooks from '../components/FlexBooks.js';
import TempFlexBooks from '../components/TempFlexBooks';

function MyBooks() {
  return (
    <div>
      <h1>My Books</h1>
      <p>Total Overdue Fees:</p>
      <h3>Checked Out:</h3>
      {/* Switch to FlexBooks when info from user can be added */}
      {/* <FlexBooks /> */}
      <TempFlexBooks />
      <h3>On Hold:</h3>
      {/* <FlexBooks /> */}
      <TempFlexBooks />
      <br />
    </div>
  ) 
}

export default MyBooks;
