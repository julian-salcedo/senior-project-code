import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo-mcfatter.png';
import ReorderIcon from '@material-ui/icons/Reorder';
import '../styles/NavBar.css';

function NavBar() {

  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className='navbar'>
      <div className='leftSide' id={openLinks ? 'open' : 'closed'}>
        <img src={Logo} />
        <div className='hiddenLinks'>
          <Link to='/'>Welcome</Link>
          <Link to='/sign-in'>Sign In</Link>
          <Link to='/catalog'>Catalog</Link>
          <Link to='/my-books'>My Books</Link>
          <Link to='/admin'>Admin</Link>
        </div>
      </div>
      <div className='rightSide'>
        <Link to='/'>Welcome</Link>
        <Link to='/sign-in'>Sign In</Link>
        <Link to='/catalog'>Catalog</Link>
        <Link to='/my-books'>My Books</Link>
        <Link to='/admin'>Admin</Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
    

  );
}

export default NavBar;
