import React from 'react';
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <ul>
        <li><Link to='/'>Welcome</Link></li>
        <li><Link to='/sign-in'>Sign In</Link></li>
        <li><Link to='/projects'>Projects</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
    </ul>
  );
}

export default NavBar;
