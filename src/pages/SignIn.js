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
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input required type='text' name='id' value={email} onChange={(e)=> setEmail(e.target.value)}/><br/>
        <input required type='text' name='password' value={password} onChange={(e)=> setPassword(e.target.value)} /><br/>
        <input type='submit' value='Sign In' />
      </form>
    </div>
  ) 
}

export default About;
