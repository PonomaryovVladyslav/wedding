;(function () {

    'use strict';

    // iPad and iPod detection
    var isiPad = function () {
        return (navigator.platform.indexOf("iPad") != -1);
    };

    var isiPhone = function () {
        return (
            (navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1)
        );
    };


    // Carousel Feature Slide
    var testimonialCarousel = function () {

        var owl = $('.owl-carousel-fullwidth');
        owl.owlCarousel({
            animateOut: 'fadeOut',
            items: 1,
            loop: true,
            margin: 0,
            nav: false,
            dots: true,
            smartSpeed: 800,
            autoHeight: false
        });
    };

    var sliderMain = function () {

        $('#qbootstrap-slider-hero .flexslider').flexslider({
            animation: "fade",
            slideshowSpeed: 5000,
            directionNav: true,
            start: function () {
                setTimeout(function () {
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            },
            before: function () {
                setTimeout(function () {
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            }

        });

    };


    // animate-box
    var contentWayPoint = function () {

        $('.animate-box').waypoint(function (direction) {

            if (direction === 'down' && !$(this).hasClass('animated')) {

                $(this.element).addClass('fadeInUp animated');

            }

        }, {offset: '75%'});

    };


    // Burger Menu
    var burgerMenu = function () {

        $('body').on('click', '.js-qbootstrap-nav-toggle', function (event) {

            if ($('#navbar').is(':visible')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }

            event.preventDefault();

        });

    };


    // Parallax
    var parallax = function () {
        if (!isiPad() || !isiPhone()) {
            $(window).stellar();
        }
    };


    // Page Nav
    var clickMenu = function () {

        $('a:not([class="external"])').click(function (event) {
            var section = $(this).data('nav-section'),
                navbar = $('#navbar');
            $('html, body').animate({
                scrollTop: $('[data-section="' + section + '"]').offset().top
            }, 500);

            if (navbar.is(':visible')) {
                navbar.removeClass('in');
                navbar.attr('aria-expanded', 'false');
                $('.js-qbootstrap-nav-toggle').removeClass('active');
            }

            event.preventDefault();
            return false;
        });

    };

    // Reflect scrolling in navigation
    var navActive = function (section) {

        var $el = $('#navbar > ul');
        $el.find('li').removeClass('active');
        $el.each(function () {
            $(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
        });

    };
    var navigationSection = function () {

        var $section = $('div[data-section]');

        $section.waypoint(function (direction) {
            if (direction === 'down') {
                navActive($(this.element).data('section'));

            }
        }, {
            offset: '150px'
        });

        $section.waypoint(function (direction) {
            if (direction === 'up') {
                navActive($(this.element).data('section'));
            }
        }, {
            offset: function () {
                return -$(this.element).height() + 155;
            }
        });

    };


    // Window Scroll
    var windowScroll = function () {
        var lastScrollTop = 0;

        $(window).scroll(function (event) {

            var header = $('#qbootstrap-header'),
                scrlTop = $(this).scrollTop();

            if (scrlTop > 500 && scrlTop <= 2000) {
                header.addClass('navbar-fixed-top qbootstrap-animated slideInDown');
            } else if (scrlTop <= 500) {
                if (header.hasClass('navbar-fixed-top')) {
                    header.addClass('navbar-fixed-top qbootstrap-animated slideOutUp');
                    setTimeout(function () {
                        header.removeClass('navbar-fixed-top qbootstrap-animated slideInDown slideOutUp');
                    }, 100);
                }
            }

        });
    };


    // Animations
    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(function (direction) {

            if (direction === 'down' && !$(this.element).hasClass('animated')) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function () {

                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            } else {
                                el.addClass('fadeInUp animated');
                            }

                            el.removeClass('item-animate');
                        }, k * 50, 'easeInOutExpo');
                    });

                }, 50);

            }

        }, {offset: '85%'});
    };


    var inlineSVG = function () {
        $('img.svg').each(function () {
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
    };


    // Set the date we're counting down to
    var countDownDate = new Date("Sep 11, 2021 15:30:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in an element with id="demo"
        // document.getElementById("demo").innerHTML = days + "Days " + hours + "Hours "
        // + minutes + "Minutes " + seconds + "Seconds ";

        // Display the result in an element with id="demo"
        document.getElementById("days").innerHTML = days + " <small>дней</small>";
        document.getElementById("hours").innerHTML = hours + " <small>часов</small> ";
        document.getElementById("minutes").innerHTML = minutes + " <small>минут</small> ";
        document.getElementById("seconds").innerHTML = seconds + " <small>секунд</small> ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("days").style.display = "none";
            document.getElementById("hours").style.display = "none";
            document.getElementById("minutes").style.display = "none";
            document.getElementById("seconds").style.display = "none";
            document.getElementById("demo").innerHTML = "Церемония состоялась";
            document.getElementById("demo").style = {display: block};
        }
    }, 1000);


    var bgVideo = function () {
        $('.player').mb_YTPlayer();
    };
    let owl_settings = {
        items: 1,
        loop: true,
        autoplay: true,
        lazyLoad: true,
        responsive: {
            480: {items: 1}, // from zero to 480 screen width 1 items
            768: {items: 3}, // from 480 screen widthto 768 3 items
            1024: {items: 5}   // from 768 screen width to 1024 5 items
        },
    };
    let owl = $(".owl-carousel")
    owl.owlCarousel(owl_settings);

    let mybutton = document.getElementById("scrollTop");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    $("#scrollTop").click(function (event) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
    let cp = $("#click-previous");
    cp.click(function (event) {
        owl.trigger('prev.owl.carousel');
    })
    let cf = $("#click-forward");
    cf.click(function (event) {
        owl.trigger('next.owl.carousel')
    })
    let g = $("#gallery");
    var f_top = 305 / 2 + cf.height() / 4;
    var f_left = g.width() - cf.width() - 25;
    var p_top = 305 / 2 + cf.height() / 4 + cf.height() + 5;
    var p_left = 20;
    cf.css('top', f_top);
    cf.css('left', f_left);
    cp.css('top', p_top);
    cp.css('left', p_left);
    $("#to-set-height").css('height', $("#to-count-height").height() / 2)
    var qf = $("#questions-form");
    qf.submit(function (e) {
        e.preventDefault();
        var data = qf.serializeArray();
        var data_to_send = {
            "name": data.filter(ai => ai.name === 'name')[0].value,
            "count": data.filter(ai => ai.name === 'count')[0].value,
            "need_room_in_kh": data.filter(ai => ai.name === 'room_in_kh')[0].value === 'yes',
            "need_room_in_penates": data.filter(ai => ai.name === 'room_in_penates')[0].value === 'yes',
            "transfer_to": data.filter(ai => ai.name === 'transfer_to')[0].value === 'yes',
            "transfer_from_first_day": data.filter(ai => ai.name === 'transfer_from')[0].value === 'yes_1st',
            "transfer_from_second_day": data.filter(ai => ai.name === 'transfer_from')[0].value === 'yes_2nd',
        };
        $.post("/api/quiz/", data_to_send).done(function (data) {
            qf.hide();
            $("#thanks").show();
            document.getElementById("qbootstrap-questions").scrollIntoView();
        });

    });

    var q1solve = function (){
        var data = qf.serializeArray();
        var a = data.filter(ai => ai.name === 'room_in_kh')[0].value;
        var q1a1 = $('#q1-a1');
        var q1a2 = $('#q1-a2');
        if (a === 'no') {
            if(!q1a1.hasClass('choiced-radio')){
                q1a1.addClass('choiced-radio');
            }
            if(q1a2.hasClass('choiced-radio')){
                q1a2.removeClass('choiced-radio');
            }

        } else {
            if(q1a1.hasClass('choiced-radio')){
                q1a1.removeClass('choiced-radio');
            }
            if(!q1a2.hasClass('choiced-radio')){
                q1a2.addClass('choiced-radio');
            }
        }
    }
    var q2solve = function (){
        var data = qf.serializeArray();
        var a = data.filter(ai => ai.name === 'room_in_penates')[0].value;
        var q2a1 = $('#q2-a1');
        var q2a2 = $('#q2-a2');
        if (a === 'no') {
            if(!q2a1.hasClass('choiced-radio')){
                q2a1.addClass('choiced-radio');
            }
            if(q2a2.hasClass('choiced-radio')){
                q2a2.removeClass('choiced-radio');
            }

        } else {
            if(q2a1.hasClass('choiced-radio')){
                q2a1.removeClass('choiced-radio');
            }
            if(!q2a2.hasClass('choiced-radio')){
                q2a2.addClass('choiced-radio');
            }
        }
    }
    var q3solve = function (){
        var data = qf.serializeArray();
        var a = data.filter(ai => ai.name === 'transfer_to')[0].value;
        var q3a1 = $('#q3-a1');
        var q3a2 = $('#q3-a2');
        if (a === 'no') {
            if(!q3a1.hasClass('choiced-radio')){
                q3a1.addClass('choiced-radio');
            }
            if(q3a2.hasClass('choiced-radio')){
                q3a2.removeClass('choiced-radio');
            }

        } else {
            if(q3a1.hasClass('choiced-radio')){
                q3a1.removeClass('choiced-radio');
            }
            if(!q3a2.hasClass('choiced-radio')){
                q3a2.addClass('choiced-radio');
            }
        }
    }
    var q4solve = function (){
        var data = qf.serializeArray();
        var a = data.filter(ai => ai.name === 'transfer_from')[0].value;
        var q4a1 = $('#q4-a1');
        var q4a2 = $('#q4-a2');
        var q4a3 = $('#q4-a3');
        if (a === 'no') {
            if(!q4a1.hasClass('choiced-radio')){
                q4a1.addClass('choiced-radio');
            }
            if(q4a2.hasClass('choiced-radio')){
                q4a2.removeClass('choiced-radio');
            }
            if(q4a3.hasClass('choiced-radio')){
                q4a3.removeClass('choiced-radio');
            }

        }
        if (a === 'yes_1st') {
            if(q4a1.hasClass('choiced-radio')){
                q4a1.removeClass('choiced-radio');
            }
            if(!q4a2.hasClass('choiced-radio')){
                q4a2.addClass('choiced-radio');
            }
            if(q4a3.hasClass('choiced-radio')){
                q4a3.removeClass('choiced-radio');
            }

        }
        if (a === 'yes_2nd') {
            if(q4a1.hasClass('choiced-radio')){
                q4a1.removeClass('choiced-radio');
            }
            if(q4a2.hasClass('choiced-radio')){
                q4a2.removeClass('choiced-radio');
            }
            if(!q4a3.hasClass('choiced-radio')){
                q4a3.addClass('choiced-radio');
            }

        }
    }
    q1solve();
    q2solve();
    q3solve();
    q4solve();
    $('input[name="room_in_kh"]').change(function () {
        q1solve();
    });
    $('input[name="room_in_penates"]').change(function () {
        q2solve();
    });
    $('input[name="transfer_to"]').change(function () {
        q3solve();
    });
    $('input[name="transfer_from"]').change(function () {
        q4solve();
    });
    // Document on load.
    $(function () {

        burgerMenu();
        testimonialCarousel();
        sliderMain();
        clickMenu();
        parallax();
        // windowScroll();
        navigationSection();
        contentWayPoint();
        inlineSVG();
        bgVideo();
    });


}());