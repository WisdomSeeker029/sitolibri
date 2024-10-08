import { booksOnLoan } from "../../data/books.js";

export function renderBooksOnLoan(){
  let booksHTML = '';
  console.log(booksOnLoan);
  if(booksOnLoan){
    booksOnLoan.forEach((book) => {
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

export function getBooksOnLoan(){
  return booksOnLoan;
}

function apriDettagli(){
  let dettagli = document.querySelector('.crud-finestra');
  dettagli.classList.add('show');

  //per chiudere i dettagli
  let xDettagli = document.querySelector('.chiudi');
  xDettagli.addEventListener("click", () => {
    chiudiDettagli();
  });
}

function chiudiDettagli(){
  let dettagli = document.querySelector('.crud-finestra');
  dettagli.classList.remove('show');
}

export function renderBooksDetails(bookId){
  let booksDetailsHTML = '';
  booksOnLoan.forEach((book) => {
    if(book.key === bookId){
      booksDetailsHTML = `
      <div class="chiudi">
        <img src="img/details/closure-details.png" alt="chiudi dettagli">
      </div>
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
    document.querySelector('.crud-finestra').innerHTML = booksDetailsHTML;
  });
}