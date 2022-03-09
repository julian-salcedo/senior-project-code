import React from 'react';
import '../styles/Admin.css';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function Admin({user}) {
  const usersColRef = collection(db, 'users');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersColRef);
      setUsers(data.docs.map((doc) => {return ({ ...doc.data(), id: doc.id }) }));
    }
    getUsers();
    //console.log('catalog use effect ran. User:', user)

  }, []);

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

    if(!user){
      console.log("user not found");
      selectElem.childNodes.forEach(child => child.remove())
      return;
    }

    const holds = user.books.filter(book => !book.isCheckedOut);
    selectElem.childNodes.forEach(child => child.remove())
    console.log(user);

    holds.forEach(book => {
      const option = document.createElement("option");
      option.innerHTML = book.title;
      option.value = book.id;
      selectElem.appendChild(option);
    })
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
              <select id='hold-list'>

              </select>
              <br /> OR
            </div>
            <div>Book Id <input type="text" /></div> 
            <div>Days Checked Out <input type="number" /></div> 
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h3 className='header' onClick={()=>selectForm("catalog-form")}>Update Catalog</h3>
          <form id='catalog-form' hidden='true'>
              <div>Book Id<input type="text" /></div>
              <div>Title <input type="text" /></div> 
              <div>Author <input type="text" /></div> 
              <div>In Stock <input type="number" /></div> 
              <div><button type="submit">Add Book</button> <button type="submit">Update Book</button> <button type="submit">Delete Book</button></div>
          </form>
        </div>
        <div>
          <h3 className='header' onClick={()=>selectForm("return-form")}>Return Book</h3>
          <form id='return-form' hidden='true'>
            <div>User Email <input type="text" /> <button>Get Books</button></div>
            <div>Checked Out Books 
              <select>
                
              </select> 
              <br /> OR
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