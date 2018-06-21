import popupDefaultOptions from './options/popupDefaultOptions';

export default (src) => {
  $.magnificPopup.open(
    Object.assign(
      popupDefaultOptions,
      {
        items: {
          src: src
        }
      }
    )
  );
}