 /* Questa funzione prende il key del .docs, il che gli permetterà di fare il fetch di uno dei works e trarre da esso, se reperibile, la descrizione */
 export async function getDescription(work_key){
  // const response = await fetch(`https://openlibrary.org/books/${book_key}.json`);
  // // if(!response.ok){
  // //   throw new Error('Errore nella risposta della rete');
  // // }
  // const data = await response.json();
  // console.log(data);
  // const work_key = data.works[0].key;
  // if(work_key){
    const responseWork = await fetch(`https://openlibrary.org${work_key}.json`);
    const data = await responseWork.json();
    let descrizione = data.description;
    console.log(descrizione);
    if(typeof descrizione === 'object'){ //la descrizione a volte è un oggetto
      descrizione = descrizione.value;
    }
    return descrizione;
  // }
}

export async function getCoverImg(id){
  try {
    const response = await fetch(`https://covers.openlibrary.org/b/id/${id}-L.jpg?default=false`); //il ?default=false alla fine restituisce 404 not found se l'immagine non è disponibile
    if (response.ok) {
      console.log(response.url);
      return response.url;
    }
    return null;
  } catch (error) {
    console.error('Error fetching book cover:', error);
    return null;
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

export async function fetchLanguage(langKey) {
  try {
    const response = await fetch(`https://openlibrary.org${langKey}.json`);
    if (!response.ok) throw new Error('Network response failed');
    const data = await response.json();
    return data.name || 'Unknown language';
  } catch (error) {
    console.error(`Errore nel recupero della lingua per ${langKey}:`, error);
    return 'Unknown language';
  }
}


export async function fetchBook(bookKey){
  try {
    const response = await fetch(`https://openlibrary.org${bookKey}.json`);
    if (!response.ok) throw new Error('Network response failed');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Errore nel recupero del book ${bookKey}:`, error);
    return 'key del book non disponibile';
  }
}
 

export async function fetchWork(workKey){
  try {
    const response = await fetch(`https://openlibrary.org${workKey}.json`);
    if (!response.ok) throw new Error('Network response failed');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Errore nel recupero del key del work ${workKey}:`, error);
    return 'key del work non disponibile';
  }
}

export async function fetchWorkEditions(edKey){
  try {
    const response = await fetch(`https://openlibrary.org${edKey}.json/editions.json`);
    if (!response.ok) throw new Error('Network response failed');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Errore nel recupero delle edizioni ${edKey}:`, error);
    return 'key del work non disponibile';
  }
}

export async function getAuthors(author_key){
  try{
    const response = await fetch(`https://openlibrary.org${author_key}.json`);
    if(!response.ok){
      throw new Error('Errore nella risposta della rete');
    }
    const data = await response.json();
    return data;
  }catch(error){
    console.error(error);
  }
}