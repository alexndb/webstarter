import popupDefaultOptions from './libs/magnificPopup/options/popupDefaultOptions';

export default () => {
  let parent = $('.c-header .container');
  let btnToggle = `
    <a href='#popup-nav' class='c-btn-toggle js-popup'>
        <span></span>
        <span></span>
        <span></span>
    </a>
  `;
  
  parent.append(btnToggle);
  
  $('.c-btn-toggle').on('click', function () {
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