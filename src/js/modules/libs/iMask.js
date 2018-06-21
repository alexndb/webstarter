import IMask from 'iMask';

export default () => {
  for (let e of document.querySelectorAll('.js-phoneMask')) {
    let phoneMask = new IMask(e, {
      mask: '+{0} (000) 000-0000',
      lazy: true,
      placeholderChar: '_'
    });
  }
}