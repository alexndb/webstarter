export default function selects() {
  let selects = $('select');

  selects.each(function () {
    let select = $(this);
    let dataPlaceholder = select.attr('data-placeholder');

    select.select2({
      minimumResultsForSearch: Infinity,
      placeholder: dataPlaceholder
    });
  });
}