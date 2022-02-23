import {useState} from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth'

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit(e){
    e.preventDefault();
    console.log('form submitted');
    signInWithEmailAndPassword(auth, email, password)
      .then((cred)=>{
        console.log('user signed in', cred.user.email);
      })
      .catch((err)=>{
        console.log(err.message);
      })
    
  }
  return (
    <div className='sign-in-page'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <p>Email Address</p>
        <input required type='email' name='email' value={email} onChange={(e)=> setEmail(e.target.value)}/><br/>
        <p>Password</p>
        <input required type='password' name='password' value={password} onChange={(e)=> setPassword(e.target.value)}/><br/>
        <input type='submit' value='Sign In' />
      </form>
      <p>Don't have an account?</p>
      <a href='/sign-up'>Sign Up</a>
    </div>
  ) 
}

export default SignIn;
