export default function inputFile() {
  let inputsWrap = $('.js-fileInput');

  inputsWrap.each(function () {
    let input = $(this).find('input[type=file]');
    let inputText = $(this).find('.c-input-file-text');
    let inputBtn = $(this).find('.c-btn-fileInput');

    inputBtn.on('click', function () {
      input.trigger('click');
    });

    inputText.on('click', function () {
      input.trigger('click');
    });

    input.on('change', function (e) {
      $('.c-input-file-info').remove();

      if (e.target.files.length != 0) {
        inputText.html(e.target.files[0].name);
        inputBtn.text('Изменить файл');
      } else {
        inputText.html('Файл не выбран');
        inputBtn.html('Выбрать файл');
      }
    });

  })
}