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
import { collection, getDocs, getDoc, doc, onSnapshot } from 'firebase/firestore';

function App() {
  const booksColRef = collection(db, 'books');

  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);
  const [books, setBooks] = useState([]);

  const [unsubUser, setUnsubUser] = useState();

  useEffect(()=>{
    onAuthStateChanged(auth, (userAuth)=>{
      // console.log('auth state change ran from app')
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
        //subscribe to current user's document
        const unsub = onSnapshot(docRef, (doc)=> {
          setUser(doc.data())
          // console.log('onsnapshot in appjs ran for user doc(inside onauthchanged)')
          setUnsubUser(()=> unsub);
        });
      }else{
        setUser(null);
        setUid(null);
        setUnsubUser();
      }

    })

    onSnapshot(booksColRef, (snapshot)=> {
      let books = [];
      snapshot.docs.forEach((doc)=> {
        books.push({...doc.data(), id: doc.id})
      })
      setBooks(books);
      // console.log('appjs onsnapshot ran for bookscol')
    })

    //console.log('catalog use effect ran.', books)
    
  }, [])


  return (
    <div className='App'>
      <Router>
        <NavBar user={user} unsubUser={unsubUser}/>
        <Switch>
          <Route exact path='/'><Welcome user={user}/></Route>
          <Route exact path='/sign-in'><SignIn/></Route>
          <Route exact path='/sign-up'><SignUp user={user}/></Route>
          <Route exact path='/catalog' ><Catalog books={books}/></Route>
          <Route exact path='/catalog/:id' ><BookInfo user={user} uid={uid} books={books} /> </Route>
          <Route exact path='/my-books'><MyBooks user={user} books={books} /></Route>
          <Route exact path='/admin'><Admin user={user} books={books} /></Route>
        </Switch>
        <Footer />
      </Router>
    
    </div>
  );
}

export default App;
