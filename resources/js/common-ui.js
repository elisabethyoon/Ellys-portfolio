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
    // mask 애니메이션
    maskAnimation();
    // section 타이틀 애니메이션
    sectionTitleAnimation();
  });

  // ------------------------ ui 함수 -----------------------------//
  function contentsAnimation() {
    /*scroll event*/
    $(window).scroll(function() {
      //window scroll-top 변수 처리
      var _st = $(window).scrollTop();
      var _windowHeight = $(window).height();
      var item = $('.portfolio-list > .list-item');
      var title = $('#pagelayout .title-menu');

      // portfolio contents animation
      item.each(function(i) {
        var $this = $(this);
        var _offsetTop = $this.offset().top;
        var _workContents = $this.find('.scroll-animation');

        if (_st + _windowHeight / 1.2 >= _offsetTop) {
          $this.addClass('active');
          _workContents.addClass('active');
        } else {
          $this.removeClass('active');
          _workContents.removeClass('active');
        }
      });

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

    gsap.to('.stack', {
      scrollTrigger: {
        trigger: '.stack',
        start: 'top 90%',
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

  function maskAnimation() {
    // intro-text
    gsap.utils.toArray('.scroll-animation-element').forEach(function(section) {
      var mask1 = $(section).find('.mask1');
      var mask2 = $(section).find('.mask2');
      var mask3 = $(section).find('.mask3');
      var mask4 = $(section).find('.mask4');

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'center 70%',
          scrub: false,
          toggleActions: 'restart none none reset'
        }
      });
      tl.to(mask1, { scaleY: 0, duration: 0.5, ease: 'expo.out' }, 0.3);
      tl.to(mask2, { scaleY: 0, duration: 0.5, ease: 'expo.out' }, 0.5);
      tl.to(mask3, { scaleY: 0, duration: 0.5, ease: 'expo.out' }, 0.7);
      tl.to(mask4, { scaleY: 0, duration: 0.5, ease: 'expo.out' }, 0.9);
    });
  }
  // ------------------------ ui 함수 -----------------------------//
})(this);
