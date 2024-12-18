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
    flag = false;


Global.utils = {
    /**
     * Global.utils.verticalCarouselDragWheel
    */
    verticalCarouselDragWheel:function() {
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
            $(item).css('--active', (index - active) / $items.length)
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
                    progress = (i / $items.length) * 100 + 10;
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
                        $(document).off('wheel', handleWheel)
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
            $(document).on('wheel', handleWheel)
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
        $(document).on('wheel', handleWheel)
        $(document).on('mousedown', handleMouseDown)
        $(document).on('mousemove', handleMouseMove)
        $(document).on('mouseup', handleMouseUp)
        $(document).on('touchstart', handleMouseDown)
        $(document).on('touchmove', handleMouseMove)
        $(document).on('touchend', handleMouseUp)
    },


    init: function (){
        Global.utils.verticalCarouselDragWheel();
        // Global.utils.animationEffect();
        gsap.registerPlugin(ScrollTrigger);

        $(window).on('load', function() {
            ScrollTrigger.refresh();
        })
    }
}
Global.utils.init();

