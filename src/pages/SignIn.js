import React from 'react';

function About() {
  return (
    <div>
      <h1>Sign In</h1>
      <form action='/login' method='POST'>
        <input type='text' name='id'/><br/>
        <input type='text' name='password'/><br/>
        <input type='submit' value='Sign In' />
      </form>
    </div>
  ) 
}

export default About;
