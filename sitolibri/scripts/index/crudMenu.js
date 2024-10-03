import { returnBook,loanBook } from "../../data/books.js";
import {getBooksOnLoan, renderBooksOnLoan } from "./onLoan.js";

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
  const resultsBox = document.querySelector('.js-book-results');
  const searchInput = document.querySelector('.search-input');

  addBookButton.addEventListener('click', () => {
    document.querySelector('.crud-finestra').classList.add('show');
    renderAddBook();
    renderCrudMenu(); //rigenerare il crudMenu risolve il fatto che searchButton sia null prima che sia generata la finestra per aprire l'addBook 
  });

  deleteBookButton.addEventListener('click', () => {
    renderDeleteBookPopup();
    renderCrudMenu(); //rigenerare il crudMenu risolve il fatto che searchButton sia null prima che sia generata la finestra per aprire l'addBook 
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
              await loanBook(bookId,results);
              renderBooksOnLoan();
            });
          })
      } catch (error) {
        console.error('Errore durante la ricerca:', error);
        resultsBox.innerHTML = '<p>Si è verificato un errore durante la ricerca.</p>';
      }
    }
  });

  //funzione per effettuare la ricerca
   async function searchBooks(query){
    // fetch() è un metodo che permette di effettuare richieste di rete
    // Qui viene utilizzato per fare una richiesta GET all'API di Open Library
    // encodeURIComponent() assicura che la query sia codificata correttamente nell'URL
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    if(!response.ok){
      throw new Error('Errore nella risposta della rete');
    }
    const data = await response.json();
    return data.docs;
  }

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
  let popupHTML = '';
  popupHTML += 
    `<div class="chiudi">
      <img src="img/details/closure-details.png" alt="chiudi dettagli">
    </div>
    <div class="add-book-wrapper">
      <div class ="search-book-container">
        <input type="search" class="search-input" placeholder="Cerca libro...">
        <input type="button" class="search-book-button" value="Cerca">
      </div>
    </div>
    <div class="book-results js-book-results"></div>`;
  let window = document.querySelector('.crud-finestra');
  window.innerHTML = popupHTML;
}

function renderDeleteBookPopup(){
  let booksHTML = "";
  getBooksOnLoan().forEach((book) => {
    booksHTML += `
      <div class="book">
        <p>Titolo: <b>${book.title}</b></p>
        <p>Autore: ${book.author_name}</p>
        <button class="js-delete-book-button" data-book-id="${book.key}">Restituisci libro</button>
      </div>`;
  });
  let popupHTML = `
    <div class="chiudi">
      <img src="img/details/closure-details.png" alt="chiudi dettagli">
    </div>
    <div class="book-results js-book-results"></div>
  `;
  // popupHTML += booksHTML;
  document.querySelector('.crud-finestra').innerHTML = popupHTML;
  if(!document.querySelector('.crud-finestra').classList.contains('show')){
    document.querySelector('.crud-finestra').classList.add('show');
  }
  document.querySelector('.js-book-results').innerHTML = booksHTML; 

  document.querySelectorAll('.js-delete-book-button').forEach((button) => {
    button.addEventListener('click', () => {
      const {bookId} = button.dataset;
      console.log(bookId);
      returnBook(bookId);
      renderBooksOnLoan();
    })
  })
}

  /* Questa funzione prende il key del .docs, il che gli permetterà di fare il fetch di uno dei works e trarre da esso, se reperibile, la descrizione */
 export async function getDescription(book_key){
  console.log(book_key);
  const response = await fetch(`https://openlibrary.org/books/${book_key}.json`);
  // if(!response.ok){
  //   throw new Error('Errore nella risposta della rete');
  // }
  const data = await response.json();
  console.log(data);
  const work_key = data.works[0].key;
  if(work_key){
    const responseWork = await fetch(`https://openlibrary.org${work_key}.json`);
    const data = await responseWork.json();
    const descrizione = data.description;
    //  || "La descrizione dell'opera non è reperibile";
    console.log(descrizione);
    return descrizione;
  }
}