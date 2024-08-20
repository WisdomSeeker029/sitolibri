import { booksOnLoan } from "../../data/books.js";
import { renderBooksOnLoan } from "./onLoan.js";
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

  renderAddBook();

  //se questi bottoni vengono inizializzati prima sono null perchè non sono ancora stati renderizzati
  const addBookButton = document.querySelector('.js-add-book');
  const deleteBookButton = document.querySelector('.js-delete-book');
  const editBookButton = document.querySelector('.js-edit-book');
  const viewBookButton = document.querySelector('.js-view-book');
  const resultsBox = document.querySelector('.js-book-results');
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-book-button');

  addBookButton.addEventListener('click', () => {
    document.querySelector('.popup-add-book').classList.add('show');
  });

  searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if(query){
      try {
        const results = await searchBooks(query);
        displayResults(results);
        document.querySelectorAll('.js-add-book-button')
          .forEach((button) => {
            button.addEventListener('click', () => {
              const {bookId} = button.dataset;
              loanBook(bookId,results);
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

  //funzione per etichettare come in prestito i libri
  function loanBook(bookId,results){
    results.forEach((book) => {
      const key = book.edition_key[0];
       if(key == bookId){
        console.log(key);
        // await getWork();
        booksOnLoan.push(
          {
            title : book.title || 'Sconosciuto',
            author_name: book.author_name[0]|| 'Sconosciuto',
            key
          }
        );
      };
    });
    console.log(booksOnLoan);
    renderBooksOnLoan();
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
  document.querySelector('.popup-add-book').innerHTML += popupHTML;
}