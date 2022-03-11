import React from 'react';
import Select from 'react-select';
import '../styles/Admin.css';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, onSnapshot} from 'firebase/firestore';
import { useState, useEffect } from 'react';

function Admin({user, books}) {
  const usersColRef = collection(db, 'users');
  const booksColRef = collection(db, 'books');
  

  //users state has user id
  const [users, setUsers] = useState([]);

  //options state holds options to populate dropdown {label: "", value: theValue}
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [bookId, setBookId] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersColRef);
      setUsers(data.docs.map((doc) => {return ({ ...doc.data(), id: doc.id }) }));
    }
    getUsers();
    resetStates();
    //console.log('catalog use effect ran. User:', user)

    onSnapshot(usersColRef, (snapshot)=> {
      let users = []
      // console.log('onsnap ran for usercol in admin(inside useeffect)')
      snapshot.docs.forEach((doc)=> {
        users.push({...doc.data(), id: doc.id})
      })
      setUsers(users)
    })

  }, []);

  //populates options state depending on if you want isCheckedOut to be true or false
  function populateOptions(isCheckedOut){
    const user = users.find((u)=> {return u.email == email})
    if(!user) {console.log('invalid user'); return;}
    
    const holds = user.books.filter((book)=> book.isCheckedOut == isCheckedOut);
    const opts = []

    holds.forEach((hold)=> {
      opts.push({
        label: getBookFromId(hold.bookId).title,
        value: hold.bookId
      })
    })

    setOptions(opts)
  }

  function handleSelect(option){
    // console.log('handleselect ran', option)
    setBookId(option.value);
    setSelected(option);
  }

  function getBookFromId(id) {
    const book = books.find(book => book.id == id);
    return book;
  }

  function selectForm(formName){
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      if(form.id === formName) {form.hidden = false}
      else {form.hidden = true}
    });
  }

  function addBook(e){
    e.preventDefault();
    console.log('add book clicked');
    if(amount <= 0){
      alert('Invalid Amount')
    }else{
      addDoc(booksColRef, {
        title: title,
        author: author,
        desc: description,
        amount: parseInt(amount)
      })
      .then(()=> {
        console.log('adddoc ran')
        resetStates();
      })

    }
  }

  function checkoutBook(e){
    e.preventDefault();
    console.log('checkout clicked')
    const user = users.find((u)=> {return u.email == email})

    const docRef = doc(db, 'users', user.id)

    const theBook = user.books.find(book => book.bookId == bookId)
    theBook.isCheckedOut = true;
    // console.log(user.books);

    
    updateDoc(docRef, {
      books: user.books
    }).then(()=> {
      console.log('checkout successful')
      resetStates();
    }).catch((err)=> {
      console.log(err.message)
    })


  }

  function returnBook(e){
    e.preventDefault();
    const user = users.find((u)=> {return u.email== email})
    const returnArr = user.books.filter((book)=> {return ((book.bookId != bookId) || (book.bookId == bookId && !book.isCheckedOut))})
    const docRef = doc(db, 'users', user.id)

    updateDoc(docRef, {
      books: returnArr
    }).then(()=> {
      console.log('return successful')
      resetStates();
    }).catch((err)=> {
      console.log(err.message)
    })

  }

  function deleteBook(e){
    e.preventDefault()
    // console.log('deletebook ran')

    //first erase book from all users
    //doesnt update users state directly
    const usersWithBook = users.filter((user)=> {return user.books.some((book)=> {return book.bookId == bookId})})
    usersWithBook.forEach((user)=> {
      const docRef = doc(db, 'users', user.id)
      const newArr = user.books.filter((book)=> {return book.bookId != bookId} )
      user.books = newArr

      //update firebase field
      updateDoc(docRef, {
        books: newArr
      }).then(()=> {
        // console.log('book deleted from books field for user', bookId ,user.email)
        resetStates();
      }).catch((err)=> {
        console.log(err.message)
      })
    })

    //then delete book from bookscol
    const docRef = doc(db, 'books', bookId)
    deleteDoc(docRef)
      .then(()=> {
        // console.log('book deleted from bookcol')
        resetStates();
      })
      .catch((err)=> {
        console.log(err.message);
      })

  }

  function resetStates(){
    setTitle('');
    setAuthor('');
    setDescription('');
    setAmount(0);
    setEmail('');
    setBookId('');
    setOptions([])
    setSelected(null)
    console.log('states reset')
  }

  return (
    <div>
    { ((user && user.email == "admin@gmail.com") &&
      <div id='admin-page'>
        <h1>Admin</h1>

        <div>
          <h3 className='header' onClick={()=>selectForm("checkout-form")}>Checkout Book</h3>
          <form id='checkout-form' hidden={true} onSubmit={checkoutBook}>
            <div>User Email <input required type="email" value={email} onInput={(e)=> setEmail(e.target.value)}/> <button type='button' onClick={()=> {populateOptions(false)}}>Get Holds</button></div>
            <div>Reserved Books
              <Select options={options} onChange={handleSelect} value={selected} isSearchable={false}/>
            </div>
            <div>Book Id <input required type="text" value={bookId} onChange={(e)=> setBookId(e.target.value)}/></div> 
            {/* <div>Days Checked Out <input required type="number" /></div>  */}
            <button type="submit">Checkout Book</button>
          </form>
        </div>

        <div>
          <h3 className='header' onClick={()=>selectForm("add-form")}>Add Book</h3>
          <form id='add-form' hidden={true} onSubmit={addBook}>
              <div>Title <input required type="text" value={title} onInput={(e)=> setTitle(e.target.value)}/></div> 
              <div>Author <input required type="text" value={author} onInput={(e)=> setAuthor(e.target.value)}/></div>
              <div>Description <input required type="text" value={description} onInput={(e)=> setDescription(e.target.value)}/></div>  
              <div>In Stock <input required type="number" value={amount} onInput={(e)=> setAmount(e.target.value)}/></div> 
              <div><button type="submit">Add Book</button></div>
          </form>
        </div>

        <div>
          <h3 className='header' onClick={()=>selectForm("delete-form")}>Delete Book</h3>
          <form id='delete-form' hidden={true} onSubmit={deleteBook}>
              <div>Book Id<input required type="text" value={bookId} onInput={(e)=> setBookId(e.target.value)}/></div>
              <div><button type="submit">Delete Book</button></div>
          </form>
        </div>

        <div>
          <h3 className='header' onClick={()=>selectForm("return-form")}>Return Book</h3>
          <form id='return-form' hidden={true} onSubmit={returnBook}>
            <div>User Email <input required type="email" value={email} onInput={(e)=> setEmail(e.target.value)}/> <button type='button' onClick={()=> populateOptions(true)}>Get Books</button></div>
            <div>Checked Out Books 
              <Select options={options} onChange={handleSelect} value={selected} isSearchable={false}/> 
            </div>
            <div>Book Id <input required type="text" value={bookId} onChange={(e)=> setBookId(e.target.value)}/> </div>
            <button type="submit">Submit</button>
          </form>
        </div>

      </div> )
      ||
      (<h2>Access Denied</h2>)
    }
    </div>
  ) 
}

export default Admin;