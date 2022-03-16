import React, { useState } from 'react';
import '../styles/SignIn.css';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore';
import '../styles/SignUp.css';

function SignUp({user}) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();


  function handleSubmit(e){
    e.preventDefault();
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
        <div className='sign-in-message'>
          Sign Up
        </div>
        <div className='sign-in-form-container'>
          <form onSubmit={handleSubmit}>
            <div className='sign-in-form'>
              <input 
                className=''
                required type='text' 
                name='firstName' 
                value={firstName} 
                onChange={(e)=> setFirstName(e.target.value)}
                placeholder='First Name'
              />
              <input 
                required type='text' 
                name='lastName' 
                value={lastName} 
                onChange={(e)=> setLastName(e.target.value)}
                placeholder='Last Name'
              />
              <input 
                className=''
                required type='email' 
                name='email' 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)}
                placeholder='Email'
              />
              <input 
                required type='password' 
                name='password' value={password} 
                onChange={(e)=> setPassword(e.target.value)}
                placeholder='Password'
              />

              <input type='submit' value='Sign Up' />
            </div>
          </form>
        </div>
      </div>)
      || (<h2>Already Logged In</h2>)
    }
    </div>
  ) 
}

export default SignUp;
