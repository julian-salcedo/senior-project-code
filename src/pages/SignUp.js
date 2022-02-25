import React, { useState } from 'react';
import '../styles/SignIn.css';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignUp() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit(e){
    e.preventDefault();
    console.log('form submitted')

    
  }
  return (
    <div className='sign-in-page'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
                <td>
                    <p>First Name</p>
                    <input required type='text' name='firstName' value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                </td>
                <td>
                    <p>Last Name</p>
                    <input required type='text' name='lastName' value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Email Address</p>
                    <input required type='email' name='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </td>
                <td>
                    <p>Password</p>
                    <input required type='text' name='password' value={password} onChange={(e)=> setPassword(e.target.value)}/><br/>
                </td>
            </tr>

          </tbody>
        </table>
        <input type='submit' value='Sign Up' />
      </form>
      <p>Already have an account?</p>
      <a href='/sign-in'>Sign In</a>
    </div>
  ) 
}

export default SignUp;
