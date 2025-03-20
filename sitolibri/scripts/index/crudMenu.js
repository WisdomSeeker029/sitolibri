import { returnBook,renderEditBookWin, renderBooksDetails} from "../../data/books.js";
import {renderBorrowedBooks,displayBookList,updateBookDetails,displayEditionResults} from "../../data/books.js";
import {searchBooks} from "./crudMenu/ricerche.js";
import {renderWindow,setOperationResult} from "../utils/finestra.js";

export function renderCrudMenu(){
  let crudMenuHTML = '';
  crudMenuHTML += `
    <button class="icon-crud add js-add-book">
      <img src="img/icons/library_add.png" alt="Aggiungi">
      <p>Add book</p>
    </button>
    <button class="icon-crud delete js-delete-book">
      <img src="img/icons/library_delete.png" alt="Elimina">
      <p>Delete a book</p>
    </button>
    <button class="icon-crud edit js-edit-book">
      <img src="img/icons/edit.png" alt="Modifica">
      <p>Edit details</p>
    </button>
    <button class="icon-crud view js-view-book">
      <img src="img/icons/fullscreen.png" alt="Visualizza">
      <p>View more details</p>
    </button>
  `;
  document.querySelector('.crud-bar').innerHTML = crudMenuHTML;
  
  //se questi bottoni vengono inizializzati prima sono null perchè non sono ancora stati renderizzati
  const addBookButton = document.querySelector('.js-add-book');
  const deleteBookButton = document.querySelector('.js-delete-book');
  const editBookButton = document.querySelector('.js-edit-book');
  const viewBookButton = document.querySelector('.js-view-book');
  
  addBookButton.addEventListener('click', () => {
    renderAddBook();
    //renderCrudMenu(); //rigenerare il crudMenu risolve il fatto che searchButton sia null prima che sia generata la finestra per aprire l'addBook
  });

  deleteBookButton.addEventListener('click', () => {
    renderDeleteBookPopup();
    // renderCrudMenu(); //rigenerare il crudMenu risolve il fatto che searchButton sia null prima che sia generata la finestra per aprire l'addBook 
  });

  editBookButton.addEventListener('click', () => {
    renderEditDetails();
  });

  viewBookButton.addEventListener('click', () => {
    renderViewBookList();
    // renderCrudMenu();
  });

}

export function renderAddBook(){
  let contentHTML = `
    <div class="add-book-wrapper">
      <div class ="search-book-container">
        <input type="search" class="search-input" placeholder="Search for a book libro...">
        <input type="button" class="search-book-button" value="Search">
      </div>
    </div>
  `;
  renderWindow(contentHTML);
  const resultsBox = document.querySelector('.js-book-list');
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-book-button');

  async function performSearch() {
    const query = searchInput.value.trim();
    resultsBox.innerHTML = '<div class="loader"></div>';
    if(query){
        try {
            const results = await searchBooks(query);
            displayBookResults(results.slice(0,10)); // Show only first 10 results
        } catch (error) {
            console.error('Error during search:', error);
            resultsBox.innerHTML = '<p>An error occurred during the fetch.</p>';
        }
    }
  }

  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') performSearch() });

  //funzione per visualizzare i risultati
  async function displayBookResults(results) {
    if(results.length === 0){
      resultsBox.innerHTML = '<p>No results found</p>';
      return;
    }

    let booksHTML = '';
    for (const book of results) {
      const img = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?default=false` : 'img/books/book.jpg'; 
      booksHTML += `
      <div class="book-item">
        <img src="${img}">
        <div class="book-info">
          <h3>${book.title}</h3>
          <p>Author(s): ${book.author_name ? book.author_name.slice(0, 5).join(', ') : 'Not available'}</p>
          <p>Publication year: ${book.first_publish_year || 'Not available'}</p>
          <button class="js-view-editions-button" data-work-ref="${book.key}">View editions</button>
        </div>
      </div>`;
    }
    resultsBox.innerHTML = booksHTML;
    document.querySelectorAll('.js-view-editions-button').forEach((button) => {
      button.addEventListener('click', async () => {
        document.querySelector('.book-results').innerHTML = '<div class="loader"></div>';
        const {workRef} = button.dataset;
        await displayEditionResults(workRef);
      });
    })
  }
}

async function renderDeleteBookPopup(){
  const action_class = 'delete-book-button';
  const actionbtn_content = 'Return the book';
  await displayBookList(action_class,actionbtn_content);

  document.querySelectorAll('.js-delete-book-button').forEach((button) => {
    button.addEventListener('click', async () => {
      const {bookId} = button.dataset;
      console.log(bookId);
      returnBook(bookId);
      await renderBorrowedBooks();
      await renderDeleteBookPopup();
      setOperationResult('The book has been deleted');
    })
  })
}

async function renderEditDetails(){
  const action_class = 'edit-details-button';
  const actionbtn_content = 'Edit details';
  await displayBookList(action_class,actionbtn_content);

  document.querySelectorAll('.js-edit-details-button').forEach((button) => {
    button.addEventListener('click', ()=> {
      const {bookId} = button.dataset;
      renderEditBookWin(bookId);
      const submit_edit_btn = document.querySelector('.js-submit-changes');
      submit_edit_btn.addEventListener('click', () => {
        let editedDetails = {
          title: document.querySelector('.js-title-edit').value,
          author_name: document.querySelector('.js-authors-edit').value,
          publish_date: document.querySelector('.js-publdate-edit').value,
          publishers: document.querySelector('.js-publs-edit').value,
          languages: document.querySelector('.js-langs-edit').value,
          library: document.querySelector('.js-library-edit').value,
          borrowDate: document.querySelector('.js-borrowdate-edit').value,
          returnDate: document.querySelector('.js-returndate-edit').value,
          subjects: document.querySelector('.js-subjects-edit').value,
          description: document.querySelector('.js-description-edit').value
        }; //it does not contain all the properties of the book object, only the editable ones
        updateBookDetails(bookId,editedDetails);
        setOperationResult('Changes have been saved');
        document.querySelector('.window-content-wrapper').innerHTML = '';
        setTimeout(() => {
          document.querySelector('dialog').close();
        }, 2000);
      })
    })
  })
  await renderBorrowedBooks();
}

async function renderViewBookList(){
  const action_class = 'view-details-button';
  const actionbtn_content = 'View more details';
  await displayBookList(action_class,actionbtn_content);
  document.querySelectorAll('.js-view-details-button').forEach((button) => {
    button.addEventListener('click',() => {
      const {bookId} = button.dataset;
      console.log(bookId);
      renderBooksDetails(bookId);
    });
  });
}