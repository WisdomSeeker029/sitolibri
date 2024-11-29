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