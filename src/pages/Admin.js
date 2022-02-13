import React from 'react';

function Admin() {
  return (
    <div>
      <h1>Admin</h1>
      <div>
        <h3>Checkout Book</h3>
        <form>
            <div>User Id <input type="text" /></div>
            <div>Book Id <input type="text" /></div> 
            <div>Days Checked Out <input type="number" /></div> 
            <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <h3>Return Book</h3>
        <form>
            <div>User Id <input type="text" /></div>
            <div>Book Id <input type="text" /></div> 
            <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <h3>Update Catalog</h3>
        <form>
            <div>Book Id<input type="text" /></div>
            <div>Title <input type="text" /></div> 
            <div>Author <input type="text" /></div> 
            <div>In Stock <input type="number" /></div> 
            <div><button type="submit">Add Book</button> <button type="submit">Update Book</button> <button type="submit">Delete Book</button></div>
        </form>
      </div>
    </div>
  ) 
}

export default Admin;
