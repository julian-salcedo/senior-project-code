import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../assets/logo-mcfatter.png';
import ReorderIcon from '@material-ui/icons/Reorder';
import '../styles/NavBar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function NavBar({user, unsubUser}) {

  const [openLinks, setOpenLinks] = useState(false);

  let history = useHistory();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  function logOut(){
    unsubUser();
    console.log('unsubbing to user doc in appjs...')
    signOut(auth)
    .then(()=>{
      console.log('sign out clicked', auth.currentUser)
      history.push('/')
      })
      .catch((err)=>{
        console.log(err.message)
      })
  }
  return (
    <div className='navbar'>
        {/* <button onClick={logOut}> sign out</button> */}
      <div className='leftSide' id={openLinks ? 'open' : 'closed'}>
        <img src={Logo} />
        <div className='hiddenLinks'>
          <Link to='/'>Welcome</Link>
          {!user && <Link to='/sign-in'>Sign In</Link>}
          {user && <Link to='/' onClick={logOut}>Sign Out</Link>}
          <Link to='/catalog'>Catalog</Link>
          {user && user.email != "admin@gmail.com" && <Link to='/my-books'>My Books</Link>}
          {user && user.email == "admin@gmail.com" && <Link to='/admin'>Admin</Link>}
        </div>
      </div>
      <div className='rightSide'>
        <Link to='/'>Welcome</Link>
        {!user && <Link to='/sign-in'>Sign In</Link>}
        {user && <Link to='/' onClick={logOut}>Sign Out</Link>}
        <Link to='/catalog'>Catalog</Link>
        {user && user.email != "admin@gmail.com" && <Link to='/my-books'>My Books</Link>}
        {user && user.email == "admin@gmail.com" && <Link to='/admin'>Admin</Link>}
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
    

  );
}

export default NavBar;
