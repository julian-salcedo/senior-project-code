import { formatMs } from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Welcome.css'
import Storm_Logo from '../assets/mcfatter-storm-logo.png';
import Social_Media from '../assets/social-media-handles.png';

function Home({user}) {
  return (
    <div id='welcome-page'>
      <h1>{(!user && "Welcome to the McFatter eLibrary") || ("Welcome back, " + user.first)}</h1>
      <div><img src={Storm_Logo} alt='McFatter Storm Logo'/></div>
      <div><Link to='catalog'><button>View Our Catalog</button></Link></div>
      {user && user.email != "admin@gmail.com" && <div><Link to='my-books'><button>View Your Books</button></Link></div>}
      {user && user.email == "admin@gmail.com" && <div><Link to='admin'><button>View Admin Page</button></Link></div>}
      {!user && <div><Link to='sign-up'><button>Sign Up</button></Link> <Link to='sign-in'><button>Sign In</button></Link></div>}
      <div><img src={Social_Media} alt='McFatter Social Media Handles' id='social-media' /></div>
      <div><a href='https://www.browardschools.com/mcfattertechhigh' target='_blank'><button>Visit Our Official Website</button></a></div>
    </div>
  ); 
}

export default Home;
