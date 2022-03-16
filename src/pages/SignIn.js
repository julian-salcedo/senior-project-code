import {useState} from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useHistory, Link } from 'react-router-dom'

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();


  function handleSubmit(e){
    e.preventDefault();
    console.log('form submitted');
    signInWithEmailAndPassword(auth, email, password)
      .then((cred)=>{
        console.log('user signed in', cred.user.email);
        document.getElementById('error-message').innerHTML = "";
        history.push('/');
      })
      .catch((err)=>{
        console.log(err.message);
        document.getElementById('error-message').innerHTML = "Incorrect Email or Password";
      })
    
  }
  return (
    <div className='sign-in-page'>
      <div className='sign-in-message'>
        <strong>Hey, good to see you again!</strong>
      </div>
      <div className='sign-in-form-container'>
        <form onSubmit={handleSubmit}>
          <div className='sign-in-title'>
            Sign in
          </div>
          <div className='sign-in-form'>
            <input
              required type='email' 
              name='email' value={email} 
              onChange={(e)=> setEmail(e.target.value)}
              placeholder='Email'
            />
            <input 
              required type='password' 
              name='password' value={password} 
              onChange={(e)=> setPassword(e.target.value)}
              placeholder='Password'
            />
            <input type='submit' value='Sign In'/>
            <div className='sign-in-separater'>
              <div className='line'></div>
              <div className='text'>or</div>
              <div className='line'></div>
            </div>
            <div className='sign-in-sign-up'>
              <Link to='/sign-up'>
                <button>Sign Up</button>
              </Link>
            </div>
            <p id='error-message'></p>
          </div>
        </form>
      </div>
    </div>
  ) 
}

export default SignIn;
