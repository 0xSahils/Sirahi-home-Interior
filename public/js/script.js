/* ==================================================
Preloader:
====================================================*/

// monitors website fully loaded, hides preloader elements

$(window).on('load', function () {
    $('#status').fadeOut();
    $('#preloader').delay(100).fadeOut('slow');
});


/* ==================================================
Portfolio:
====================================================*/
$(window).on('load', function () {
    // initialize isotope plugin 
    $("#isotope-container").isotope({});

    // filter items on button click
    $('#isotope-filters').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        // filter portfolio items
        $("#isotope-container").isotope({
            filter: filterValue
        });

        // active button
        $("#isotope-filters").find('.active').removeClass('.active');
        $(this).addClass('active');

    });
});

/* ==================================================
Magnifier Popup Plugin:
====================================================*/
$(function () {

    $("#portfolio-wrapper").magnificPopup({
        delegate: 'a', // child items selector, popup will open when clicked
        type: 'image',
        // gallery option
        gallery: {
            enabled: true
        },
        callbacks: {
            elementParse: function(item) {
                if(item.el[0].classList.contains('popup-video')) {
                    item.type = 'iframe';
                } else {
                    item.type = 'image';
                }
            }
        }
    });
});

/* ==================================================
Team Members:
====================================================*/
$(function () {
    if ($("#team-slider").length) {
        $("#team-slider").owlCarousel({
            items: 1,
            /*how many items are displayed at a time*/
            autoplay: false,
            smartSpeed: 700,
            loop: true,
            autoplayHoverPause: true,
            nav: true,
            dots: false,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
        });
    }
});

/* ==================================================
Navigation Bar: (show/hide effects)
====================================================*/
$(function () {

    // page load,
    showHideNav();
    // on window scroll
    $(window).scroll(function () {
        showHideNav();
    })

    function showHideNav() {

        //function executed when scroll
        if ($(window).scrollTop() > 50) {
            //display white nav

            //selects white nav, add white nav class
            $("nav").addClass("white-nav-top");

        } else {

            $("nav").removeClass("white-nav-top");
        }
    }
});

/* ==================================================
Navigation Bar: smooth scrolling
====================================================*/

$(function () {
    $("a.smooth-scroll").click(function (event) {
        event.preventDefault();
        var section_id = $(this).attr("href");

        $("html, body").animate({
            scrollTop: $(section_id).offset().top - 64
        }, 1250);
    });
});



/* ==================================================
Mobile Menu:
====================================================*/

$(function () {
    //show mobile nav
    $("#mobile-nav-open-btn").click(function () {
        //opens mobile nav, sets height from 0->100
        $("#mobile-nav").css("height", "100%");
    });

    //hide mobile nav
    $("#mobile-nav-close-btn, #mobile-nav a").click(function () {
        //opens mobile nav, sets height from 0->100
        $("#mobile-nav").css("height", "0%");
    });
});

/* ==================================================
Animations:
====================================================*/

$(function() {
    // initializes wow.js plugin
    AOS.init({ once: false, mirror: true, duration: 800, offset: 100 });
})

// apply animation for homepage after page loaded

$(window).on('load', function() {
    $("#home-heading1").addClass("animated fadeInDown");
    $("#home-heading2").addClass("animated fadeInLeft");
    $("#home-paragraph").addClass("animated zoomIn");
    $("#home-button").addClass("animated zoomIn");
});
setTimeout(function(){ $('#preloader').fadeOut('slow'); }, 3000);

// ===================================================
// Sticky Portfolio Filters - JS Scroll-based (Reliable)
// ===================================================
$(window).on('scroll', function() {
    var navbarH = $('.navbar').outerHeight() || 60;
    var filters = $('#isotope-filters');
    var portfolio = $('#work-portfolio');

    if (!portfolio.length || !filters.length) return;

    var portfolioTop    = portfolio.offset().top;
    var portfolioBottom = portfolioTop + portfolio.outerHeight();
    var scrollTop       = $(window).scrollTop();
    var filtersH        = filters.outerHeight();

    // When scroll enters the portfolio section
    if (scrollTop + navbarH >= portfolioTop && scrollTop + navbarH + filtersH <= portfolioBottom) {
        // Pin it
        if (!filters.hasClass('filters-fixed')) {
            filters
                .addClass('filters-fixed')
                .css({ top: navbarH + 'px', width: filters.parent().width() + 'px' });
            // Add placeholder to avoid layout jump
            $('#filters-placeholder').height(filtersH);
        }
    } else {
        // Unpin it
        if (filters.hasClass('filters-fixed')) {
            filters.removeClass('filters-fixed').css({ top: '', width: '' });
            $('#filters-placeholder').height(0);
        }
    }
});

// Recalculate on resize
$(window).on('resize', function() {
    var filters = $('#isotope-filters');
    if (filters.hasClass('filters-fixed')) {
        filters.css({ width: filters.parent().width() + 'px' });
    }
});