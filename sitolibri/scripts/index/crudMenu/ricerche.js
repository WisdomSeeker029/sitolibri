 /* Questa funzione prende il key del .docs, il che gli permetterà di fare il fetch di uno dei works e trarre da esso, se reperibile, la descrizione */
 export async function getDescription(book_key){
  console.log(book_key);
  const response = await fetch(`https://openlibrary.org/books/${book_key}.json`);
  // if(!response.ok){
  //   throw new Error('Errore nella risposta della rete');
  // }
  const data = await response.json();
  console.log(data);
  const work_key = data.works[0].key;
  if(work_key){
    const responseWork = await fetch(`https://openlibrary.org${work_key}.json`);
    const data = await responseWork.json();
    let descrizione = data.description;
    //  || "La descrizione dell'opera non è reperibile";
    console.log(descrizione);
    if(typeof descrizione === 'object'){ //la descrizione a volte è un oggetto
      descrizione = descrizione.value;
    }
    return descrizione;
  }
}

//funzione per effettuare la ricerca
export async function searchBooks(query){
  // fetch() è un metodo che permette di effettuare richieste di rete
  // Qui viene utilizzato per fare una richiesta GET all'API di Open Library
  // encodeURIComponent() assicura che la query sia codificata correttamente nell'URL
  const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
  if(!response.ok){
    throw new Error('Errore nella risposta della rete');
  }
  const data = await response.json();
  return data.docs;
}