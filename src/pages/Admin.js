import React from 'react';
import Select from 'react-select';
import '../styles/Admin.css';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, doc, onSnapshot, deleteDoc, Timestamp, getDoc} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useState, useEffect } from 'react';

function Admin({user, books}) {
  const usersColRef = collection(db, 'users');
  const booksColRef = collection(db, 'books');
  const storage = getStorage();

  //users state has user id
  const [users, setUsers] = useState([]);

  //options state holds options to populate dropdown {label: "", value: theValue}
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [imageFile, setImageFile] = useState('');
  const [filePath, setFilePath] = useState("");
  const [email, setEmail] = useState('');
  const [bookId, setBookId] = useState('');
  const [dueDate, setDueDate] = useState('')

  const todayString = (new Date()).toISOString().substring(0, 10)

  const checkoutLabel = document.getElementById('checkout-label')
  const addingBookLabel = document.getElementById('adding-book-label')
  const deleteLabel = document.getElementById('delete-label')
  const returnLabel = document.getElementById('return-label')

  useEffect(() => {
    resetStates();

    onSnapshot(usersColRef, (snapshot)=> {
      let users = []
      snapshot.docs.forEach((doc)=> {
        users.push({...doc.data(), id: doc.id})
      })
      setUsers(users)
    })

  }, []);

  function getOverdueDays(user, bookId){
      if(!user || !bookId){
        return ""
      }
      const theBook = user.books.find(book => book.bookId == bookId)
      if(!theBook){
        return ""
      }
      if(!theBook.isCheckedOut){
        return ""
      }

      let daysLate = Math.floor((Timestamp.now().seconds - theBook.dueDate.seconds) / 86400)
      if(daysLate > 0){
        return " (" + daysLate + " DAYS LATE)"
      }
      
      return ""
    }

  //populates options state depending on if you want isCheckedOut to be true or false
  function populateOptions(isCheckedOut){
    const user = users.find((u)=> {return u.email == email})
    if(!user) {console.log('invalid user'); return;}
    
    const holds = user.books.filter((book)=> book.isCheckedOut == isCheckedOut);
    const opts = []

    holds.forEach((hold)=> {
      opts.push({
        label: (getBookFromId(hold.bookId).title + getOverdueDays(user, hold.bookId)),
        value: hold.bookId
      })
    })

    setOptions(opts)
  }

  function handleSelect(option){
    setBookId(option.value);
    setSelected(option);
  }

  function getBookFromId(id) {
    const book = books.find(book => book.id == id);
    return Object.create(book);
  }

  function selectForm(formName){
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      if(form.id === formName) {form.hidden = false}
      else {form.hidden = true}
    });
    checkoutLabel.parentNode.hidden = true
    addingBookLabel.parentNode.hidden = true
    deleteLabel.parentNode.hidden = true
    returnLabel.parentNode.hidden = true
    resetStates();
  }

  function addBook(e){
    e.preventDefault();
    addingBookLabel.parentNode.hidden = false

    if(amount <= 0){
      addingBookLabel.innerHTML = 'Invalid Amount'
      return
    }

    //adding a book without an image
    if(!imageFile){
      addingBookLabel.innerHTML = "Adding Book..."
      addDoc(booksColRef, {
        title: title,
        author: author,
        desc: description,
        amount: parseInt(amount),
        imageURL: ""
      })
      .then(()=> {
        console.log('adddoc ran')
        addingBookLabel.innerHTML = "Successfully added book"
        resetStates();
      })
      .catch((err) => {
        console.log(err.message)
        addingBookLabel.innerHTML = "Error adding book: " + err.message
      })
      return
    }

    if(!(imageFile.type.includes("jpg") || imageFile.type.includes("jpeg") || imageFile.type.includes("png"))){
      addingBookLabel.innerHTML = "File must be an image"
      return
    }

    addingBookLabel.innerHTML = "Adding Book..."
    
    // Create the file metadata
    const metadata = {
      contentType: imageFile.type
    };

    // Upload file and metadata to the object
    const storageRef = ref(storage, '/' + imageFile.name);
    const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
    (snapshot) => {
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          addingBookLabel.innerHTML = "Error: storage/unauthorized"
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          addingBookLabel.innerHTML = "Error: storage/canceled"
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          addingBookLabel.innerHTML = "Error: storage/unknown"
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        addDoc(booksColRef, {
          title: title,
          author: author,
          desc: description,
          amount: parseInt(amount),
          imageURL: downloadURL
        })
        .then(()=> {
          console.log('adddoc ran')
          addingBookLabel.innerHTML = "Successfully added book with image"
          resetStates();
        })
        .catch((err)=>{
          console.log(err.message)
          addingBookLabel.innerHTML = "Error adding book with image: " + err.message
        })
      })
      .catch((err)=>{
        addingBookLabel.innerHTML = "Could not retrieve image URL"
      })
      }
    );
  }

  function checkoutBook(e){
    e.preventDefault();
    console.log('checkout clicked')
    const user = users.find((u)=> {return u.email == email})
    checkoutLabel.parentNode.hidden = false

    if(!user){
      checkoutLabel.innerHTML = "User not found"
      return
    }

    checkoutLabel.innerHTML = "Checking Out Book..."

    const docRef = doc(db, 'users', user.id)
    
    const theBook = user.books.find(book => book.bookId == bookId)
    let dueDate = document.getElementById('due-date-input').valueAsDate
    dueDate = new Timestamp((Date.parse(dueDate) + (dueDate.getTimezoneOffset() * 60 * 1000)) / 1000, 0)

    if(theBook && !theBook.isCheckedOut){
      theBook.isCheckedOut = true;
      theBook.dueDate = dueDate;
    }
    else if(theBook && theBook.isCheckedOut){
      checkoutLabel.innerHTML = "Book is already checked out by user"
      return
    }
    else if(books.find(book => book.id == bookId)){
      const bookInfo = books.find(book => book.id == bookId)
      if(bookInfo.amount == 0){
        checkoutLabel.innerHTML = "Book is out of stock"
        return
      }
      const bookRef = doc(db, 'books', bookInfo.id)
      updateDoc(bookRef, {
        amount: bookInfo.amount - 1
      })
        .then(() => console.log('book amount decremented'))
        .catch((err) => console.log(err.message))
      user.books.push({bookId: bookId, isCheckedOut: true, dueDate: dueDate})
    }
    else{
      checkoutLabel.innerHTML = "Book not found"
      return
    }
    
    updateDoc(docRef, {
      books: user.books
    }).then(()=> {
      console.log('checkout successful')
      checkoutLabel.innerHTML = "Successfully checked out book"
      resetStates();
    }).catch((err)=> {
      console.log(err.message)
      checkoutLabel.innerHTML = "Error checking out book: " + err.message
    })
  }

  

  function returnBook(e){
    e.preventDefault();
    returnLabel.parentNode.hidden = false
    const user = users.find((u)=> {return u.email== email})

    if(!user){
      returnLabel.innerHTML = "User not found"
      return
    }

    if(!user.books.find(book=> book.bookId == bookId && book.isCheckedOut)){
      returnLabel.innerHTML = "Book not found"
      return
    }
    returnLabel.innerHTML = "Returning Book..."
    const returnArr = user.books.filter((book)=> {return ((book.bookId != bookId) || (book.bookId == bookId && !book.isCheckedOut))})

    //update books field in user doc
    const userDocRef = doc(db, 'users', user.id)
    updateDoc(userDocRef, {
      books: returnArr
    }).then(()=> {
      const bookDocRef = doc(db, 'books', bookId);
      const bookInfo = books.find(book => book.id == bookId)
      updateDoc(bookDocRef, {
        amount: bookInfo.amount + 1
      }).then(()=> {
        returnLabel.innerHTML = 'Successfully returned book'
        resetStates();

      }).catch((err)=> {
        console.log(err.message)
        returnLabel.innerHTML = 'Error: ' + err.message
      })
    }).catch((err)=> {
      console.log(err.message)
      returnLabel.innerHTML = 'Error: ' + err.message
    })


  }

  function deleteBook(e){
    e.preventDefault()

    deleteLabel.parentNode.hidden = false
    
    if(!books.find(book=> book.id == bookId)){
      deleteLabel.innerHTML = "Book not found"
      return
    }
    
    deleteLabel.innerHTML = "Deleting Book..."
    
    //first erase book from all users
    //doesnt update users state directly

    //find users with book from users state
    const usersWithBook = users.filter((user)=> {return user.books.some((book)=> {return book.bookId == bookId})})
    usersWithBook.forEach((user)=> {
      const docRef = doc(db, 'users', user.id)
      const newArr = user.books.filter((book)=> {return book.bookId != bookId} )
      user.books = newArr

      //update firebase field
      updateDoc(docRef, {
        books: newArr
      }).then(()=> {
        resetStates();
      }).catch((err)=> {
        console.log(err.message)
      })
    })

    
    //delete img file from firebase storage
    const theBook = books.find((book)=> {return book.id == bookId})
    const imgUrl = theBook.imageURL
    
    //delete img file if exists
    if(imgUrl){
      const imgRef = ref(storage, imgUrl)
      deleteObject(imgRef)
      .then(()=> {
        console.log('img deleted')
        //then delete book from bookscol
        const docRef = doc(db, 'books', bookId)
        deleteDoc(docRef)
          .then(()=> {
            deleteLabel.innerHTML = "Successfully deleted book"
            resetStates();
          })
          .catch((err)=> {
            console.log(err.message);
            deleteLabel.innerHTML = "Error: " + err.message
          })
  
        })
        .catch((err)=> {
          console.log(err.message)
          deleteLabel.innerHTML = "Error: " + err.message
        })

    }else{
      const docRef = doc(db, 'books', bookId)
      deleteDoc(docRef)
        .then(()=> {
          deleteLabel.innerHTML = "Successfully deleted book"
          resetStates();
        })
        .catch((err)=> {
          console.log(err.message);
          deleteLabel.innerHTML = "Error: " + err.message
        })
    }
    

  }

  //resets all states except for users
  function resetStates(){
    setTitle('');
    setAuthor('');
    setDescription('');
    setAmount(0);
    setImageFile('');
    setFilePath("");
    setEmail('');
    setBookId('');
    setOptions([]);
    setSelected(null);
    setDueDate('');
    console.log('states reset')
  }

  return (
    <div>
    { ((user && user.email == "admin@gmail.com") &&
      <div className='admin-page'>
        <div className='admin-title'>Admin</div>
        
        <div>
          <div className='admin-header' onClick={()=>selectForm("add-form")}>
            Add Book
          </div>
          <form id='add-form' hidden={true} onSubmit={addBook}>
            <div>
              <div className='admin-subtitle'>Title</div>
              <input 
              className='admin-input'
              required type="text" 
              value={title} 
              onInput={(e)=> setTitle(e.target.value)}/>
              
              <div className='admin-subtitle'>Author</div>
              <input 
              className='admin-input'
              required type="text" 
              value={author} 
              onInput={(e)=> setAuthor(e.target.value)}/>
              
              <div className='admin-subtitle'>Description</div>
              <input 
              className='admin-input'
              required type="text" 
              value={description} 
              onInput={(e)=> setDescription(e.target.value)}/>

              <div className='admin-subtitle'>In Stock</div>
              <input 
              className='admin-input'
              required type="number" 
              value={amount} 
              onInput={(e)=> setAmount(e.target.value)}/>

              <div className='admin-subtitle'>Cover Image</div>
              <input 
              type="file" 
              value={filePath} 
              accept=".jpg, .jpeg, .png" 
              onInput={(e)=> {setImageFile(e.target.files[0]); setFilePath(e.target.value)}}/>
            </div>
            <div hidden><br /><div id='adding-book-label'>Adding Book...</div></div>
            <div className='admin-button-container'><button type="submit">Add Book</button></div>
          </form>
        </div>

        <div className='admin-tab'>
          <div className='admin-header' onClick={()=>selectForm("checkout-form")}>
            Checkout Book
          </div>
          <form id='checkout-form' hidden={true} onSubmit={checkoutBook}>

              <div className='admin-subtitle'>User Email</div>
              <input 
              className='admin-input'
              required type="email" 
              value={email} 
              onInput={(e)=> setEmail(e.target.value)} />
              <div className='admin-button-container'>
                <button type='button' onClick={()=> {populateOptions(false)}}>
                  Get Holds
                </button>
              </div>
            
              <div className='admin-subtitle'>Reserved Books</div>
              <Select className='admin-select' options={options} onChange={handleSelect} value={selected} isSearchable={false}/>
            
              <div className='admin-subtitle'>Book ID</div>
              <input 
              className='admin-input'
              required type="text" 
              value={bookId} 
              onChange={(e)=> setBookId(e.target.value)}/>

              <div className='admin-subtitle'>Due Date</div>
              <input 
              className='admin-input'
              required type="date" 
              value={dueDate} 
              onInput={(e)=> setDueDate(e.target.value)} 
              min={todayString} 
              id='due-date-input' />

            <div hidden><br />
              <div id='checkout-label'>Checking Out Book...</div>
            </div>
            <div className='admin-button-container'><button type="submit">Checkout Book</button></div>
          </form>
        </div>


        <div className='admin-tab'>
          <div className='admin-header' onClick={()=>selectForm("return-form")}>
            Return Book
          </div>
          <form id='return-form' hidden={true} onSubmit={returnBook}>

              <div className='admin-subtitle'>User Email</div>
              <input 
              className='admin-input'
              required type="email" 
              value={email} 
              onInput={(e)=> setEmail(e.target.value)}/> 
              <div className='admin-button-container'><button type='button' onClick={()=> populateOptions(true)}>Get Books</button></div> 
            
              <div className='admin-subtitle'>Checked Out Books</div> 
              <Select className='admin-select' options={options} onChange={handleSelect} value={selected} isSearchable={false}/> 

              <div className='admin-subtitle'>Book ID</div>
              <input 
              className='admin-input'
              required type="text" 
              value={bookId} 
              onChange={(e)=> setBookId(e.target.value)}/> 

            <div hidden><br /><div id='return-label'>Returning Book...</div></div>
            <div className='admin-button-container'><button type="submit">Return Book</button></div> 
          </form>
        </div>

        <div className='admin-tab'>
          <div className='admin-header' onClick={()=>selectForm("delete-form")}>
            Delete Book
          </div>
          <form id='delete-form' hidden={true} onSubmit={deleteBook}>
              <div>
                <div className='admin-subtitle'>Book ID</div>
                <input 
                className='admin-input'
                required type="text" 
                value={bookId} 
                onInput={(e)=> setBookId(e.target.value)}/></div>
              <div hidden><br /><div id='delete-label'>Deleting Book...</div></div>
              <div className='admin-button-container'><button type="submit">Delete Book</button></div>
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