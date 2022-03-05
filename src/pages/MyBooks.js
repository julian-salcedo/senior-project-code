import React from 'react';

function MyBooks({user}) {
  return (
    <div>
      {(user &&
      <div>
        <h1>My Books</h1>
        <p>Total Overdue Fees:</p>
      </div>)
      ||
      (<h2>Not Logged In</h2>)
      }
    </div>
  ) 
}

export default MyBooks;
