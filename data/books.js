import {fetchWork, fetchLanguage, getAuthors, getCoverImg} from "../scripts/index/crudMenu/ricerche.js";
import { renderWindow,setOperationResult } from "../scripts/utils/finestra.js";

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
export async function borrowBook(book){
  try{
    const work = await fetchWork(book?.works?.[0]?.key);
    const author_from_work = (await getAuthors(work?.authors?.[0]?.author?.key)).name; 
    const langKey = book.languages?.[0]?.key; //optional chaining
    const langName = langKey 
        ? await fetchLanguage(langKey)
        : 'Unknown language';
    book.work = work;
    book.author_from_work = author_from_work;
    book.subjects = work?.subjects;
    book.description = book.description ? book.description.value : 
      work.description?.value ? work.description?.value : work?.description || 'The description is unavailable'; //in this way if the description is an object we'll take the value of the object, otherwise if it is in the form of a string we keep the string
    book.languages = langName;
    borrowedBooks.push(book);
    saveToStorage();
  }catch(error){
    console.error('Errore',error);
  }
}

export async function displayEditionResults(work) {
  const resultsBox = document.querySelector('.js-book-list');
  try {
    const response = await fetch(`https://openlibrary.org${work}/editions.json`);
    if (!response.ok) throw new Error('Network response failed');
    const data = await response.json();
    
    const editionsHTML = await Promise.all(
      data.entries.slice(0, 20).map(async ed => {
        const coverId = ed.covers?.[0];
        const coverUrl = coverId 
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
          : 'img/books/book.jpg';

        const langKey = ed.languages?.[0]?.key; //optional chaining
        const langName = langKey 
          ? await fetchLanguage(langKey)
          : 'Unknown language';

        return `
          <div class="book-item">
            <img src="${coverUrl}" alt="cover">
            <div class="book-info">
              <h3>${ed.title}</h3>
              <p>${ed.publishers?.[0] || 'Editore sconosciuto'}. ${ed.publish_date || 'Data sconosciuta'}</p>
              <p>In ${langName}</p>
              <button class="js-add-book-button" data-book-id="${ed.key}">Aggiungi libro</button>
            </div>
          </div>
        `;
      })
    );
    
    resultsBox.innerHTML = editionsHTML.join('<hr>');
    
    document.querySelectorAll('.js-add-book-button').forEach((button) => {
      button.addEventListener('click', async () => {
        //a sto punto dovrebbe apparire un altro popup che mi permette di 
        const {bookId} = button.dataset;
        const response = await fetch(`https://openlibrary.org${bookId}.json`);
        if (!response.ok) throw new Error('Network response failed');
        const data = await response.json();
        console.log(data);
        await borrowBook(data);
        await renderBorrowedBooks();
        setOperationResult('The book has been added');
      });
    })
  } catch (error) {
    console.error('Errore:', error);
    resultsBox.innerHTML = '<p>Si è verificato un errore nel caricamento delle edizioni.</p>';
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

export function updateBookDetails(bookId,editedDetails){
  //prende i valori di editedDetalis e li sostituisce a quelli attuali. editedDetails contiene i valori modificati
  borrowedBooks.forEach((book) => {
    if (book.key == bookId){
      book.title = editedDetails.title;
      book.author_name ? book.author_name : book.author_from_work = editedDetails.author_name;
      book.publish_date = editedDetails.publish_date;
      book.publishers[0] = editedDetails.publishers;
      book.languages = editedDetails.languages.split(','); //converts the string into an array
      book.library = editedDetails.library;
      book.subjects = editedDetails.subjects.split(',');
      book.description = editedDetails.description;
    }
    saveToStorage();
  })
}

export async function renderBorrowedBooks(){
  let booksHTML = '';
  console.log(borrowedBooks);
  try{
    if(borrowedBooks){
      booksHTML = await Promise.all(
        borrowedBooks.map(async (book) => {
          return `<div class="libro" data-book-id="${book.key}">
            <img src="${book?.covers?.[0] ? 'https://covers.openlibrary.org/b/id/'+book?.covers?.[0]+'-M.jpg' : 'img/books/book.jpg'}" alt="libro">
            <h4>${book?.title || 'Titolo non disponibile'}</h4>
            <h5>${book.author_name ? book.author_name : (book.author_from_work ? book.author_from_work : 'Autore non conosciuto')}</h5>
            <h6>${book?.publishers?.[0] || 'Editore non disponibile'}</h6>
          </div>`;
        }
      )
      );
      console.log(booksHTML);
    }

    document.querySelector('.spazio-libri').innerHTML = booksHTML.join(''); // senza il join si avrebbe una virgola tra un libro e l'altro in quanto restituirebbe un vettore

    document.querySelectorAll('.libro').forEach((lib) => {
      const {bookId} = lib.dataset;
      lib.addEventListener("click", () => {
        renderBooksDetails(bookId);
      });
    });
  }catch(error){
    console.error('Errore:', error);
    console.log('Si è verificato un errore nella rappresentazione dei libri presi in prestito');
  }
}

export async function displayBookList(action_class,actionbtn_content){
  let booksHTML = await Promise.all(
    borrowedBooks.map(async (book) => {
      return `
      <div class="book">
        <p>Titolo: <b>${book.title}</b></p>
        <p>Autore: ${book.author_name ? book.author_name : 
        book.author_from_work ? book.author_from_work : 'Autore non conosciuto'}</p>
        <button class="js-${action_class}" data-book-id="${book.key}">${actionbtn_content}</button>
      </div>`;
    })
  );
  renderWindow();
  const book_list = document.querySelector('.js-book-list');
  book_list.innerHTML = booksHTML.join('');
}

export function renderBooksDetails(bookId){
  let booksDetailsHTML = '';
  borrowedBooks.forEach((book) => {
    if(book.key === bookId){
      booksDetailsHTML = `
      <div class="book-details-container">
        <div class="dettagli-img">
          <img src="${book?.covers?.[0] ? 'https://covers.openlibrary.org/b/id/'+book?.covers?.[0]+'-M.jpg' : 'img/books/book.jpg'}" alt="">
        </div>
        <div class="book-details">
          <p>
            ${book.title}
          </p>
          <p>${book.author_name || book.author_from_work}</p>
          <p>${book.publish_date}</p>
          <p>${book.publishers?.[0] || 'Unknown publishers'}</p>
          <p>${book.languages}</p>
          <p>${book.library}</p>
          <p>${book.subjects?.join(', ')}</p>
          <p class="descrizione">
            ${book.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam blanditiis sint odio natus possimus consequuntur quasi quod soluta voluptates minus quos non, enim mollitia asperiores deserunt, inventore sequi rem commodi.'}
          </p>
        </div>
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
            <div>
              <label>Title</label>
              <input type="text" class="js-title-edit" value="${book.title}">
            </div>
            <div>
              <label>Authors</label>
              <input type="text" class="js-authors-edit" value="${book.author_name ? book.author_name : (book.author_from_work ? book.author_from_work : 'Autore non conosciuto')}">
            </div>
            <div>
              <label>Publish date</label>
              <input type="text" class="js-publdate-edit"  value="${book.publish_date || 'Anno di pubblicazione sconosciuto'}">
            </div>
            <div>
              <label>Publisher</label>
              <input type="text" class="js-publs-edit" value="${book.publishers?.[0]}">
            </div>
            <div>
              <label>Language</label>
              <input type="text" class="js-langs-edit" value="${book.languages ? book.languages : 'Unknown library' }">
            </div>
            <div>
              <label>Library</label>
              <input type="text" class="js-library-edit" value="${book.library ? book.library : 'Unknown library' }">
            </div>
            <div>
              <label>Subjects</label>
              <input type="text" class="js-subjects-edit" value="${book.subjects ? book.subjects.slice(0,5).join(', ') : 'Unknown subjects'}">
            </div>
            <div>
              <label for="description-camp">Description</label>
              <textarea rows="5" cols="33" class="desc-textarea js-description-edit">${book.description}</textarea>
            </div>
            <div class="submit-form">
              <button class="js-submit-changes">Confirm the changes</button>
            </div>
          </div>
        </div>
      `;
    };
    renderWindow(HTML);
  });
}