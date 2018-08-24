import selectValidate from "../../js/modules/forms/validation/selectValidate";
import removeError from "../../js/modules/forms/validation/errors/removeError";
import $ from 'jquery';
import 'select2/dist/js/select2';

export default () => {
  let selects = $('select');
  
  selects.each(function () {
    let select = $(this);
    let dataPlaceholder = select.attr('data-placeholder');
    
    select.select2({
      minimumResultsForSearch: Infinity,
      placeholder: dataPlaceholder
    });
    
    select.on('select2:close', (e) => {
      removeError(e.target);
      selectValidate(e.target);
    });
  });
}