import React from 'react';
import Select from 'react-select';
import '../styles/Admin.css';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, doc} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from 'react';

function Admin({user, books}) {
  const usersColRef = collection(db, 'users');
  const booksColRef = collection(db, 'books');
  
  const [users, setUsers] = useState([]);

  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [imageFile, setImageFile] = useState('');
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
    console.log(imageFile)
    if(amount <= 0){
      alert('Invalid Amount')
      return
    }

    if(!imageFile){
      addDoc(booksColRef, {
        title: title,
        author: author,
        desc: description,
        amount: parseInt(amount),
        imageURL: ""
      })
      .then(()=> {
        console.log('adddoc ran')
        resetStates();
      })
      return
    }

    const storage = getStorage();
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
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
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
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        console.log("The download URL is " + downloadURL)
        addDoc(booksColRef, {
          title: title,
          author: author,
          desc: description,
          amount: parseInt(amount),
          imageURL: downloadURL
        })
        .then(()=> {
          console.log('adddoc ran')
          resetStates();
        })
      });
    }
    );

    

    
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
    resetStates();
  }

  function resetStates(){
    setTitle('');
    setAuthor('');
    setDescription('');
    setAmount(0);
    setImageFile('');
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
              <div>Cover Image <input type="file" onInput={(e)=> setImageFile(e.target.files[0])}/></div>
              <div><button type="submit">Add Book</button></div>
          </form>
        </div>

        <div>
          <h3 className='header' onClick={()=>selectForm("delete-form")}>Delete Book</h3>
          <form id='delete-form' hidden={true}>
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
            <button type="submit">Return Book</button>
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