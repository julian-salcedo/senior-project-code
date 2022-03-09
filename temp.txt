import { db } from '../firebaseConfig';
import { useState } from 'react';
import { getDocs, addDoc, collection, query, where, updateDoc, doc } from 'firebase/firestore';


function Admin() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const [email, setEmail] = useState('');
  const [bookId, setBookId] = useState('');

  const booksColRef = collection(db, 'books')
  const usersColRef = collection(db, 'users')
  
  const emailQuery = query(usersColRef, where("email", "==", email))
  
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

  function returnBookWithId(e){
    e.preventDefault();
    console.log('return book with id clicked')
    
    getDocs(emailQuery).then((snapshot)=>{
      const user = snapshot.docs[0];
      if(user){
        if(!bookId){
          console.log('no book id');
          return;
        }
        const id = user.id;
        const data = user.data();
        const books = data.books;
        const docRef = doc(db, 'users', id);
        console.log(id, data, books);

        const newBooks = books.filter((bookObj)=> {
          return ((bookObj.bookId != bookId) || ((bookObj.bookId == bookId) && !bookObj.isCheckedOut));
        })

        // console.log(newBooks);

        updateDoc(docRef, {
          books: newBooks
        })
        .then(()=> console.log('update doc fired'))
        .catch((err)=> console.log(err.message))


        e.target.reset();
        resetComps();
      }else{
        console.log('user no exist')
      }
      
    })

    
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

  function selectForm(formName){
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      if(form.id === formName) {form.hidden = false}
      else {form.hidden = true}
    });
  }

  return (
    <div id='admin-page'>
      <h1>Admin</h1>

      <div>
        <h3 className='header' onClick={()=>selectForm("checkout-form")}>Checkout Book</h3>
        <form id='checkout-form' hidden={true}>
          <div>User Email <input type="text" /> <button>Get Holds</button></div>
          <div>Reserved Books
            <select>

            </select>
            <br /> OR
          </div>
          <div>Book Id <input type="text" /></div> 
          <div>Days Checked Out <input type="number" /></div> 
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* <div>
        <h3 className='header' onClick={()=>selectForm("catalog-form")}>Update Catalog</h3>
        <form id='catalog-form' hidden='true'>
            <div>Book Id<input type="text" /></div>
            <div>Title <input type="text" /></div> 
            <div>Author <input type="text" /></div> 
            <div>In Stock <input type="number" /></div> 
            <div><button type="submit">Add Book</button> <button type="submit">Update Book</button> <button type="submit">Delete Book</button></div>
        </form>
      </div> */}

      <div>
        <h3 className='header' onClick={()=>selectForm("add-form")}>Add Book</h3>
        <form id='add-form' hidden={true} onSubmit={addBook}>
            <div>Title <input required type="text" value={title} onChange={(e)=> setTitle(e.target.value)}/></div> 
            <div>Author <input required type="text" value={author} onChange={(e)=> setAuthor(e.target.value)}/></div>
            <div>Description <input required type="text" value={description} onChange={(e)=> setDescription(e.target.value)}/></div> 
            <div>In Stock <input required type="number" value={amount} onChange={(e)=> setAmount(e.target.value)}/></div> 
            <input type="submit" value="Add Book"/>
        </form>
      </div>

      <div>
        <h3 className='header' onClick={()=>selectForm("return-form")}>Return Book</h3>
        <form id='return-form' hidden={true} onSubmit={returnBookWithId}>
          <div>User Email <input required type="email" onInput={(e)=> setEmail(e.target.value)}/> <button>Get Books</button></div>
          <div>Checked Out Books 
            <select>
              
            </select> 
            <br /> OR
          </div>
          <div>Book Id <input type="text" onInput={(e)=> setBookId(e.target.value)}/> </div>
          <input type="submit" value="Return with ID"/>
        </form>
      </div>

    </div>
    ) 
  }
  
  export default Admin;
  
  //keep for reference:
  // <div>
  //   <h1>Admin</h1>

  //   <div>
  //     <h3>Checkout Book</h3>
  //     <form>
  //         <div>Email <input required type="email" onInput={(e)=> setEmail(e.target.value)}/></div>
  //         <div>Book Id <input required type="text" onInput={(e)=> setBookId(e.target.value)}/></div> 
  //         <div>Days Checked Out <input type="number" /></div> 
  //         <input type="submit" value="Checkout"/>
  //     </form>
  //   </div>

  //   <div>
  //     <h3>Return Book</h3>
  //     <form onSubmit={returnBookWithId}>
  //         <div>Email <input required type="email" onInput={(e)=> setEmail(e.target.value)}/></div>
  //         <div>Book Id <input required type="text" onInput={(e)=> setBookId(e.target.value)}/></div> 
  //         <input type="submit" value="Return book"/>
  //     </form>
  //   </div>

  //   <div>
  //     <h3>Add book</h3>
  //     <form onSubmit={addBook}>
  //       <div>Title<input required type="text" value={title} onChange={(e)=> setTitle(e.target.value)}/></div>
  //       <div>Author <input required type="text" value={author} onChange={(e)=> setAuthor(e.target.value)}/></div> 
  //       <div>Description <input required type="text" value={description} onChange={(e)=> setDescription(e.target.value)}/></div> 
  //       <div>In Stock <input required type="number" value={amount} onChange={(e)=> setAmount(e.target.value)}/></div>
  //       <input type="submit" value="Add book"/>
  //     </form>
  //   </div>
  // </div>