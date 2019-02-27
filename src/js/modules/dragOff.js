export default () => {
  const dragOff = (elements) => {
    for (const element of document.querySelectorAll(elements)) {
      element.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });
    }
  };

  dragOff('img');
}