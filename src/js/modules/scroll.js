export default () => {
  let onScroll = () => {
    let stickyHeaderHeight = $('.header.sticky').outerHeight() - 1;
    let scrollTop = $(document).scrollTop();
    let linksDesktopNav = $('.header-nav .js-scroll');
    let linksMobileNav = $('.popup-nav .js-scroll');
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
    let stickyHeaderHeight = $('.header.sticky').outerHeight() - 1;
    
    if ($(this).hasClass('button--scroll-top')) {
      $('html, body').animate({
        scrollTop: 0
      }, transitionTime);
    } else {
      let hash = $(this).attr('href');
      let target = $(hash);
      
      if (target.length == 1) {
        if ($(this).hasClass('nav__link')) {
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