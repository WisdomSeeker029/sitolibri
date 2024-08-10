export function renderBooksOnLoan(){
  booksHTML += `
    <div class="libro">
      <img width="100%" src="img/books/book.jpg" alt="libro">
      <h4>Titolo dell'opera</h4>
      <h5>Autore o autrice</h5>
    </div>
    <div class="libro">
      <img width="100%" src="img/books/book.jpg" alt="libro">
      <h4>Titolo dell'opera</h4>
      <h5>Autore o autrice</h5>
    </div>
  `;
  document.querySelector('.spazio-libri').innerHTML = booksHTML;
}