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
    mainTitleAnimation();
    contactTextAnimation();
    // scrollIcon
    scrollIcon();
    // gsap popup
    animationEffect();
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
      // mainSwiper.autoplay.stop();
      flag = true;

      fullScreenPopup.addClass('active');
      fullScreenPopup
        .find('.wrap-contents')
        .removeClass('active')
        .eq(idx)
        .addClass('active');

      $('body').addClass('scroll-disable');
      ScrollTrigger.refresh(true);
      ep = setTimeout(() => {
        fullScreenPopup.find('.project-section > .side, .project-section .contents-area').addClass('active');
      }, 600);
    });
  }

  function closePopup() {
    const fullScreenPopup = $('.full-screen-area');

    fullScreenPopup.find('.btn-popup').click(function() {
      // mainSwiper.autoplay.start();
      flag = false;
      fullScreenPopup.removeClass('active');
      fullScreenPopup.find('.wrap-contents').removeClass('active');
      $('body').removeClass('scroll-disable');

      fullScreenPopup.find('.project-section > .side, .project-section .contents-area').removeClass('active');

      clearTimeout(ep);
    });
  }

  // textillate main title animation
  function mainTitleAnimation() {
    $('.main-title').textillate({
      loop: false,
      minDisplayTime: 3000,
      initialDelay: 2600,

      in: {
        effect: 'bounceIn',
        delayScale: 5
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
    $('body').addClass('scroll-disable');
    var tl = gsap.timeline({});
    // main visual timeline animation
    tl.to('.loading-title-effect', { css: { className: 'loading-title-effect link fill' } });
    tl.to('.loading-title-effect', { opacity: 0, duration: 0.3, delay: 1.6 });
    tl.to('.loading-line', { yPercent: 200, delay: 0.1 });
    tl.to('.loading-dim', {
      css: { className: 'dimShow loading-dim' },
      delay: 0.7
    });
    tl.to('.gnb-wrap', { css: { className: 'gnbShow gnb-wrap' } });
    tl.to('.list-menu', { y: 0, opacity: 1, duration: 0.6, ease: 'Power1.easeOut', delay: 0.5 });
    tl.to('.loading-dim', {
      display: 'none',
      delay: -2,
      onComplete: function() {
        $('body').removeClass('scroll-disable');
      }
    });

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

  // gsap animation project
  function animationEffect() {
    //// 마크업 순서대로 scrolltrigger도 순서에 맞게 배치해야함

    let effectLine = $('.effect-line');
    let fixTitle = $('.intro-fix-title');
    let card02 = $('.card-item02');
    let card03 = $('.card-item03');
    let card04 = $('.card-item04');
    let comparisonImage01 = $('.afterImage');
    let comparisonImage02 = $('.afterImage img');
    let view01 = $('.seperate01');
    let view02 = $('.seperate02');
    let view03 = $('.seperate03');

    ////// intro line & title 효과
    let tl1 = gsap.timeline();
    ScrollTrigger.create({
      animation: tl1,
      trigger: '.intro-fix-wrap',
      scroller: '.wrap-contents-container',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      pin: true,
      pinSpacing: false
    });

    tl1.to(fixTitle, {
      scale: 1.5,
      ease: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      duration: 1,
      opacity: 0
    });
    tl1.from(effectLine, {
      scaleX: 0,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 1.5,
      delay: -1
    });

    ////// title pinning 효과
    gsap.utils.toArray('.panel').forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        scroller: '.wrap-contents-container',
        start: 'top top',
        pin: true,
        pinSpacing: false,
        anticipatePin: 1
      });
    });

    ////// 3등분 효과
    let tl3 = gsap.timeline();
    ScrollTrigger.create({
      animation: tl3,
      trigger: '.section-seperate-effect',
      scroller: '.wrap-contents-container',
      start: 'top top',
      end: () => '+=' + innerHeight * 3,
      scrub: true,
      pin: true
    });

    tl3
      .fromTo(view01, { minWidth: '100%', transformOrigin: '0 100% 0', duration: 0.8 }, { minWidth: 'calc(33.33% - 8px)', transformOrigin: '0 0 0' })
      .fromTo(view02, { minWidth: '100%', transformOrigin: '0 100% 0', duration: 0.8 }, { minWidth: 'calc(33.33% - 8px)', transformOrigin: '0 0 0' })
      .fromTo(view03, { minWidth: '50%', transformOrigin: '0 100% 0', duration: 0.8 }, { minWidth: 'calc(33.33% - 8px)', transformOrigin: '0 0 0' });

    ////// 스크롤 시 이미지 컬러로 채워지는 효과
    let tl4 = gsap.timeline();
    ScrollTrigger.create({
      animation: tl4,
      trigger: '.comparisonSection',
      scroller: '.wrap-contents-container',
      start: 'top top',
      end: () => '+=' + innerHeight * 2.5,
      scrub: true,
      pin: true
    });
    // animate the container one way...
    tl4.fromTo(comparisonImage01, { xPercent: 100, x: 0 }, { xPercent: 0 });
    // ...and the image the opposite way (at the same time)
    tl4.fromTo(comparisonImage02, { xPercent: -100, x: 0 }, { xPercent: 0 }, 0);

    ////// 카드 순서대로 커지는 효과
    let tl2 = gsap.timeline();
    ScrollTrigger.create({
      animation: tl2,
      trigger: '.section-card-effect',
      scroller: '.wrap-contents-container',
      start: 'top top',
      end: '+=2000',
      scrub: true,
      pin: true
    });
    var duration = 0.7;
    var fromOption = {
      scale: 0,
      opacity: 0,
      transformOrigin: '0 0 0',
      ease: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
    };

    function toOption(index) {
      var option = {
        scale: 1,
        opacity: 1,
        ease: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        duration: duration * index,
        transformOrigin: '0 100% 0'
      };

      return option;
    }
    tl2
      .fromTo(card02, fromOption, toOption(1.5))
      .fromTo(card03, fromOption, toOption(1))
      .fromTo(card04, fromOption, toOption(1.5));
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
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: false
      //   // pauseOnMouseEnter: true
      // },
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

    // $('.inner-contents').on({
    //   mouseenter: function() {
    //     mainSwiper.autoplay.stop();
    //   },
    //   mouseleave: function() {
    //     if (!flag) {
    //       mainSwiper.autoplay.start();
    //     }
    //   }
    // });

    function setTransform(swiper) {
      $('.swiper-slide').removeClass('active');
      const activeIndex = swiper.activeIndex;
      const activeSlide = swiper.slides[activeIndex];
      $(activeSlide).addClass('active');
    }
  }
})(this);
