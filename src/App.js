import React from 'react';
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn'
import Catalog from './pages/Catalog'
import BookInfo from './pages/BookInfo'
import MyBooks from './pages/MyBooks'
import Admin from './pages/Admin'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {

  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route exact path='/sign-in' component={SignIn} />
          <Route exact path='/catalog' component={Catalog} />
          <Route exact path='/catalog/:id' component={BookInfo} />
          <Route exact path='/my-books' component={MyBooks} />
          <Route exact path='/admin' component={Admin} />
        </Switch>
        <Footer />
      </Router>
    
    </div>
  );
}

export default App;
