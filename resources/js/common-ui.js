(function(exports) {
  var $window = $(window);
  var $document = $(document);
  var $selectric; // 셀렉트릭
  var sliderArr = []; // 슬라이드 배열
  var $body = $('body');
  var $header = $('#header');

  $document.ready(function() {
    $body = $('body');
    $header = $('#header');
    // ------------------------ 공통 함수 실행 -----------------------------//
    // 셀렉트박스
    selectric();
    // 모바일메뉴 핸들러
    mobileMenuHandler();
    // 헤더 스크롤감지
    scrollHeader();
    // 아코디언 핸들러
    accordionHandler();
    // input active 핸들러
    inputActiveHandler();
    // 달력
    datePicker();
    // 최상단버튼
    floatBtnTop();
    // 스크롤 애니메이션
    scrollAnimation();
    // 탭 컨텐츠
    tabContentController();
    // 평점 선택
    ratingSelectHandler();
    // 글자수 표시 및 제한
    // textLengthCheck();
    // 헤더 높이 감지 컨텐츠간격
    // contentSpaceFn();
    // 숫자 카운팅
    // new NumberCounter('countNumber');

    // ------------------------ ui 함수 실행 -----------------------------//
    // 슬라이드
    sliderMaker();
    // ------- 엘리 ------- //
    contentsAnimation();
    gsapAnimation();
    introTextAnimation();
    sectionTitleAnimation();
  });

  // ------------------------ ui 함수 -----------------------------//
  function sliderMaker() {
    var exampleSlider = sliderInit('.slider-example', {
      loop: false,
      // slidesPerView: 2
      // centeredSlides: true,
      // spaceBetween: 30,
      // freeMode: true,
      // autoplay: {
      //   delay: 1000,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: false,
      // },
      // autoHeight: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        // 모바일에서 -> pc
        360: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 'auto'
        }
      }
    });
  }
  // ------------------------ ui 함수 -----------------------------//

  // ------------------------ 공통 함수(공통함수의 수정이 필요한 경우 공유 후 작업) ---------------------------//

  // 팝업 컨트롤러
  var layerPopup = {
    popupArr: [],
    zIndex: 999,
    // 특정 팝업 열기
    openPopup: function(popupId, dimFlag) {
      var $popupEl = $('#' + popupId);
      var _ = this;
      var $closeBtn = $popupEl.find('.popup-close');
      var $popupContainer = $popupEl.find('.popup-container');
      // 팝업 배열에 담기
      _.popupArr.push($popupEl);

      // 팝업 오픈
      $popupEl.addClass('open').css({
        zIndex: _.zIndex + _.popupArr.length
      });

      // body 스크롤 막기
      $body.addClass('scroll-disable');
      if (!$('.layer-popup-dim').length) {
        // dim없을경우 생성
        $body.append('<div class="layer-popup-dim"></div>');
      }

      $('.layer-popup-dim').addClass('show');

      // 팝업닫기 눌렀을때
      $closeBtn.off('click');
      $closeBtn.on('click', function(e) {
        e.preventDefault();
        _.closePopup(popupId);
      });

      if (!dimFlag) {
        // dim 클릭시 팝업 전부 닫기
        $popupEl.off('click');
        $popupEl.on('click', function(e) {
          if (!$(e.target).closest($popupContainer).length) {
            _.closeAllPopup();
          }
        });
      }

      // ie에서 max-height값 안먹는거 처리
      var agent = navigator.userAgent.toLowerCase();

      if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || agent.indexOf('msie') != -1) {
        var popupSpace = parseInt($popupEl.css('padding-top')) + parseInt($popupEl.css('padding-bottom'));
        var popupContainerHeight = $popupEl.find('.popup-container').outerHeight() + popupSpace + 2;
        var winH = $window.height();
        if (popupContainerHeight >= winH) {
          $popupEl.find('.popup-container').css('height', '100%');
        }
      }
    },
    // 특정 팝업 닫기
    closePopup: function(popupId) {
      var _ = this;
      var $popupEl = popupId ? $('#' + popupId) : _.popupArr[_.popupArr.length - 1];
      $popupEl.removeClass('open');
      $body.removeClass('scroll-disable');
      _.popupArr = _.popupArr.filter(function(item) {
        return item.attr('id') !== $popupEl.attr('id');
      });
      if (_.popupArr.length === 0) {
        $('.layer-popup-dim').removeClass('show');
      }
    },
    // 모든 팝업 닫기
    closeAllPopup: function() {
      var _ = this;
      for (var i = 0; i < _.popupArr.length; i++) {
        _.popupArr[i].removeClass('open');
      }
      _.popupArr = [];
      $('.layer-popup-dim').removeClass('show');
    }
  };

  function mobileMenuHandler() {
    var $moblieNavBtn = $('.mobile-nav-btn');
    var $dim = $('.gnb-dim');
    $moblieNavBtn.on('click', function() {
      mobileMenuFn();
    });
    $dim.on('click', function() {
      mobileMenuFn();
    });

    function mobileMenuFn() {
      if (!$header.hasClass('open')) {
        $header.addClass('open');
        $body.addClass('scroll-disable');
      } else {
        $header.removeClass('open');
        $body.removeClass('scroll-disable');
      }
    }
  }

  // 스크롤 이동 함수
  function scorllMoveTo(id, between) {
    var offset = id ? $('#' + id).offset().top : 0;
    var _between = between ? between : 0;
    $('html, body').animate({scrollTop: offset - _between}, 300);
  }

  function scrollHeader() {
    headerScrollFn();
    $window.on('scroll', function() {
      headerScrollFn();
    });

    function headerScrollFn() {
      var _sct = $window.scrollTop();
      if (_sct > 0) {
        $header.addClass('scroll');
      } else {
        $header.removeClass('scroll');
      }
    }
  }

  // 슬라이드 생성
  function sliderInit(element, option) {
    if (!$(element).length) return;

    var slider = new Swiper(element, option);
    sliderArr.push(slider);
    return slider;
  }

  // 슬라이드 update(새로고침)
  function sliderUpdate() {
    if (sliderArr[0].length) {
      $.each(sliderArr[0], function(i) {
        sliderArr[0][i].update();
      });
    }
  }

  function selectric() {
    $selectric = $('.selectric');
    if (!$selectric.length) return;
    $selectric.selectric({
      nativeOnMobile: false,
      onInit: function(event, selectric) {
        var $this = $(this);
        initSelectric($this, selectric);
      },
      onRefresh: function(event, selectric) {
        var $this = $(this);
        initSelectric($this, selectric);
      },
      onChange: function() {
        // 셀렉트릭 작동시 select박스 change 트리거
        $(this).trigger('change');
        // float 라벨 있을경우
        if ($(this).hasClass('float')) {
          if ($(this)[0].value) {
            $(this)
              .closest('.selectric-container')
              .addClass('active');
          } else {
            $(this)
              .closest('.selectric-container')
              .removeClass('active');
          }
        }
      },
      onOpen: function() {},
      onClose: function() {}
    });

    // 초기 셋팅 함수
    function initSelectric(target, selectric) {
      // 필수항목일경우
      if (target.hasClass('required') && !target[0].value) {
        selectric.elements.label.append('<span class="required">*</span>');
      }
      // float 라벨 있을경우
      if (target.hasClass('float')) {
        if (target[0].value) {
          target.closest('.selectric-container').addClass('active');
        }
      }
    }
  }

  // 셀렉트릭 새로고침
  function refreshSelectric() {
    $selectric.selectric('refresh');
  }

  function accordionHandler() {
    var accordionContainer = $('.accordion-container');
    if (!accordionContainer.length) return;
    $('body').on('click', '.accordion-header', function() {
      var $this = $(this);
      var speed = 200;
      accordionFn($this, speed);
    });
  }

  function accordionFn(el, speed) {
    speed = speed ? speed : 200;
    // 컨테이너에 solo 클래스가 있으면 각각 토글됨
    if (el.closest('.accordion-container').hasClass('solo')) {
      el.parents('.accordion-list')
        .toggleClass('active')
        .find('.accordion-body')
        .stop()
        .slideToggle(speed);
    } else {
      el.parents('.accordion-list')
        .toggleClass('active')
        .find('.accordion-body')
        .stop()
        .slideToggle(speed)
        .parent('.accordion-list')
        .siblings('.accordion-list')
        .removeClass('active')
        .find('.accordion-body')
        .slideUp(speed);
    }
  }

  function tabContentController() {
    var $tabs = $('.ui-tab-item');
    if (!$tabs.length) return;
    $tabs.on('click', function(e) {
      e.preventDefault();
      var $tab = $(this);
      var _id = $tab.find('a').attr('href');

      $tab
        .addClass('active')
        .siblings('.ui-tab-item')
        .removeClass('active');
      $(_id)
        .show()
        .siblings('.ui-tab-content')
        .hide();
    });
  }

  function inputActiveHandler() {
    var $inputs = $('.input-active');
    if (!$inputs.length) return;

    $inputs.each(function() {
      var $this = $(this);
      var $inputcover = $this.closest('.input-cover');
      if ($this.is('[readonly]') && !$this.hasClass('datepicker-input')) {
        $inputcover.removeClass('active');
        $inputcover.addClass('disable-active');
      } else {
        $inputcover.removeClass('disable-active');
        if ($this.val().length) {
          $inputcover.addClass('active');
        }
      }
    });

    $(document).on('focus change', '.input-active', function(e) {
      var $this = $(this);
      var $inputcover = $this.closest('.input-cover');
      if (!$this.is('[readonly]')) {
        $inputcover.addClass('focus');
        $inputcover.addClass('active');
        $inputcover.removeClass('disable-active');
      }
      if ($this.hasClass('datepicker-input')) {
        $inputcover.addClass('active');
      }
    });

    $(document).on('focusout change', '.input-active', function(e) {
      var $this = $(this);
      var $inputcover = $this.closest('.input-cover');
      var setTimeHandle = setTimeout(function() {
        if (!$this.hasClass('open-datepicker')) {
          $inputcover.removeClass('focus');
          clearTimeout(setTimeHandle);
        }
      }, 100);
      if (!$this.val().length) {
        if (!$this.hasClass('open-datepicker')) {
          $inputcover.removeClass('active');
        }
      }
    });
  }

  function datePicker() {
    var $dateEl = $('.datepicker-input');
    if (!$dateEl.length) return;
    $dateEl.each(function() {
      var $this = $(this);
      if ($this.hasClass('month')) {
        $this.monthpicker({
          monthNames: ['1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)', '5월(MAY)', '6월(JUN)', '7월(JUL)', '8월(AUG)', '9월(SEP)', '10월(OCT)', '11월(NOV)', '12월(DEC)'],
          monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          changeYear: true,
          yearRange: '-60:+0',
          dateFormat: 'yy-mm'
        });
      } else {
        $this.datepicker({
          changeMonth: true,
          changeYear: true,
          yearRange: '-80:+10',
          beforeShow: function() {
            $(this).addClass('open-datepicker');
          },
          onClose: function() {
            $(this).removeClass('open-datepicker');
          }
        });
      }
    });
  }

  function floatBtnTop() {
    $('.float-btn-top').on('click', function() {
      scorllMoveTo();
    });
  }

  function scrollAnimation() {
    var $element = $('.scroll-animate');
    if (!$element.length) return;
    $element.each(function(i) {
      var $this = $(this);
      var delay = $this.attr('data-delay');
      if (delay) {
        $this.css('animation-delay', delay + 's');
      }
      var setTimeHandler = setTimeout(function() {
        animationFn($this);
        clearTimeout(setTimeHandler);
      }, 400);
      $(window).on('scroll', function() {
        animationFn($this);
      });
    });

    function animationFn(element) {
      var _offset = element.offset().top;
      var _sct = $(window).scrollTop();
      var _windowHeight = $(window).height();

      if (_sct + _windowHeight / 1.2 >= _offset) {
        var animationName = element.attr('data-animation') || 'fade-in-bottom';

        element.addClass(animationName);
      }
    }
  }

  function textLengthCheck() {
    var $textareaCover = $('.textarea-cover');
    if (!$textareaCover.length) return;
    var $textarea = $textareaCover.find('textarea');
    $textarea.each(function() {
      setTextCount($(this));
    });
    $textarea.on('keyup', function() {
      setTextCount($(this));
    });

    function setTextCount(el) {
      var _maxLength = el.attr('data-maxLength');
      el.val(el.val().substr(0, _maxLength));
      el.closest('.textarea-cover')
        .find('.count')
        .text(el.val().length + '/' + _maxLength);
    }
  }

  function contentSpaceFn() {
    var $content = $('#content');
    var setTimeHandler = null;
    if (!$header.length) return;
    if ($content.hasClass('space')) {
      setTimeHandler = setTimeout(function() {
        var _headerHeight = $header.outerHeight();
        $content.css('paddingTop', _headerHeight);
        clearTimeout(setTimeHandler);
      }, 150);
    }
  }

  function ratingSelectHandler() {
    var container = $('.rating-select-container');
    var inputs = container.find('input[type="radio"]');
    var labels = container.find('label');
    inputs.on('change', function() {
      if ($(this).prop('checked')) {
        labels.each(function() {
          $(this).removeClass('checked');
        });
        $(this)
          .next('label')
          .addClass('checked')
          .prevAll('label')
          .addClass('checked');
      }
    });
  }

  function NumberCounter(target_frame, target_number) {
    if (!$('#' + target_frame).length) return;
    this.count = 0;
    this.diff = 0;
    this.target_frame = document.getElementById(target_frame);
    this.target_count = this.target_frame.innerHTML;
    this.timer = null;
    this.counter();
  }
  NumberCounter.prototype.counter = function() {
    var self = this;
    this.diff = this.target_count - this.count;

    if (this.diff > 0) {
      self.count += Math.ceil(this.diff / 5);
    }

    this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (this.count < this.target_count) {
      this.timer = setTimeout(function() {
        self.counter();
      }, 20);
    } else {
      clearTimeout(this.timer);
    }
  };

  // ------------------------ 공통 함수 ---------------------------//

  // js 함수 외부사용을 위함

  // 팝업함수
  exports.layerPopup = layerPopup;

  // --- 비동기 실행후 재실행 함수 모음 -- //
  // 슬라이드 업데이트
  exports.sliderUpdate = sliderUpdate;
  // 셀렉트릭 새로고침
  exports.refreshSelectric = refreshSelectric;
  // 셀렉트릭 생성
  exports.selectric = selectric;
  // --- 비동기 실행후 재실행 함수 모음 -- //
})(this);

// ---------------------- 엘리 스크립트 ---------------------- //
function contentsAnimation() {
  /*scroll event*/
  $(window).scroll(function() {
    //window scroll-top 변수 처리
    var _st = $(window).scrollTop();
    var _windowHeight = $(window).height();
    var item = $('.portfolio-list > .list-item');
    var title = $('#pagelayout .title-menu');
    console.log(title.length, '222');
    var sectionTitle = $('#pagelayout .section-title');
    // if (_st + _windowHeight / 2 > title.offset().top) {
    //   console.log(111);
    //   $('.title-menu').addClass('fill');
    // }

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

    // section-memu animation
    // sectionTitle.each(function(i) {
    //   var $this = $(this);
    //   var _offsetTop = $this.offset().top;

    //   if (_st + _windowHeight / 1.4 > _offsetTop) {
    //     $this.addClass('fill');
    //   } else {
    //     $this.removeClass('fill');
    //   }
    // });
  });
}

function gsapAnimation() {
  // main-title
  var tl = gsap.timeline({});
  tl.to('.main-title', {x: 0, opacity: 1, duration: 1.2, ease: 'Power1.easeOut'}, 0.5);
  tl.to('.main-text', {x: 0, opacity: 1, duration: 1.2, ease: 'Power1.easeOut'}, 1);

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

  // section-inner
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
        markers: true,
        toggleActions: 'restart none none reset'
      }
    });
    tl.to(sectionTitle1, {x: 0, opacity: 1, duration: 2, ease: 'power1.out'}, 1);
    tl.to(sectionTitle2, {x: 0, opacity: 1, duration: 2, ease: 'power1.out'}, 1);
    tl.to(sectionTitle3, {x: 0, opacity: 1, duration: 2, ease: 'power1.out'}, 1);
  });
}

function introTextAnimation() {
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

    tl.to(mask1, {scaleY: 0, duration: 0.5, ease: 'expo.out'}, 0.3);
    tl.to(mask2, {scaleY: 0, duration: 0.5, ease: 'expo.out'}, 0.5);
    tl.to(mask3, {scaleY: 0, duration: 0.5, ease: 'expo.out'}, 0.7);
    tl.to(mask4, {scaleY: 0, duration: 0.5, ease: 'expo.out'}, 0.9);
  });
}