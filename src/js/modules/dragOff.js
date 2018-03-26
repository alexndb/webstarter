export default () => {
  let dragOff = (e) => {
    Array.from(e).forEach((e) => {
      e.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });
    });
  };
  
  dragOff(document.querySelectorAll('img'));
}