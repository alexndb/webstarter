export default () => {
  let transitionTime = 500;
  let stickyHeaderHeight = 0;
  
  $('body').on('click', '.js-scroll', function (e) {
    e.preventDefault();
    
    if ($(this).hasClass('c-btn-scroll-top')) {
      $('html, body').animate({
        scrollTop: 0
      }, transitionTime);
    } else {
      let block = $(this).attr('href');
      
      if ($(block).length == 1) {
        if ($(this).hasClass('c-popup-nav-item-link')) {
          $.magnificPopup.close();
        }
        
        $('html, body').animate({
          scrollTop: $(block).offset().top - stickyHeaderHeight
        }, transitionTime);
      } else {
        location.assign(`./${block}`);
      }
    }
  });
}