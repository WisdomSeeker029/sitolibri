import { borrowedBooks } from "../../data/books.js";
export function renderWindow(content){

  if(!content){
    content = "";
  }
  const dialog = document.querySelector("dialog");

  const displayWindow = (show) => show ? dialog.show() : dialog.close();

  const finestraHTML = `
    <div class="chiudi">
      <img src="img/details/close.png" alt="chiudi finestra">
    </div>
    <div class="window-content-wrapper">
    </div>
    <div class="book-results js-book-list"></div>
    <div class="operation-result"></div>
  `;

  displayWindow(true);

  dialog.innerHTML = finestraHTML;
  
  document.querySelector('.chiudi').addEventListener('click', () => displayWindow(false));

  function fillContent(content){
    document.querySelector('.window-content-wrapper').innerHTML = content;
  }

  fillContent(content);
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