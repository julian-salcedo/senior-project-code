import React, { useState, useEffect } from 'react';
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Catalog from './pages/Catalog'
import BookInfo from './pages/BookInfo'
import MyBooks from './pages/MyBooks'
import Admin from './pages/Admin'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';

function App() {

  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth, (userAuth)=>{
      //console.log('auth state change ran from app', userAuth)
      if(userAuth){
        const id = userAuth.uid;
        const docRef = doc(db, 'users', id)
        setUid(id)
  
        getDoc(docRef)
          .then((doc)=> {
            setUser(doc.data())
            //console.log('getdoc ran', user)
          })
          .catch((err)=> {
            console.log(err.message)
          })
        onSnapshot(docRef, (doc)=> {
          setUser(doc.data())
          //console.log('onsnapshot in appjs ran: ', doc.data())

        });
        }else{
        setUser(null);
        setUid(null);
      }

    })
    //console.log('app use effect ran: ', user)
  }, [])


  return (
    <div className='App'>
      <Router>
        <NavBar user={user}/>
        <Switch>
          <Route exact path='/'><Welcome user={user}/></Route>
          <Route exact path='/sign-in'><SignIn /></Route>
          <Route exact path='/sign-up' component={SignUp} />
          <Route exact path='/catalog' ><Catalog user={user}/></Route>
          <Route exact path='/catalog/:id' ><BookInfo user={user} uid={uid}/> </Route>
          <Route exact path='/my-books' component={MyBooks} />
          <Route exact path='/admin' component={Admin} />
        </Switch>
        <Footer />
      </Router>
    
    </div>
  );
}

export default App;
