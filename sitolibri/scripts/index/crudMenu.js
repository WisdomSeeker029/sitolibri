import { returnBook,borrowBook,renderEditBookWin, renderBooksDetails} from "../../data/books.js";
import {borrowedBooks, renderBorrowedBooks,displayBookList,updateBookDetails} from "../../data/books.js";
import {searchBooks} from "./crudMenu/ricerche.js";
import {renderWindow} from "../utils/finestra.js";

export function renderCrudMenu(){
  let crudMenuHTML = '';
  crudMenuHTML += `
    <span class="icon-crud add js-add-book">
      <img src="img/icons/library_add.png" alt="Aggiungi">
      <p>Aggiungi libro</p>
    </span>
    <span class="icon-crud delete js-delete-book">
      <img src="img/icons/library_delete.png" alt="Elimina">
      <p>Elimina libro</p>
    </span>
    <span class="icon-crud edit js-edit-book">
      <img src="img/icons/edit.png" alt="Modifica">
      <p>Modifica dettagli</p>
    </span>
    <span class="icon-crud view js-view-book">
      <img src="img/icons/fullscreen.png" alt="Visualizza">
      <p>Visualizza ulteriori dettagli</p>
    </span>
  `;
  document.querySelector('.crud-bar').innerHTML = crudMenuHTML;
  
  //se questi bottoni vengono inizializzati prima sono null perchè non sono ancora stati renderizzati
  const addBookButton = document.querySelector('.js-add-book');
  const deleteBookButton = document.querySelector('.js-delete-book');
  const editBookButton = document.querySelector('.js-edit-book');
  const viewBookButton = document.querySelector('.js-view-book');
  const resultsBox = document.querySelector('.js-book-list');
  const searchInput = document.querySelector('.search-input');

  addBookButton.addEventListener('click', () => {
    document.querySelector('.crud-finestra').classList.add('show');
    renderAddBook();
    renderCrudMenu(); //rigenerare il crudMenu risolve il fatto che searchButton sia null prima che sia generata la finestra per aprire l'addBook
  });

  deleteBookButton.addEventListener('click', () => {
    renderDeleteBookPopup();
    // renderCrudMenu(); //rigenerare il crudMenu risolve il fatto che searchButton sia null prima che sia generata la finestra per aprire l'addBook 
  });

  editBookButton.addEventListener('click', () => {
    renderEditDetails();
    // renderCrudMenu();
  });

  viewBookButton.addEventListener('click', () => {
    renderViewBookList();
    // renderCrudMenu();
  });

  const searchButton = document.querySelector('.search-book-button');
  searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if(query){
      try {
        const results = await searchBooks(query);
        displayResults(results);
        document.querySelectorAll('.js-add-book-button')
          .forEach((button) => {
            button.addEventListener('click', async () => {
              const {bookId} = button.dataset;
              await borrowBook(bookId,results);
              renderBorrowedBooks();
            });
          })
      } catch (error) {
        console.error('Errore durante la ricerca:', error);
        resultsBox.innerHTML = '<p>Si è verificato un errore durante la ricerca.</p>';
      }
    }
  });


//funzione per visualizzare i risultati
  function displayResults(books) {
    if(books.length === 0){
      resultsBox.innerHTML = '<p>Nessun risultato trovato</p>';
      return;
    }

    const booksHTML = books.map(book =>
      `<div class="book">
        <h3>${book.title}</h3>
        <p>Autore: ${book.author_name ? book.author_name.join(', ') : 'Sconosciuto'}</p>
        <p>Anno di pubblicazione: ${book.first_publish_year || 'Sconosciuto'}</p>
        <button class="js-add-book-button" data-book-id="${book.edition_key[0]}">Aggiungi libro</button>
      </div>
      `).join('');
    resultsBox.innerHTML = booksHTML;
  }
}

function renderAddBook(){
  let contentHTML = `
    <div class="add-book-wrapper">
      <div class ="search-book-container">
        <input type="search" class="search-input" placeholder="Cerca libro...">
        <input type="button" class="search-book-button" value="Cerca">
      </div>
    </div>
  `;
  renderWindow(contentHTML);
}

function renderDeleteBookPopup(){
  const action_class = 'delete-book-button';
  const actionbtn_content = 'Restituisci libro';
  displayBookList(/* borrowedBooks, */action_class,actionbtn_content);

  document.querySelectorAll('.js-delete-book-button').forEach((button) => {
    button.addEventListener('click', () => {
      const {bookId} = button.dataset;
      console.log(bookId);
      returnBook(bookId);
      renderBorrowedBooks();
    })
  })
}

function renderEditDetails(){
  const action_class = 'edit-details-button';
  const actionbtn_content = 'Modifica info';
  displayBookList(/* borrowedBooks, */action_class,actionbtn_content);

  document.querySelectorAll('.js-edit-details-button').forEach((button) => {
    button.addEventListener('click', ()=> {
      const {bookId} = button.dataset;
      renderEditBookWin(bookId);
      const submit_edit_btn = document.querySelector('.submit-changes');
      const edited_changes = document.querySelector('.edited-changes');
      let edited_msg_id;
      submit_edit_btn.addEventListener('click', ()=>{
        borrowedBooks.forEach((book) => {
          if(book.key === bookId){
            const newBookDetails = {
              title: document.querySelector('.js-title-edit').value || 'Sconosciuto',
              author_name: document.querySelector('.js-authors-edit').value || 'Sconosciuto',
              key: bookId,
              description: document.querySelector('.js-description-edit').value || 'La descrizione non è disponibile'
            };
            updateBookDetails(bookId,newBookDetails);
            renderBorrowedBooks();
            if(!edited_changes.classList.contains('show')){
              edited_changes.classList.add('show');
            };
          }
          /*it let us know if another timeout is active. If the submit_edit_btn has been clicked by less than 2 seconds it remove the previous timeout and start another one. */
          if(edited_msg_id){
            clearTimeout(edited_msg_id);
          }
          edited_msg_id = setTimeout(()=>{
            edited_changes.classList.remove('show')
          },2000);
        })
      })
    })
  });
}

function renderViewBookList(){
  const action_class = 'view-details-button';
  const actionbtn_content = 'Vedi dettagli';
  displayBookList(/* borrowedBooks, */action_class,actionbtn_content);
  document.querySelectorAll('.js-view-details-button').forEach((button) => {
    button.addEventListener('click',() => {
      const {bookId} = button.dataset;
      renderBooksDetails(bookId);
    })
  });
}