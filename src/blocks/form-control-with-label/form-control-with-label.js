export default () => {
  let inputsWithLabel = document.querySelectorAll('.with-label input');
  let textareasWithLabel = document.querySelectorAll('.with-label textarea');

  let withLabel = (elements) => {
    for (let element of elements) {
      let label = element.parentElement.querySelector('label');

      label.addEventListener('click', function() {
        this.parentElement.querySelector('input, textarea').focus();
      });

      element.addEventListener('focus', function() {
        this.parentElement.classList.add('active');
      });

      element.addEventListener('blur', function() {
        if (this.value !== '') {
          this.parentElement.classList.add('active');
        } else {
          this.parentElement.classList.remove('active');
        }
      });

      if (element.value !== '' || element.classList.contains('js-datepickerInput')) {
        element.parentElement.classList.add('active');
      } else {
        element.parentElement.classList.remove('active');
      }

    }
  };

  withLabel(inputsWithLabel);
  withLabel(textareasWithLabel);
}