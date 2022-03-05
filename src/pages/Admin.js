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
        amount: amount
      })
      .then(()=> {
        console.log('adddoc ran')
        resetComps();
      })

    }

  }

  function returnBook(e){
    e.preventDefault();
    console.log('return book clicked')
    
    getDocs(emailQuery).then((snapshot)=>{
      const user = snapshot.docs[0];
      if(user){
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

  return (
    <div>
      <h1>Admin</h1>

      <div>
        <h3>Checkout Book</h3>
        <form>
            <div>Email <input required type="email" onInput={(e)=> setEmail(e.target.value)}/></div>
            <div>Book Id <input required type="text" onInput={(e)=> setBookId(e.target.value)}/></div> 
            <div>Days Checked Out <input type="number" /></div> 
            <input type="submit" value="Checkout"/>
        </form>
      </div>

      <div>
        <h3>Return Book</h3>
        <form onSubmit={returnBook}>
            <div>Email <input required type="email" onInput={(e)=> setEmail(e.target.value)}/></div>
            <div>Book Id <input required type="text" onInput={(e)=> setBookId(e.target.value)}/></div> 
            <input type="submit" value="Return book"/>
        </form>
      </div>

      {/* <div>
        <h3>Update Catalog</h3>
        <form>
            <div>Book Id<input type="text" /></div>
            <div>Title <input type="text" /></div> 
            <div>Author <input type="text" /></div> 
            <div>In Stock <input type="number" /></div> 
            <div><button type="submit">Add Book</button> <button type="submit">Update Book</button> <button type="submit">Delete Book</button></div>
        </form>
      </div> */}

      <div>
        <h3>Add book</h3>
        <form onSubmit={addBook}>
          <div>Title<input required type="text" value={title} onChange={(e)=> setTitle(e.target.value)}/></div>
          <div>Author <input required type="text" value={author} onChange={(e)=> setAuthor(e.target.value)}/></div> 
          <div>Description <input required type="text" value={description} onChange={(e)=> setDescription(e.target.value)}/></div> 
          <div>In Stock <input required type="number" value={amount} onChange={(e)=> setAmount(e.target.value)}/></div>
          <input type="submit" value="Add book"/>
        </form>
      </div>
    </div>
  ) 
}

export default Admin;
