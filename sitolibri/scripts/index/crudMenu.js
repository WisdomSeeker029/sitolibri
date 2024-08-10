export function renderCrudMenu(){
  let crudMenuHTML = '';
  crudMenuHTML += `
    <span class="icon-crud add">
      <img src="img/icons/library_add.png" alt="Aggiungi">
      <p>Aggiungi libro</p>
    </span>
    <span class="icon-crud delete">
      <img src="img/icons/library_delete.png" alt="Elimina">
      <p>Elimina libro</p>
    </span>
    <span class="icon-crud edit">
      <img src="img/icons/edit.png" alt="Modifica">
      <p>Modifica dettagli</p>
    </span>
    <span class="icon-crud view">
      <img src="img/icons/fullscreen.png" alt="Visualizza">
      <p>Visualizza ulteriori dettagli</p>
    </span>
  `;
  document.querySelector('.crud-bar').innerHTML = crudMenuHTML;
}