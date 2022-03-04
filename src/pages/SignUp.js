import React, { useState } from 'react';
import '../styles/SignIn.css';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useHistory, Link } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore';

function SignUp({user}) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();


  function handleSubmit(e){
    e.preventDefault();
    // console.log('form submitted')
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred)=> {
        console.log('user created', cred.user.uid)
        setDoc(doc(db, 'users', cred.user.uid), {
          first: firstName,
          last: lastName,
          email: email,
          books: []
        }).then(()=> {
          console.log('user added to db')
        }).catch((err)=> {
          console.log(err.message)
        })

        history.push('/')

      })
      .catch((err)=> {
        console.log(err.message);
      })

    
  }
  return (
    <div>
    { (!user &&
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
        <Link to='/sign-in'>Sign In</Link>
      </div>)
      || (<h2>Already Logged In</h2>)
    }
    </div>
  ) 
}

export default SignUp;
