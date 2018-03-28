export default () => {
  $('.js-popup').magnificPopup({
    tClose: 'Закрыть (Esc)',
    fixedBgPos: true,
    fixedContentPos: true,
    removalDelay: 300,
    mainClass: 'mfp-fade'
  });
}