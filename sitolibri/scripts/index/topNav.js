const topNavItems = ['Libri','eBook','AudioLibri'];

export function renderTopNav(){
  let topNavHTML = '';
  topNavItems.forEach(item => {
    topNavHTML += `<a href="">${item}</a>`;
  });
  document.querySelector('.topnav').innerHTML = topNavHTML;
}