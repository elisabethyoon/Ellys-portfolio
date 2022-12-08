(function(exports) {
  var $window = $(window);
  var $document = $(document);

  $document.ready(function() {
    $body = $('body');
    $header = $('#header');
    // ------------------------ ui 함수 실행 -----------------------------//
    // portfolio 애니메이션
    contentsAnimation();
    // gsap 애니메이션
    gsapAnimation();
    // section 타이틀 애니메이션
    sectionTitleAnimation();
    // project slider
    slider();
    // popup full-screen
    fullScreenPopup();
    // popup close
    closePopup();
    //gnbscroll
    gnbScrollEvent();
  });

  // ------------------------ ui 함수 -----------------------------//

  var ep = null;
  function fullScreenPopup() {
    const sliderList = $('.slider-contents > li');

    const fullScreenPopup = $('.full-screen-area');
    sliderList.find('.btn-more').click(function() {
      var idx = $(this)
        .closest('.pj-item')
        .index();

      fullScreenPopup.addClass('active');
      fullScreenPopup
        .find('.wrap-contents')
        .removeClass('active')
        .eq(idx)
        .addClass('active');

      $('body').addClass('scroll-disable');

      ep = setTimeout(() => {
        fullScreenPopup.find('.project-section > .side').addClass('active');
      }, 600);
    });
  }

  function closePopup() {
    const fullScreenPopup = $('.full-screen-area');

    fullScreenPopup.find('.btn-popup').click(function() {
      fullScreenPopup.removeClass('active');
      fullScreenPopup.find('.wrap-contents').removeClass('active');
      $('body').removeClass('scroll-disable');

      fullScreenPopup.find('.project-section > .side').removeClass('active');

      clearTimeout(ep);
    });
  }

  function contentsAnimation() {
    /*scroll event*/
    $(window).scroll(function() {
      //window scroll-top 변수 처리
      var _st = $(window).scrollTop();
      var _windowHeight = $(window).height();
      var title = $('#pagelayout .title-menu');

      // title-memu animation
      title.each(function(i) {
        var $this = $(this);
        var _offsetTop = $this.offset().top;

        if (_st + _windowHeight / 1.4 > _offsetTop) {
          $this.addClass('fill');
        } else {
          $this.removeClass('fill');
        }
      });
    });
  }

  function gsapAnimation() {
    // main-title
    var tl = gsap.timeline({});
    tl.to('.main-title', { x: 0, opacity: 1, duration: 1.2, ease: 'Power1.easeOut' }, 0.5);
    tl.to('.main-text', { x: 0, opacity: 1, duration: 1.2, ease: 'Power1.easeOut' }, 1);
    tl.to('.list-menu', { y: 0, opacity: 1, duration: 1, ease: 'Power1.easeOut' }, 1.2);

    gsap.registerPlugin(ScrollTrigger);
    // profile-img
    gsap.to('.profile-img', {
      scrollTrigger: {
        trigger: '.profile-img',
        start: 'top 85%',
        // markers: true,
        scrub: true,
        toggleActions: 'restart pause reverse pause'
      },
      y: -300,
      duration: 3
    });

    // about-info-text
    gsap.to('.about-info-text', {
      scrollTrigger: {
        trigger: '.about-info-text',
        start: 'top 80%',
        // markers: true,
        scrub: true,
        toggleActions: 'restart none none reset'
      },
      y: 0,
      opacity: 1,
      duration: 1
    });

    // career-contents
    gsap.to('.section-inner', {
      scrollTrigger: {
        trigger: '.section-inner',
        start: 'top 80%',
        // markers: true,
        scrub: true,
        toggleActions: 'restart none none reset'
      },
      y: 0,
      opacity: 1,
      duration: 1
    });
  }

  function sectionTitleAnimation() {
    // section-memu animation
    gsap.utils.toArray('.scroll-animation-title').forEach(function(e) {
      var sectionTitle1 = $(e).find('.st01');
      var sectionTitle2 = $(e).find('.st02');
      var sectionTitle3 = $(e).find('.st03');

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: e,
          start: 'top 90%',
          end: 'center 80%',
          scrub: true,
          // markers: true,
          toggleActions: 'restart none none reset'
        }
      });
      tl.to(sectionTitle1, { x: 0, opacity: 1, duration: 2, ease: 'power1.out' }, 1);
      tl.to(sectionTitle2, { x: 0, opacity: 1, duration: 2, ease: 'power1.out' }, 1);
      tl.to(sectionTitle3, { x: 0, opacity: 1, duration: 2, ease: 'power1.out' }, 1);
    });
  }

  function gnbScrollEvent() {
    $('.gnb-wrap').animate(
      {
        width: '80%'
      },
      1000
    );
    $('.list-menu')
      .eq(0)
      .addClass('active');
    $('.link-menu').click(function() {
      $('html, body').animate(
        {
          scrollTop: $($(this).attr('href')).offset().top
        },
        700
      );
      return false;
    });

    const sections = $('section');
    $(window).on('scroll', function() {
      sections.each(function(index) {
        var offset_top = $(this).offset().top;
        var scrollTop = $(window).scrollTop();
        if (offset_top <= scrollTop + 10) {
          $('.list-menu').removeClass('active');
          $('.list-menu')
            .eq(index)
            .addClass('active');
        }
      });
    });
  }

  // ------------------------ ui 함수 -----------------------------//

  // slider
  function slider() {
    const swiper = new Swiper('.mySwiper', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 0,
      // loop: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        init: function(swiper) {
          setTransform(swiper);
        },
        slideChange: function(swiper) {
          setTransform(swiper);
        }
      }
    });

    $('.btn-more').on({
      mouseenter: function() {
        console.log(111);
        swiper.allowTouchMove = false;
      },
      mouseleave: function() {
        console.log(2222);
        swiper.allowTouchMove = true;
      }
    });

    function setTransform(swiper) {
      $('.swiper-slide').removeClass('active');
      const activeIndex = swiper.activeIndex;
      const activeSlide = swiper.slides[activeIndex];
      $(activeSlide).addClass('active');
    }
  }
})(this);
