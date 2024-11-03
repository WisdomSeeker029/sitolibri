import { getDescription } from "../scripts/index/crudMenu/ricerche.js";
import { renderWindow } from "../scripts/utils/finestra.js";

export let borrowedBooks = [];

// console.log(Boolean(borrowedBooks));
loadFromStorage();

function loadFromStorage() {
  if(borrowedBooks){
    console.log(borrowedBooks);
    let content = JSON.parse(localStorage.getItem('borrowedBooks')); //carica solo se ci sono effettivamente libri presi in prestito. così facendo non si trova a fare il push di borrowedBooks quando vale null
    if(content){ 
      borrowedBooks = content;
    } 
  }
}

//funzione per etichettare come in prestito i libri
export async function borrowBook(bookId,results){
  /*Il motivo per cui in questa funzione viene usato for...of invece di forEach è
  perchè forEach non gestisce bene le Promises. Si potrebbe usare anche Promise.all() */
    for (const book of results) {
      const key = book.edition_key[0];
      if (key == bookId) {
        console.log(key);
        const description = await getDescription(key);
        borrowedBooks.push({
          title: book.title || 'Sconosciuto',
          author_name: book.author_name[0] || 'Sconosciuto',
          key, //non è il key dell'edizione
          description: description || 'La descrizione non è disponibile'
        });
        saveToStorage();
    }
  }
}

function saveToStorage() {
  console.log(borrowedBooks);
  localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
}

export function returnBook(key){
  let newborrowedBooks = [];
  borrowedBooks.forEach((book) => {
    if(book.key !== key){
      newborrowedBooks.push(book);
    }
  });
  borrowedBooks = newborrowedBooks;
  saveToStorage();
  loadFromStorage();
}

export function renderBorrowedBooks(){
  let booksHTML = '';
  console.log(borrowedBooks);
  if(borrowedBooks){
    borrowedBooks.map((book) => {
      booksHTML += `
      <div class="libro" data-book-id="${book.key}">
        <img width="100%" src="img/books/book.jpg" alt="libro">
        <h4>${book.title}</h4>
        <h5>${book.author_name}</h5>
      </div>
    `;
    });
  }

  document.querySelector('.spazio-libri').innerHTML = booksHTML;

  document.querySelectorAll('.libro').forEach((lib) => {
    const {bookId} = lib.dataset;
    lib.addEventListener("click", () => {
      renderBooksDetails(bookId);
      apriDettagli();
    });
  });
}

export function renderBooksDetails(bookId){
  let booksDetailsHTML = '';
  borrowedBooks.forEach((book) => {
    if(book.key === bookId){
      booksDetailsHTML = `
      <div class="dettagli-img">
        <img src="img/books/book.jpg" alt="">
      </div>
      <div>
        <p class="titolo">
          ${book.title}
        </p>
        <p class="autore">${book.author_name}</p>
        <p class="descrizione">
          ${book.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam blanditiis sint odio natus possimus consequuntur quasi quod soluta voluptates minus quos non, enim mollitia asperiores deserunt, inventore sequi rem commodi.'}
        </p>
      </div>
      `;
    };
    renderWindow(booksDetailsHTML);
  });
}