export default () => {
  let onScroll = () => {
    let stickyHeaderHeight = $('.c-header.sticky').outerHeight() - 1;
    let scrollTop = $(document).scrollTop();
    let linksDesktopNav = $('.c-header-nav .js-scroll');
    let linksMobileNav = $('.c-popup-nav .js-scroll');
    let changeActiveLink = (links) => {
      links.each(function () {
        let hash = $(this).attr('href');
        let target = $(hash);
        
        if (hash[0] == '#') {
          if (target.position().top - stickyHeaderHeight <= scrollTop && target.position().top + target.outerHeight() - stickyHeaderHeight > scrollTop) {
            links.removeClass('active');
            $(this).addClass('active');
          } else {
            $(this).removeClass('active');
          }
        }
      });
    };
    
    changeActiveLink(linksDesktopNav);
    changeActiveLink(linksMobileNav);
  };
  
  $(document).on('scroll', onScroll);
  
  $('body').on('click', '.js-scroll', function (e) {
    e.preventDefault();
    
    $(document).off('scroll');
    
    let transitionTime = 900;
    let stickyHeaderHeight = $('.c-header.sticky').outerHeight() - 1;
    
    if ($(this).hasClass('c-btn-scroll-top')) {
      $('html, body').animate({
        scrollTop: 0
      }, transitionTime);
    } else {
      let hash = $(this).attr('href');
      let target = $(hash);
      
      if (target.length == 1) {
        if ($(this).hasClass('c-popup-nav-item-link')) {
          $.magnificPopup.close();
        }
        
        $('html, body').animate({
          scrollTop: target.offset().top - stickyHeaderHeight
        }, transitionTime, function () {
          $(document).on('scroll', onScroll);
        });
        
        $('.js-scroll.active').removeClass("active");
        $(this).addClass("active");
      } else {
        location.assign(`./${hash}`);
      }
    }
  });
}