export default () => {
  let dragOff = (e) => {
    for (e of document.querySelectorAll(e)) {
      e.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });
    }
  };
  
  dragOff('img');
}