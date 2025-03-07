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

> 🔍 **Suggerimento**: 

## 📚 Funzionalità Principali
- **Ricerca libri**: Trova qualsiasi libro tramite l'API di Open Library.
- **Gestione prestiti**:
  - Aggiungi libri con dati come biblioteca, data di prestito e scadenza.
  - Visualizza la scadenza calcolata automaticamente (1 settimana, 1 mese, ecc.).
  - Modifica copertina, autore, descrizione e altri dettagli.
- **Salvataggio automatico**: I dati rimangono memorizzati anche dopo aver chiuso il browser.

## 💡 Competenze Utilizzate (Sviluppatore Neodiplomato)
Questo progetto dimostra le seguenti competenze tecniche e trasversali:
- **Frontend Basics**:
  - HTML/CSS: Struttura della pagina, stili responsive, grid/flexbox.
  - JavaScript: Logica interattiva, gestione eventi (clic, form).
- **API esterne**: Comunicazione con Open Library per ottenere dati e immagini dei libri.
- **Storage locale**: Salvataggio dei prestiti nel browser tramite `localStorage`.
- **Debugging**: Risoluzione errori di rete, gestione di risposte API non valide.
- **Organizzazione codice**: Suddivisione in moduli (es. `books.js`, `finestra.js`).
- **UI/UX Design**: Design intuitivo con feedback visivi (es. popup di conferma).

## 🛠️ Strumenti e Tecnologie
- **Linguaggi**: HTML5, CSS3, JavaScript (ES6+).
- **API**: [Open Library](https://openlibrary.org/) per dati e copertine.
- **Browser Tools**: Console sviluppatori per test e debug.
  Le icone le ho prese da Flaticon e Icons8
  https://icons8.com/icon/bJeElrwDgE0r/close-window
  https://www.flaticon.com/free-icons/check-mark

## 📝 Note
- I dati salvati sono **locali al tuo browser**. Se cambi dispositivo o cancelli la cronologia, i prestiti andranno persi.
- Le copertine dei libri potrebbero non essere disponibili per tutti i titoli.

Spero ti piaccia! 📖  
Chiekhona Gueye
