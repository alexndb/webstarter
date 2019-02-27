import $ from 'jquery';
import 'select2/dist/js/select2';
// import Validation from '../../js/modules/Validation';

export default () => {
  let selects = document.querySelectorAll('select');

  for (let select of selects) {
    let dataPlaceholder = select.dataset.placeholder;
    select = $(select);

    select.select2({
      minimumResultsForSearch: Infinity,
      placeholder: dataPlaceholder,
      width: '100%'
    });

    // select.on('select2:close', function () {
    //   let selectsForValidate = new Validation(this);
    //
    //   selectsForValidate.validate();
    // });
  }
}