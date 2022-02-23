import React from 'react';
import '../styles/SignIn.css';

function SignIn() {
  return (
    <div className='sign-in-page'>
      <h1>Sign In</h1>
      <form action='/action_page.php'>
        <p>Email Address</p>
        <input type='email' name='email' required/><br/>
        <p>Password</p>
        <input type='password' name='password' required/><br/>
        <input type='submit' value='Sign In' />
      </form>
      <p>Don't have an account?</p>
      <a href='/sign-up'>Sign Up</a>
    </div>
  ) 
}

export default SignIn;
