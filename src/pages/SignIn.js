import {useState} from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth'

function About() {
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
