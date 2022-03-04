import React from 'react';
import '../styles/Admin.css';

function Admin() {
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
        <form id='checkout-form' hidden='true'>
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
    </div>
  ) 
}

export default Admin;
