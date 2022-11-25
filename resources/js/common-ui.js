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
  });

  // ------------------------ ui 함수 -----------------------------//
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

    function setTransform(swiper) {
      $('.swiper-slide').removeClass('active');
      const activeIndex = swiper.activeIndex;
      const activeSlide = swiper.slides[activeIndex];
      $(activeSlide).addClass('active');
    }
  }
})(this);
