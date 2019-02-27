import IMask from 'iMask';

export default () => {
  const phoneInputs = document.querySelectorAll('[type=tel]');

  if (phoneInputs) {
    for (const input of phoneInputs) {
      const phoneMask = new IMask(input, {
        mask: '+{0} (000) 000-0000',
        lazy: true,
        placeholderChar: '_'
      });
    }
  }
}