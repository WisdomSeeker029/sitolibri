import { getDescription } from "../scripts/index/crudMenu.js";

export let booksOnLoan = [];

// console.log(Boolean(booksOnLoan));
loadFromStorage();

function loadFromStorage() {
  if(booksOnLoan){
    console.log(booksOnLoan);
    let content = JSON.parse(localStorage.getItem('booksOnLoan')); //carica solo se ci sono effettivamente libri presi in prestito. così facendo non si trova a fare il push di booksOnLoan quando vale null
    if(content){ 
      booksOnLoan = content;
    } 
  }
}

//funzione per etichettare come in prestito i libri
export function loanBook(bookId,results){
  results.forEach(async (book) => {
    const key = book.edition_key[0];
     if(key == bookId){
      console.log(key);
      // await getWork();
      booksOnLoan.push(
        {
          title : book.title || 'Sconosciuto',
          author_name: book.author_name[0] || 'Sconosciuto',
          key, //non è il key dell'edizione
          description : await getDescription(key) || 'La descrizione non è disponibile'
        }
      );
      saveToStorage();
    };
  }); 
  console.log(booksOnLoan);
}

function saveToStorage() {
  console.log(booksOnLoan);
  localStorage.setItem('booksOnLoan', JSON.stringify(booksOnLoan));
}

export function returnBook(key){
  let newBooksOnLoan = [];
  booksOnLoan.forEach((book) => {
    if(book.key !== key){
      newBooksOnLoan.push(book);
    }
  });
  booksOnLoan = newBooksOnLoan;
  saveToStorage();
  loadFromStorage();
}