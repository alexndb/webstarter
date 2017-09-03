export default function inputs() {
  $('input').on('focus', function () {
    $(this).addClass('active');
  });

  $('input').on('blur', function () {
    if ($(this).val() != '') {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });
}