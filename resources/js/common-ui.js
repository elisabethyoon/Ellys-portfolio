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
    // circleEffect
    main_circle_effect();
    // textillate animation
    contactTextAnimation();
    mainTitleAnimation();
    // scrollIcon
    scrollIcon();
  });

  // ------------------------ ui 함수 -----------------------------//

  var ep = null;
  var flag = false;
  function fullScreenPopup() {
    const sliderList = $('.slider-contents > li');

    const fullScreenPopup = $('.full-screen-area');
    sliderList.find('.btn-more').click(function() {
      var idx = $(this)
        .closest('.pj-item')
        .attr('data-index');
      mainSwiper.autoplay.stop();
      flag = true;

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
      mainSwiper.autoplay.start();
      flag = false;
      fullScreenPopup.removeClass('active');
      fullScreenPopup.find('.wrap-contents').removeClass('active');
      $('body').removeClass('scroll-disable');

      fullScreenPopup.find('.project-section > .side').removeClass('active');

      clearTimeout(ep);
    });
  }

  // textillate main title animation
  function mainTitleAnimation() {
    $('.main-title').textillate({
      loop: false,
      minDisplayTime: 3000,
      initialDelay: 2300,

      in: {
        effect: 'bounceIn',
        delayScale: 3
      }
    });
  }

  // textillate contact text animation
  function contactTextAnimation() {
    $('.pr-text').textillate({
      loop: true,
      minDisplayTime: 1000,
      initialDelay: 0,

      in: {
        effect: 'flash',
        delayScale: 3
      },
      out: {
        effect: 'rotateOutUpLeft',
        delayScale: 3,
        sync: false,
        shuffle: true,
        reverse: false
      }
    });
  }

  function contentsAnimation() {
    /*scroll event*/
    $(window).scroll(function() {
      //window scroll-top 변수 처리
      var _st = $(window).scrollTop();
      var _windowHeight = $(window).height();
      var title = $('#pagelayout .title-effect');

      // title-memu animation
      title.each(function(i) {
        var $this = $(this);
        var _offsetTop = $this.offset().top;

        if (_st + _windowHeight / 1.3 > _offsetTop) {
          $this.addClass('fill');
        } else {
          $this.removeClass('fill');
        }
      });
    });
  }

  function gsapAnimation() {
    var tl2 = gsap.timeline({});
    // main visual timeline animation
    tl2.to('.loading-title-effect', { css: { className: 'loading-title-effect link fill' } });
    tl2.to('.loading-title-effect', { opacity: 0, duration: 1, delay: 0.5 });
    tl2.to('.loading-line', { yPercent: 200, delay: 0.5 });
    tl2.to('.loading-dim', {
      css: { className: 'dimShow loading-dim' },
      delay: 0.8
    });
    tl2.to('.gnb-wrap', { css: { className: 'gnbShow gnb-wrap' } });
    tl2.to('.list-menu', { y: 0, opacity: 1, duration: 0.6, ease: 'Power1.easeOut', delay: 0.5 });
    tl2.to('.loading-dim', { display: 'none', delay: -2 });

    gsap.registerPlugin(ScrollTrigger);
    // career-contents
    gsap.to('.section-inner', {
      scrollTrigger: {
        trigger: '.section-inner',
        start: 'top 90%',
        toggleActions: 'restart none none reset'
      },
      y: 0,
      opacity: 1
    });
  }

  function sectionTitleAnimation() {
    // section-memu animation
    gsap.utils.toArray('.scroll-animation-title').forEach(function(e) {
      var st01 = $(e).find('.st01');
      var profileImg = $(e).find('.profile-img');
      var mask = $(e).find('.mask');

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: e,
          start: 'top 95%',
          end: 'center 70%',
          scrub: false,
          // markers: true,
          toggleActions: 'restart none none reset'
        }
      });
      tl.to(st01, { x: 0, opacity: 1, ease: Expo.out, duration: 1.5 }, 0.5);

      tl.to(mask, { scaleX: 0, duration: 1.5, ease: Expo.out }, 0.4);
      tl.from(profileImg, { scale: 1.3, duration: 2.5 }, 0.4);
    });
  }

  // gnbscroll
  function gnbScrollEvent() {
    $('.list-menu')
      .eq(0)
      .addClass('active');
    $('.link-menu').click(function() {
      $('html, body').animate(
        {
          scrollTop: $($(this).attr('href')).offset().top
        },
        300
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

  // circle effect
  function main_circle_effect() {
    setTimeout(function() {
      $('.circle-eff .obj-circle-04').addClass('after-start');
    }, 6000);
  }

  // scrollIcon
  function scrollIcon() {
    setTimeout(function() {
      $('.scroll-icon').addClass('show');
    }, 4000);
  }

  // slider
  let mainSwiper = null;
  function slider() {
    mainSwiper = new Swiper('.mySwiper', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
        // pauseOnMouseEnter: true
      },
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
        mainSwiper.allowTouchMove = false;
      },
      mouseleave: function() {
        mainSwiper.allowTouchMove = true;
      }
    });

    $('.inner-contents').on({
      mouseenter: function() {
        mainSwiper.autoplay.stop();
      },
      mouseleave: function() {
        if (!flag) {
          mainSwiper.autoplay.start();
        }
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
