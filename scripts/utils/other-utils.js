export function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return 'Formato non valido';
  const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}