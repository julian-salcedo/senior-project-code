import React from 'react';
import { useCookies } from "react-cookie";

function LoggedIn() {
  const [cookies, setCookie] = useCookies();
  console.log("User: ", cookies)
  console.log("Username: " + cookies.username)
  const {user} = cookies
  return (
    <div>
      <h1>Welcome Back {user.username}</h1>
    </div>
  ) 
}

export default LoggedIn;
