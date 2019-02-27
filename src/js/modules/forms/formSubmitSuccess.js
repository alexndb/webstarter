import $ from 'jquery';

export default (form) => {
  $.magnificPopup.open({
    items: {
      src: '#popup-success'
    },
    type: 'inline'
  });
}