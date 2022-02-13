import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo-mcfatter.png';
import '../styles/NavBar.css';

function NavBar() {
  return (
    <div className='navbar'>
      <div className='leftSide'>
        <img src={Logo} />
      </div>
      <div className='rightSide'>
        <Link to='/'>Welcome</Link>
        <Link to='/sign-in'>Sign In</Link>
        <Link to='/catalog'>Catalog</Link>
        <Link to='/my-books'>My Books</Link>
        <Link to='/admin'>Admin</Link>

      </div>
    </div>
    

  );
}

export default NavBar;
