import { getCoverImg, getDescription } from "../scripts/index/crudMenu/ricerche.js";
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
        const cover = await getCoverImg(key);
        borrowedBooks.push({
          title: book.title || 'Sconosciuto',
          author_name: book.author_name[0] || 'Sconosciuto',
          key, //non è il key dell'edizione
          description: description || 'La descrizione non è disponibile',
          cover: cover || 'img/books/book.jpg'
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
  let newBorrowedBooks = [];
  borrowedBooks.forEach((book) => {
    if(book.key !== key){
      newBorrowedBooks.push(book);
    }
  });
  borrowedBooks = newBorrowedBooks;
  saveToStorage();
  loadFromStorage();
}

export function updateBookDetails(key,newBookDetails){
  /*Non è possibile riassegnare l'oggetto originale del vettore quando si usa forEach, quindi ciò che segue è codice errato: 
  borrowedBooks.forEach((book)=> {
    if(book.key == key){
      book = newBookDetails;
      saveToStorage();
    }
  });
  IL metodo corretto è il seguente
  */ 
  const index = borrowedBooks.findIndex(book => book.key === key);
  if (index !== -1) { //ovvero se non trova il key nel vettore
    borrowedBooks[index] = newBookDetails;
    saveToStorage();
  }
}

export function renderBorrowedBooks(){
  let booksHTML = '';
  console.log(borrowedBooks);
  if(borrowedBooks){
    borrowedBooks.map((book) => {
      booksHTML += `
      <div class="libro" data-book-id="${book.key}">
        <img width="100%" src="${book.cover || 'img/books/book.jpg'}" alt="libro">
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
    });
  });
}

export function displayBookList(/* borrowedBooks, */action_class,actionbtn_content){
  renderWindow();
  const book_list = document.querySelector('.js-book-list');
  let booksHTML = "";
  borrowedBooks.map((book) => {
    booksHTML += `
    <div class="book">
      <p>Titolo: <b>${book.title}</b></p>
      <p>Autore: ${book.author_name}</p>
      <button class="js-${action_class}" data-book-id="${book.key}">${actionbtn_content}</button>
    </div>`;
  });
  book_list.innerHTML = booksHTML;
}

export function renderBooksDetails(bookId){
  let booksDetailsHTML = '';
  borrowedBooks.forEach((book) => {
    if(book.key === bookId){
      booksDetailsHTML = `
      <div class="dettagli-img">
        <img src="${book.cover}" alt="">
      </div>
      <div class="book-details">
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

export function renderEditBookWin(bookId){
  let HTML;
  borrowedBooks.forEach((book) => {
    if(book.key === bookId){
      HTML = `
        <h1>Modifica dettagli</h1>
        <div class="edit-book-container">
          <div class="edit-book-wrapper">
            <div class="option">
              <label for="title-camp">Title</label>
              <input type="text" class="js-title-edit" value="${book.title}">
            </div>
            <div class="option">
              <label for="authors-camp">Authors</label>
              <input type="text" value="${book.author_name}" class="js-authors-edit">
            </div>
            <div class="option">
              <label for="description-camp">Description</label>
              <textarea rows="5" cols="33" class="desc-textarea js-description-edit">${book.description}</textarea>
            </div>
            <div class="submit-form">
              <button class="submit-changes">Confirm the changes</button>
            </div>
          </div>
        </div>
      `;
    };
    renderWindow(HTML);
  });
}