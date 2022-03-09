import React from 'react';
import '../styles/Admin.css';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { useState, useEffect } from 'react';

function Admin({user, books}) {
  const usersColRef = collection(db, 'users');
  const booksColRef = collection(db, 'books');
  
  const [users, setUsers] = useState([]);

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
    //console.log('catalog use effect ran. User:', user)

  }, []);

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

  function getHoldsFromEmail() {
    const email = document.getElementById("email-input1").value
    const user = users.find(user => user.email == email);
    const selectElem = document.getElementById("hold-list");

    while(selectElem.firstChild){
      selectElem.removeChild(selectElem.firstChild);
    }

    if(!user){
      alert("User does not exist")
      updateBookId(1)
      return;
    }

    const defaultOption = document.createElement("option");
    defaultOption.innerHTML = "--Select a Book--";
    defaultOption.value = "";
    selectElem.appendChild(defaultOption)

    const holds = user.books.filter(book => !book.isCheckedOut);

    holds.forEach(book => {
      const option = document.createElement("option");
      option.innerHTML = getBookFromId(book.bookId).title;
      option.value = book.bookId;
      selectElem.appendChild(option);
    })

    updateBookId(1)
  }

  function updateBookId(id) {
    const bookIdInput = document.getElementById("book-id" + id);
    const selectElemList = ["hold-list", "checkout-list"];
    const selectElem = document.getElementById(selectElemList[id - 1]);
    if(selectElem.childNodes.length == 0){
      bookIdInput.value = "";
      return;
    }

    bookIdInput.value = selectElem.value;
  }

  function getCheckedOutFromEmail() {
    const email = document.getElementById("email-input2").value
    const user = users.find(user => user.email == email);
    const selectElem = document.getElementById("checkout-list");

    while(selectElem.firstChild){
      selectElem.removeChild(selectElem.firstChild);
    }

    if(!user){
      alert("User does not exist")
      updateBookId(2)
      return;
    }

    const defaultOption = document.createElement("option");
    defaultOption.innerHTML = "--Select a Book--";
    defaultOption.value = "";
    selectElem.appendChild(defaultOption)

    const checkedOut = user.books.filter(book => book.isCheckedOut);

    checkedOut.forEach(book => {
      const option = document.createElement("option");
      option.innerHTML = getBookFromId(book.bookId).title;
      option.value = book.bookId;
      selectElem.appendChild(option);
    })

    updateBookId(2)
  }

  function addBook(e){
    e.preventDefault();
    console.log('add book clicked');
    if(amount <= 0){
      console.log('invalid amount')
    }else{
      addDoc(booksColRef, {
        title: title,
        author: author,
        desc: description,
        amount: parseInt(amount)
      })
      .then(()=> {
        console.log('adddoc ran')
        resetComps();
      })

    }
  }

  function resetComps(){
    setTitle('');
    setAuthor('');
    setDescription('');
    setAmount(0);
    setEmail('');
    setBookId('');
    console.log('comps reset')
  }

  return (
    <div>
    { ((user && user.email == "admin@gmail.com") &&
      <div id='admin-page'>
        <h1>Admin</h1>

        <div>
          <h3 className='header' onClick={()=>selectForm("checkout-form")}>Checkout Book</h3>
          <form id='checkout-form' hidden='true'>
            <div>User Email <input type="text" id='email-input1' /> <button type='button' onClick={getHoldsFromEmail}>Get Holds</button></div>
            <div>Reserved Books
              <select id='hold-list' onChange={()=>{updateBookId(1)}}>

              </select>
              <br />
            </div>
            <div>Book Id <input type="text" id='book-id1' /></div> 
            <div>Days Checked Out <input type="number" /></div> 
            <button type="submit">Checkout Book</button>
          </form>
        </div>

        <div>
          <h3 className='header' onClick={()=>selectForm("add-form")}>Add Book</h3>
          <form id='add-form' hidden='true' onSubmit={addBook}>
              <div>Title <input required type="text" value={title} onInput={(e)=> setTitle(e.target.value)}/></div> 
              <div>Author <input required type="text" value={author} onInput={(e)=> setAuthor(e.target.value)}/></div>
              <div>Description <input required type="text" value={description} onInput={(e)=> setDescription(e.target.value)}/></div>  
              <div>In Stock <input required type="number" value={amount} onInput={(e)=> setAmount(e.target.value)}/></div> 
              <div><button type="submit">Add Book</button></div>
          </form>
        </div>

        <div>
          <h3 className='header' onClick={()=>selectForm("delete-form")}>Delete Book</h3>
          <form id='delete-form' hidden='true'>
              <div>Book Id<input required type="text" value={bookId} onInput={(e)=> setBookId(e.target.value)}/></div>
              <div><button type="submit">Delete Book</button></div>
          </form>
        </div>

        <div>
          <h3 className='header' onClick={()=>selectForm("return-form")}>Return Book</h3>
          <form id='return-form' hidden='true'>
            <div>User Email <input type="text" id='email-input2'/> <button type='button' onClick={getCheckedOutFromEmail}>Get Books</button></div>
            <div>Checked Out Books 
              <select id='checkout-list'>
                
              </select> 
              <br />
            </div>
            <div>Book Id <input type="text" /> </div>
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
