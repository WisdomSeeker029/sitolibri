# SitoLibri - Gestione Prestiti Libri

Un semplice sito web per gestire i libri presi in prestito dalla biblioteca.

ITA

## 🚀 Come Provare il Sito

### Prerequisiti
- **Un browser moderno** (Chrome, Firefox, Edge).
- **Connessione internet** (per accedere alle copertine dei libri e ai dati).

### Passaggi per Avviare il Sito
1. **Scarica i file**

2. **Apri index.html in Live Server**:
   - Usando un IDE come Visual Studio Code, installa l'estensione **Live Server**. Clicca con il tasto destro su `index.html` e seleziona "Open with Live Server" per avviare il sito in un ambiente simulato.
   - LiveServer è disponibile come estensione anche in altri IDE e TextEditor come Sublime Text per esempio

3. **Usa il sito**:
   - **Aggiungi un libro**: Clicca sul pulsante "Aggiungi libro" (icona con il ➕), cerca un titolo (es. "Harry Potter"), seleziona un'edizione e compila i dettagli del prestito.
   - **Visualizza i libri**: I libri aggiunti appariranno come carte nella sezione principale. Clicca su una carta per vedere dettagli come data di prestito e scadenza.
   - **Modifica o elimina**: Usa i pulsanti "Modifica" (✏️) o "Elimina" (🗑️) per aggiornare informazioni o restituire un libro.

## 📚 Funzionalità Principali
- **Ricerca libri**: Trova qualsiasi libro tramite l'API di Open Library.
- **Gestione prestiti**:
  - Aggiungi libri con dati come biblioteca, data di prestito e scadenza.
  - Visualizza la scadenza calcolata automaticamente (1 settimana, 1 mese, ecc.).
  - Modifica copertina, autore, descrizione e altri dettagli.
- **Salvataggio automatico**: I dati rimangono memorizzati anche dopo aver chiuso il browser.

## 💡 Competenze Utilizzate (Da sviluppatore Neodiplomato)
Questo progetto dimostra le seguenti competenze tecniche e trasversali:
- **Frontend Basics**:
  - HTML/CSS: Struttura della pagina, stili responsive, grid/flexbox.
  - JavaScript: Logica interattiva, gestione eventi (clic, form).
- **API esterne**: Comunicazione con Open Library per ottenere dati e immagini dei libri.
- **Local Storage**: Salvataggio dei prestiti nel browser tramite `localStorage`.
- **Debugging**: Risoluzione errori di rete, gestione di risposte API non valide.
- **Organizzazione codice**: Suddivisione in moduli (es. `books.js`, `finestra.js`).
- **UI/UX Design**: Design intuitivo con feedback visivi (es. popup di conferma).

## 🛠️ Strumenti e Tecnologie
- **Linguaggi**: HTML5, CSS3, JavaScript (ES6+).
- **API**: [Open Library](https://openlibrary.org/) per dati e copertine.
- **Browser Tools**: Console per test e debug.
  Le icone le ho prese da Flaticon e Icons8
  https://icons8.com/icon/bJeElrwDgE0r/close-window
  https://www.flaticon.com/free-icons/check-mark

## 📝 Note
- I dati salvati sono **locali al tuo browser**. Se cambi dispositivo o cancelli la cronologia, i prestiti andranno persi.
- Le copertine dei libri potrebbero non essere disponibili per tutti i titoli.

Spero ti piaccia! 📖  
Chiekhona Gueye

  ***

  # SitoLibri - Book Loan Management

A simple web application to manage books borrowed from the library. Add, view, edit, and return books with just a few clicks!

## 🚀 How to Test the Site

### Prerequisites
- **A modern browser** (Chrome, Firefox, Edge).
- **Internet connection** (required to fetch book covers and data).

### Steps to Run the Site
1. **Download the files**:

2. **Open index.html in live server**:
   - Using an IDE like Visual Studio Code, install the **Live Server** extension. Right-click on `index.html` and select "Open with Live Server" to launch the site in a local development environment.  
- **Note**: Live Server is also available as an extension for other IDEs and text editors, such as Sublime Text.

3. **Use the site**:
   - **Add a book**: Click the "Add book" button (➕ icon), search for a title (e.g., "Harry Potter"), select an edition, and fill in loan details.
   - **View books**: Added books will appear as cards in the main section. Click a card to see details like borrow date and deadline.
   - **Edit or delete**: Use the "Edit" (✏️) or "Delete" (🗑️) buttons to update information or return a book.

## 📚 Key Features
- **Book search**: Find books via the Open Library API.
- **Loan management**:
  - Add books with details like library name, borrow date, and auto-calculated deadlines (1 week, 1 month, etc.).
  - Edit cover, author, description, and other metadata.
- **Auto-save**: Data persists in your browser even after closing the tab.

## 💡 Skills Demonstrated (Junior Developer)
This project showcases the following technical and soft skills:
- **Frontend Fundamentals**:
  - HTML/CSS: Responsive layouts, grid/flexbox, and styling.
  - JavaScript: Interactive logic, event handling (clicks, forms).
- **External APIs**: Integration with Open Library for book data and covers.
- **Local storage**: Saving loan data using `localStorage`.
- **Debugging**: Handling network errors and invalid API responses.
- **Code organization**: Modular structure (e.g., `books.js`, `finestra.js`).
- **UI/UX design**: Intuitive interface with visual feedback (e.g., confirmation popups).

## 🛠️ Tools & Technologies
- **Languages**: HTML5, CSS3, JavaScript (ES6+).
- **APIs**: [Open Library](https://openlibrary.org/) for book data and covers.
- **Browser tools**: Developer console for testing and debugging.

## 📝 Notes
- Saved data is **local to your browser**. Loans will be lost if you switch devices or clear history.
- Book covers may not be available for all titles.

I hope you'll like it
Chiekhona Gueye
