export default () => {
  for (let e of document.querySelectorAll('input')) {
    e.addEventListener('focus', (e) => {
      e.target.classList.add('active');
    });
    
    e.addEventListener('blur', (e) => {
      if (e.target.value != '') {
        e.target.classList.add('active');
      } else {
        e.target.classList.remove('active');
      }
    });
  }
}