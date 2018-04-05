export default () => {
  let inputsWrap = document.querySelectorAll('.js-fileInput');
  
  for (let e of inputsWrap) {
    let input = e.childNodes[3];
    let inputText = e.childNodes[1].childNodes[1];
    let inputBtn = e.childNodes[1].childNodes[3];
    let previewImagesContainer = e.childNodes[5].childNodes[1];
    let onClick = () => {
      input.dispatchEvent(new MouseEvent('click'));
    };
    let showImagesPreview = (images) => {
      for (let image of images.files) {
        let reader = new FileReader();
        
        reader.onload = (e) => {
          let img = previewImagesContainer.appendChild(document.createElement('div'));
          img.classList.add('c-input-file-content-preview-image');
          img.style.backgroundImage = `url(${e.target.result})`;
          img.addEventListener('click', (e) => {
            e.target.remove();
          });
        };
        reader.readAsDataURL(image);
      }
    };
    
    inputBtn.addEventListener('click', () => {
      onClick();
    });
    
    inputText.addEventListener('click', () => {
      onClick();
    });
    
    input.addEventListener('change', (e) => {
      showImagesPreview(e.target);
      
      if (e.target.files.length == 1) {
        inputText.innerText = e.target.files[0].name;
        inputBtn.innerText = 'Изменить файл';
      } else if (e.target.files.length > 1) {
        inputText.innerText = `Выбрано файлов: ${e.target.files.length}`;
        inputBtn.innerText = 'Выбрать файл';
      } else {
        inputText.innerText = 'Файл не выбран';
        inputBtn.innerText = 'Выбрать файл';
      }
    });
  }
}