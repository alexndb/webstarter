import selectValidate from "../forms/validation/selectValidate";
import removeError from "../forms/validation/errors/removeError";

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