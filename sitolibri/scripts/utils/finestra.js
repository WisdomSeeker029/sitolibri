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
    <div class="operation-result"></div>
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

export function setOperationResult(message){
  if(!message){
    message = '';
  }
  const op_result = document.querySelector('.operation-result');
  op_result.innerHTML = `
    <img src="img/icons/checked.png"> 
    ${message}
  `;
  if(!op_result.classList.contains('show')){
    op_result.classList.add('show');
  };
  let result_msg_id;
  /*it let us know if another timeout is active. If the submit_edit_btn has been clicked by less than 2 seconds it remove the previous timeout and start another one. */
  if(result_msg_id){
    clearTimeout(result_msg_id);
  }
  result_msg_id = setTimeout(()=>{
    op_result.classList.remove('show')
  },2000);
}