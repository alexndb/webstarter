import $ from 'jquery';
import popupDefaultOptions from '../../js/modules/libs/magnificPopup/options/popupDefaultOptions';

export default () => {
  let parent = $('.header .container');
  let btnToggle = `
    <a href='#popup-nav' class='button button--toggle'>
        <span></span>
        <span></span>
        <span></span>
    </a>
  `;
  
  parent.append(btnToggle);
  
  $('.button--toggle').on('click', function () {
    $.magnificPopup.open(
      Object.assign(
        popupDefaultOptions,
        {
          items: {
            src: $(this).attr('href')
          }
        }
      )
    );
  });
}