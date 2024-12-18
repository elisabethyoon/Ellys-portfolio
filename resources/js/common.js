var Global = Global || {};

var $window = $(window),
	$body = $("body"),
	$wrap = $("#wrap"),
	$header = $("#header"),
	$gnbArea = $header.find(".gnb_area"),
	$gnb = $('#gnb'),
    $footer = $("#footer"),
	smoother,
    ep = null,
    flag = false,
    lenis;
    


Global.utils = {
    /**
     * Global.utils.scrollSmoother - 페이지 스크롤 모션
    */
    scrollSmoother: function() {
        lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000)});
        gsap.ticker.lagSmoothing(0);

    },
    /**
     * Global.utils.mainTitleAnimation - textillate animation
    */
    mainTitleAnimation: function(){
        $('.main-title').textillate({
            loop: false,
            minDisplayTime: 3000,
            initialDelay: 2600,
      
            in: {
              effect: 'bounceIn',
              delayScale: 5
            }
        });
        // let $mainTit = $('.main-title')
        // let $mainTxt = $('.sub-main-title')
        // mainVisual_Motion = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: ".main-visual-contents",
        //         start: "1px top", 
        //         // end: 'bottom 60%',
        //         end: () => '+=200%',
        //         // end: '+=' + innerHeight * 1.5,
        //         pin: true, 
        //         scrub:true,
        //         invalidateOnRefresh: true,
        //         // markers: true,
        //         // pinSpacing: false,
        //         onUpdate: function(self) {
        //             var degree = self.progress * 100;
        //             var progress = Math.floor(degree);
        //             if(self.direction == -1){
        //                 // // up
        //                 if(progress == 0){
        //                     $mainTit.removeClass('active');
        //                 }
        //                 if(progress < 50){
        //                     $mainTxt.removeClass('active');
        //                 }
        //             }
        //             else if(self.direction == 1){
        //                 // down
        //                 if(progress > 35){
        //                     $mainTit.addClass('active');
        //                 }
        //                 if(progress > 70){
        //                     $mainTxt.addClass('active');
        //                 }
        //             }

        //         }
        //     }
        // })
        // .to('.main-visual-bg', {scale: 0.9,})
        // .to('.main-title', {y: -100, opacity: 0, duration: 1 })
        // .to('.sub-main-title', {y:0, opacity: 1,duration: 1,delay:1})
        // .to({}, {}, "+=1")
    },
    /**
     * Global.utils.contentsAnimation
    */
    contentsAnimation: function() {
        /*scroll event*/
        $(window).on('scroll', function() {
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
    },
    /**
     * Global.utils.gsapAnimation
    */
    gsapAnimation: function(){
        $('body').addClass('scroll-disable');
        gsap.registerPlugin(ScrollTrigger);

        let tl = gsap.timeline({});
        // main visual timeline animation
        tl.to('.loading-title-effect', { css: { className: 'loading-title-effect link fill' } });
        tl.to('.loading-title-effect', { opacity: 0, duration: 0.3, delay: 1.6 });
        tl.to('.loading-line', { yPercent: 200, delay: 0.1 });
        tl.to('.loading-dim', {
            css: { className: 'dimShow loading-dim' },
            delay: 0.7
        });
        tl
        .to('.gnb-wrap', { css: { className: 'gnbShow gnb-wrap' } })
        .to('.list-menu', { y: 0, opacity: 1, duration: 0.6, ease: 'Power1.easeOut', delay: 0.5 })
        .to('.loading-dim', {
            display: 'none',
            delay: -2,
            onComplete: function() {
                $('body').removeClass('scroll-disable');
            }
        })
        .to('.main-title', {opacity: 1, duration: 1 })

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

        // project-contents
        tl.to('.portfolio-section', {
            scrollTrigger: {
                trigger: '.portfolio-contents',
                start: 'top 25%',
                // toggleActions: 'restart none none reset',
                // markers: true
            },
            y: 0,
            opacity: 1,
        });
    },
    /**
     * Global.utils.sectionTitleAnimation - section 타이틀 애니메이션
    */
    sectionTitleAnimation: function(){
        // section-memu animation
        gsap.utils.toArray('.scroll-animation-title').forEach(function(e) {
            var st01 = $(e).find('.st01');
            var profileImg = $(e).find('.profile-img');
            var mask = $(e).find('.mask');
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: e,
                    id: 'animation-title',
                    start: 'top 50%',
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
    },
    /**
     * Global.utils.slider - project slider
    */
    slider: function(){
        // slider
        let mainSwiper = null;
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
    },
    /**
     * Global.utils.fullScreenPopup - popup full-screen
    */
    fullScreenPopup: function(){
        const sliderList = $('.slider-contents > li');

        const fullScreenPopup = $('.full-screen-area');
        sliderList.find('.btn-more').click(function() {
            // lenis.stop();
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
    },
    /**
     * Global.utils.closePopup - popup close
    */
    closePopup: function() {
        const fullScreenPopup = $('.full-screen-area');

        fullScreenPopup.find('.btn-popup').click(function() {
            // mainSwiper.autoplay.start();
            // lenis.start();
            flag = false;
            fullScreenPopup.removeClass('active');
            fullScreenPopup.find('.wrap-contents').removeClass('active');
            $('body').removeClass('scroll-disable');

            fullScreenPopup.find('.project-section > .side, .project-section .contents-area').removeClass('active');

            clearTimeout(ep);
        });
    },
    /**
     * Global.utils.gnbScrollEvent - gnbscroll
    */
    gnbScrollEvent: function(){
        $('.list-menu').eq(0).addClass('active');
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
                    $('.list-menu').eq(index).addClass('active');
                }
            });
        });
    },
    /**
     * Global.utils.main_circle_effect - circleEffect
    */
    main_circle_effect: function(){
        setTimeout(function() {
            $('.circle-eff .obj-circle-04').addClass('after-start');
        }, 6000);
    },
    
    /**
     * Global.utils.contactTextAnimation
    */
    contactTextAnimation: function(){
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
    },
    /**
     * Global.utils.scrollIcon
    */
    scrollIcon: function(){
        setTimeout(function() {
            $('.scroll-icon').addClass('show');
        }, 4000);
    },
    /**
     * Global.utils.animationEffect
    */
    // animationEffect: function(){
    //     let effectLine = $('.effect-line');
    //     let fixTitle = $('.intro-fix-title');
    //     let card02 = $('.card-item02');
    //     let card03 = $('.card-item03');
    //     let card04 = $('.card-item04');
    //     let comparisonImage01 = $('.afterImage');
    //     let comparisonImage02 = $('.afterImage img');
    //     let view01 = $('.seperate01');
    //     let view02 = $('.seperate02');
    //     let view03 = $('.seperate03');

    //     // intro line & title 효과
    //     let tl1 = gsap.timeline();
    //     ScrollTrigger.create({
    //         animation: tl1,
    //         trigger: '.intro-fix-wrap',
    //         scroller: '.wrap-contents-container',
    //         start: 'top top',
    //         end: 'bottom top',
    //         scrub: true,
    //         pin: true,
    //         pinSpacing: false
    //     });

    //     tl1.to(fixTitle, {
    //         scale: 1.5,
    //         ease: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    //         duration: 1,
    //         opacity: 0
    //     });
    //     tl1.from(effectLine, {
    //         scaleX: 0,
    //         transformOrigin: 'center center',
    //         ease: 'none',
    //         duration: 1.5,
    //         delay: -1
    //     });

    //     // title pinning 효과
    //     gsap.utils.toArray('.panel').forEach((panel, i) => {
    //         ScrollTrigger.create({
    //             trigger: panel,
    //             scroller: '.wrap-contents-container',
    //             start: 'top top',
    //             pin: true,
    //             pinSpacing: false,
    //             anticipatePin: 1
    //         });
    //     });

    //     // 3등분 효과
    //     let tl3 = gsap.timeline();
    //     ScrollTrigger.create({
    //         animation: tl3,
    //         trigger: '.section-seperate-effect',
    //         scroller: '.wrap-contents-container',
    //         start: 'top top',
    //         end: () => '+=' + innerHeight * 3,
    //         scrub: true,
    //         pin: true
    //     });

    //     tl3
    //         .fromTo(view01, { minWidth: '100%', transformOrigin: '0 100% 0', duration: 0.8 }, { minWidth: 'calc(33.33% - 8px)', transformOrigin: '0 0 0' })
    //         .fromTo(view02, { minWidth: '100%', transformOrigin: '0 100% 0', duration: 0.8 }, { minWidth: 'calc(33.33% - 8px)', transformOrigin: '0 0 0' })
    //         .fromTo(view03, { minWidth: '50%', transformOrigin: '0 100% 0', duration: 0.8 }, { minWidth: 'calc(33.33% - 8px)', transformOrigin: '0 0 0' });

    //     // 스크롤 시 이미지 컬러로 채워지는 효과
    //     let tl4 = gsap.timeline();
    //     ScrollTrigger.create({
    //         animation: tl4,
    //         trigger: '.comparisonSection',
    //         scroller: '.wrap-contents-container',
    //         start: 'top top',
    //         end: () => '+=' + innerHeight * 2.5,
    //         scrub: true,
    //         pin: true
    //     });
    //     // animate the container one way...
    //     tl4.fromTo(comparisonImage01, { xPercent: 100, x: 0 }, { xPercent: 0 });
    //     // ...and the image the opposite way (at the same time)
    //     tl4.fromTo(comparisonImage02, { xPercent: -100, x: 0 }, { xPercent: 0 }, 0);

    //     // 카드 순서대로 커지는 효과
    //     let tl2 = gsap.timeline();
    //     ScrollTrigger.create({
    //         animation: tl2,
    //         trigger: '.section-card-effect',
    //         scroller: '.wrap-contents-container',
    //         start: 'top top',
    //         end: '+=2000',
    //         scrub: true,
    //         pin: true
    //     });
    //     var duration = 0.7;
    //     var fromOption = {
    //         scale: 0,
    //         opacity: 0,
    //         transformOrigin: '0 0 0',
    //         ease: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
    //     };

    //     function toOption(index) {
    //         var option = {
    //             scale: 1,
    //             opacity: 1,
    //             ease: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    //             duration: duration * index,
    //             transformOrigin: '0 100% 0'
    //         };

    //         return option;
    //     }
    //     tl2
    //         .fromTo(card02, fromOption, toOption(1.5))
    //         .fromTo(card03, fromOption, toOption(1))
    //         .fromTo(card04, fromOption, toOption(1.5));
    // },
    /**
     * Global.utils.verticalCarouselDragWheel
    */
    verticalCarouselDragWheel:function() {
        let dataList = [
            {
                link: ''
            }
        ]



        /*-------------------- 
        Vars 
        --------------------*/
        let progress = 50
        let startX = 0
        let active = 0
        let isDown = false

        /*-------------------- 
        Constants 
        --------------------*/
        const speedWheel = 0.02
        const speedDrag = -0.1

        /*-------------------- 
        Get Z 
        --------------------*/
        function getZindex(array, index) {
            let arr = array.map(function(_, i) {
                if(index === i) {
                    array.length;
                } else {
                    array.length - Math.abs(index - i);
                }
            })
            return arr;
        }

        /*-------------------- 
        Items 
        --------------------*/
        const $items = $('.carousel-item');
        const $cursors = $('.cursor');
        

        function displayItems(item, index, active) {
            const zIndex = getZindex([...$items], active)[index]
            $(item).css('--zIndex', zIndex)
            // $(item).css('--active', (index - active) / $items.length)
            console.log(index, active)
            $(item).css('--active', ((index - active) / $items.length) * 1.1)
        }

        /*-------------------- 
        Animate 
        --------------------*/
        function animate() {
            progress = Math.max(0, Math.min(progress, 100))
            active = Math.floor(progress / 100 * ($items.length - 1))
            $items.each((index, item) => displayItems(item, index, active))
        }
        animate()

        /*-------------------- 
        Click on Items 
        --------------------*/

        $(document).on('click', '.carousel .carousel-item', function(){
            var _this = $(this);
            var idx = _this.index();
            var _centerPosition = _this.css('--active');
            
            $items.each((i, item) => {
                if(idx === i) {
                    if(idx === 0) {
                        progress = 9
                    } else {
                        progress = (i / $items.length) * 100 + 10;
                    }
                    animate();
            
                    // 팝업 활성화
                    if(_centerPosition === '0') {
                        $('.layout_popup').addClass('active');
                        _this.clone().prependTo('.layout_popup .content');
                        
                        setTimeout(() => {
                            $('.layout_popup .carousel-item').addClass('active');
                            $('.layout_popup .cont_text').addClass('active');

                        }, 400) 

                        $('.carousel').addClass('active');
                        // $(document).off('wheel', handleWheel)
                        $(document).off('mousedown', handleMouseDown)
                        $(document).off('mousemove', handleMouseMove)
                        $(document).off('mouseup', handleMouseUp)
                        $(document).off('touchstart', handleMouseDown)
                        $(document).off('touchmove', handleMouseMove)
                        $(document).off('touchend', handleMouseUp)
                    }
                }
            })
        })

        // popup close
        $('.close_btn').on('click', function() {
            $('.layout_popup').removeClass('active').find('.carousel-item').remove();
            $('.carousel').removeClass('active');
            $('.layout_popup .cont_text').removeClass('active');
            // $(document).on('wheel', handleWheel)
            $(document).on('mousedown', handleMouseDown)
            $(document).on('mousemove', handleMouseMove)
            $(document).on('mouseup', handleMouseUp)
            $(document).on('touchstart', handleMouseDown)
            $(document).on('touchmove', handleMouseMove)
            $(document).on('touchend', handleMouseUp)
        })

        /*-------------------- 
        Handlers 
        --------------------*/
        function handleWheel(e) {
            const wheelProgress = e.originalEvent.deltaY * speedWheel
            progress = progress + wheelProgress
            animate()
            // e.preventDefault();
        }

        function handleMouseMove(e) {
            if (e.type === 'mousemove') {
                $cursors.each((_, $cursor) => {
                    $($cursor).css('transform', `translate(${e.clientX}px, ${e.clientY}px)`)
                })
            }
            if (!isDown) return
            const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
            const mouseProgress = (x - startX) * speedDrag
            progress = progress + mouseProgress
            startX = x
            animate()
        }

        function handleMouseDown(e) {
            isDown = true
            startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
        }

        function handleMouseUp() {
            isDown = false
        }

        /*-------------------- 
        Listeners 
        --------------------*/
        // $(document).on('wheel', handleWheel)
        $(document).on('mousedown', handleMouseDown)
        $(document).on('mousemove', handleMouseMove)
        $(document).on('mouseup', handleMouseUp)
        $(document).on('touchstart', handleMouseDown)
        $(document).on('touchmove', handleMouseMove)
        $(document).on('touchend', handleMouseUp)
    },


    init: function (){
        // Global.utils.scrollSmoother();
        Global.utils.gsapAnimation();
        Global.utils.contentsAnimation();
        Global.utils.sectionTitleAnimation();
        Global.utils.slider();
        Global.utils.fullScreenPopup();
        Global.utils.closePopup();
        Global.utils.gnbScrollEvent();
        Global.utils.main_circle_effect();
        Global.utils.mainTitleAnimation();
        // Global.utils.contactTextAnimation();
        Global.utils.scrollIcon();
        // Global.utils.verticalCarouselDragWheel();
        // Global.utils.animationEffect();
        gsap.registerPlugin(ScrollTrigger);

        $(window).on('load', function() {
            ScrollTrigger.refresh();
        })
    }
}
Global.utils.init();

