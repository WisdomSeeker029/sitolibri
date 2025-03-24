export function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return 'Invalid format';
  const months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}