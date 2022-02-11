import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Library</h1>
      <button>
        <Link to='/sign-in'>Sign in</Link>
      </button>
    </div>
  ); 
}

export default Home;
