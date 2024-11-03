import { borrowedBooks } from "../../data/books.js";
export function renderWindow(content){

  if(!content){
    content = "";
  }
  const finestra = document.querySelector('.crud-finestra');

  const finestraHTML = `
    <div class="chiudi">
      <img src="img/details/close.png" alt="chiudi finestra">
    </div>
    <div class="window-content-wrapper">
    </div>
    <div class="book-results js-book-list"></div>
  `;

  finestra.innerHTML = finestraHTML;
  
  function displayWindow(){
    finestra.classList.add('show');
  }

  function closeWindow(){
    finestra.classList.remove('show');
  }
  
  document.querySelector('.chiudi').addEventListener('click', () => closeWindow());

  function fillContent(content){
    document.querySelector('.window-content-wrapper').innerHTML = content;
  }

  fillContent(content);
  if(!finestra.classList.contains('show')){
    displayWindow();
  }
}

export function displayBookList(borrowedBooks,action_class,actionbtn_content){
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