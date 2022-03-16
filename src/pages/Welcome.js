import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Welcome.css'

function Home({user}) {
  return (
    <div className='welcome-page'>
      <div className='welcome-top'>
        <div className='welcome-title'>
          <strong>
            McFatter eLibrary      
          </strong>
        </div>
      </div>
      <div className='welcome-bottom'>
        <div className='welcome-info'>
          <Link to='catalog'>
            <button>
              {(!user && "Checkout our Catalog") || ("Welcome " + user.first)}
            </button>
          </Link>
        </div>
        {user && user.email != "admin@gmail.com" && 
        <div className='welcome-books'>
          <Link to='my-books'>
            <button>View Your Books</button>
          </Link>
        </div>}
        {!user && 
        <div className='welcome-sign-in'>
          <Link to='sign-in'>
            <button>Sign In</button>
          </Link>
        </div>}
        {user && user.email == "admin@gmail.com" && 
        <div className='welcome-admin'>
          <Link to='admin'>
            <button>View Admin Page</button>
          </Link>
        </div>}
      </div>
     </div>
  ); 
}

export default Home;
