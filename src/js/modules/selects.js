function selects() {
    var selects = $("select");

    selects.each(function () {
        var select = $(this);
        var dataPlaceholder = select.attr('data-placeholder');

        select.select2({
            minimumResultsForSearch: Infinity,
            placeholder: dataPlaceholder
        });
    });
}

export default {
    selects: selects
}