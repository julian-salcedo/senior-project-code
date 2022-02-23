import React from 'react';
import '../styles/SignIn.css';

function SignUp() {
  return (
    <div className='sign-in-page'>
      <h1>Sign Up</h1>
      <form action='/action_page.php'>
        <table>
            <tr>
                <td>
                    <p>First Name</p>
                    <input type='text' name='firstName' required/>
                </td>
                <td>
                    <p>Last Name</p>
                    <input type='text' name='lastName' required/>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Email Address</p>
                    <input type='email' name='email' required/>
                </td>
                <td>
                    <p>Password</p>
                    <input type='text' name='password' required/><br/>
                </td>
            </tr>
        </table>
        <input type='submit' value='Sign Up' />
      </form>
      <p>Already have an account?</p>
      <a href='/sign-in'>Sign In</a>
    </div>
  ) 
}

export default SignUp;
