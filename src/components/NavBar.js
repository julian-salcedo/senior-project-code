import React from 'react';
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <ul>
        <li><Link to='/'>Welcome</Link></li>
        <li><Link to='/sign-in'>Sign In</Link></li>
        <li><Link to='/catalog'>Catalog</Link></li>
        <li><Link to='/my-books'>My Books</Link></li>
        <li><Link to='/admin'>Admin</Link></li>
    </ul>
  );
}

export default NavBar;
