import React from 'react';
import Card from './components/Card'
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn'
import Catalog from './pages/Catalog'
import Contact from './pages/Contact'
import {Route} from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {

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
      <Route exact path='/catalog' component={Catalog} />
      <Route exact path='/contact' component={Contact} />

    </div>
  );
}

export default App;
