import React, { useState } from 'react';
import Card from './components/Card'
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import LoggedIn from './pages/LoggedIn'
import {Route} from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  }

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);
  }

  const Logout = () => {
    console.log("Logout");
  }

  return (
    <div className='App'>

      <NavBar />
    
      {/* <Card 
        title='Card Title'
        imageUrl='https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
        body='Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ex voluptas eum error quia magni quisquam minima esse, culpa labore dolore eaque adipisci doloribus placeat rem quod hic iusto vero!' 
      /> */}

      <Route exact path='/' component={Welcome} />
      <Route exact path='/sign-in' component={SignIn} />
      <Route exact path='/projects' component={Projects} />
      <Route exact path='/contact' component={Contact} />
      <Route exact path='/logged-in' component={LoggedIn} />

    </div>
  );
}

export default App;
