/* add browser info to HTML tag */
var doc = document.documentElement; doc.setAttribute('data-useragent', navigator.userAgent);

;(function ($) {
"use strict";

/* Install Responsive jPanel */
var jPM = $.jPanelMenu({
    menu: '#site-navigation',
    trigger: '.mobile-menu a',
    animated: false
});

/* Setup breakpoints for responsive JS activations */
var jRes = jRespond([
    {
        label: 'small',
        enter: 0,
        exit: 768
    },{
        label: 'medium',
        enter: 768,
        exit: 980
    },{
        label: 'large',
        enter: 980,
        exit: 10000
    }
]);

/******* MOBILE BREAKPOINT SCRIPTS ********/
jRes.addFunc({
    breakpoint: 'small',
    enter: function() {
        /* start jPanelMenu */
        jPM.on();
        
        /* move account nav into jPanel menu */
        $('li.account-dropdown').clone().removeClass('hide-for-small').appendTo($('#jPanelMenu-menu'));
        $('.html-block-inner').clone().removeClass('hide-for-small').appendTo($('#jPanelMenu-menu')).wrap('<li></li>');
        
        /* move top nav into jPanel menu */
        $('ul.top-bar-nav').clone().removeClass('hide-for-small').appendTo($('#jPanelMenu-menu')).wrap( "<li class='top-bar-items'></li>" );

        /* move search into mobile navigation */
        $('.header-wrapper .search-wrapper').clone().removeClass('hide-for-small').prependTo($('#jPanelMenu-menu')).wrap('<li></li>');

        /* make mobile links with sub menu dropdown on click */
        $('.menu-parent-item > .nav-top-link, .account-dropdown > .nav-top-login').click(function(e){
          $(this).parent().toggleClass('open');
          e.preventDefault();
        });



    },
    exit: function() {
        jPM.off();
    }
});


/******* DESKTOP BREAKPOINT SCRIPTS ********/
jRes.addFunc({
    breakpoint: ['large','medium'],
    enter: function() {

        /* DROPDOWN SCRIPT */
        $('.nav-top-link').parent().hoverIntent(
            function () {
                 var max_width = '1080';
                 if(max_width > $(window).width()) {max_width = $(window).width()}
                 $(this).find('.nav-dropdown').css('max-width',max_width);
                 $(this).find('.nav-dropdown').fadeIn(20);
                 $(this).addClass('active');
                 /* fix dropdown if it has too many columns */
                 var dropdown_width = $(this).find('.nav-dropdown').outerWidth();
                 var col_width =  $(this).find('.nav-dropdown > ul > li.menu-parent-item').width();
                 var cols = ($(this).find('.nav-dropdown > ul > li.menu-parent-item').length) + ($(this).find('.nav-dropdown').find('.image-column').length);
                 var col_must_width = cols*col_width;
                 if($('.wide-nav').hasClass('nav-center')){
                  $(this).find('.nav-dropdown').css('margin-left','-70px');
                }

                 if(col_must_width > dropdown_width){
                    $(this).find('.nav-dropdown').width(col_must_width);
                    $(this).find('.nav-dropdown').addClass('no-arrow');
                    $(this).find('.nav-dropdown').css('left','auto');
                    $(this).find('.nav-dropdown').css('right',0);
                    $(this).find('ul:after').remove();
                 }
            },
            function () {
                  $(this).find('.nav-dropdown').fadeOut(20);
                  $(this).removeClass('active');
            }
        );

         /* WPML dropdown */
         $('.menu-item-language-current').hoverIntent(
            function () {
                 $(this).find('.sub-menu').fadeIn(50);

            },
            function () {
                 $(this).find('.sub-menu').fadeOut(50);
            }
        );
        

        /* SEARCH DROPDOWN */
         $('.search-dropdown').hoverIntent(
            function () {
                 if($('.wide-nav').hasClass('nav-center')){
                    $(this).find('.nav-dropdown').css('margin-left','-85px');
                  }
                 $(this).find('.nav-dropdown').fadeIn(50);
                 $(this).addClass('active');
                 $(this).find('input').focus();

            },
            function () {
                 $(this).find('.nav-dropdown').fadeOut(50);
                 $(this).removeClass('active');
                 $(this).find('input').blur();
            }
        );


         /* PRODUCT NEXT / PREV NAV */
         $('.prod-dropdown').hoverIntent(
            function () {
                 $(this).find('.nav-dropdown').fadeIn(50);
                 $(this).addClass('active');

            },
            function () {
                 $(this).find('.nav-dropdown').fadeOut(50);
                 $(this).removeClass('active');
            }
        );

         /* CART DROPDOWN */
         $('.cart-link').parent().parent().hoverIntent(
            function () {
                 $(this).find('.nav-dropdown').fadeIn(50);
                 $(this).addClass('active');

            },
            function () {
                 $(this).find('.nav-dropdown').fadeOut(50);
                 $(this).removeClass('active');
            }
          );
    },
    exit: function() {
    }
});


/******** GLOBAL LIGHTBOX SCRIPTS ***********/
  /* add popup for product slider */
  $('.gallery-popup').magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: '<div class="loading dark"><i></i><i></i><i></i><i></i></div>',
      mainClass: 'my-mfp-zoom-in product-zoom-lightbox',
      removalDelay: 300,
      closeOnContentClick: true,
      gallery: {
          enabled: true,
           navigateByImgClick: false,
          preload: [0,1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
          verticalFit: false,
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      }
  });

  /* add lightbox for images */
  $("*[id^='attachment'] a, .entry-content a[href$='.jpg'], .entry-content a[href$='.jpeg']").magnificPopup({
    type: 'image',
    tLoading: '<div class="loading dark"><i></i><i></i><i></i><i></i></div>',
    closeOnContentClick: true,
    mainClass: 'my-mfp-zoom-in',
    image: {
      verticalFit: false
    }
  }); // image lightbox



  /* add lightbox for blog galleries */
  $(".gallery a[href$='.jpg'],.gallery a[href$='.jpeg'],.featured-item a[href$='.jpeg'],.featured-item a[href$='.gif'],.featured-item a[href$='.jpg'], .page-featured-item .slider > a, .page-featured-item .page-inner a > img, .gallery a[href$='.png'], .gallery a[href$='.jpeg'], .gallery a[href$='.gif']").parent().magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: '<div class="loading dark"><i></i><i></i><i></i><i></i></div>',
    mainClass: 'my-mfp-zoom-in',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    }
  }); // gallery lightbox


/* ****** PRODUCT QUICK VIEW  ******/
$('.quick-view,.open-quickview').click(function(e){
   /* add loader  */
   $(this).after('<div class="loading dark"><i></i><i></i><i></i><i></i></div>');
   var product_id = $(this).attr('data-prod');
   var data = { action: 'jck_quickview', product: product_id};
    $.post(ajaxurl, data, function(response) {
     $.magnificPopup.open({
        mainClass: 'my-mfp-zoom-in',
        items: {
          src: '<div class="product-lightbox">'+response+'</div>',
          type: 'inline'
        }
      });
     $('.loading').remove();
     setTimeout(function() {

         function slideLoad(args) {
            /* set height of first slide */
            var slide_height = $(args.currentSlideObject).outerHeight();
            $(args.sliderContainerObject).height(slide_height);
         }

         $('.product-lightbox .iosSlider.product-gallery-slider').iosSlider({
              snapToChildren: true,
              scrollbar: true,
              scrollbarHide: false,
              desktopClickDrag: true,
              snapFrictionCoefficient: 0.7,
              infiniteSlider: true,
              autoSlideTransTimer: 500,
              onSliderLoaded: slideLoad,
              navPrevSelector: $('.product-lightbox .prev_product_slider'),
              navNextSelector: $('.product-lightbox .next_product_slider'),

          });
         
          $('.product-lightbox form').wc_variation_form();
          $('.product-lightbox form select').change();

          $('[name*="color"]').change(function(){
            $('.product-lightbox .iosSlider.product-gallery-slider').iosSlider('goToSlide', '1');
          });
    

    }, 600);
    });
    e.preventDefault();
}); // product lightbox



/********* WAYPOINTS (sticky header, banner animations etc.) **********/
/* add animations to banners in view */
$('.ux_banner .inner.animated').waypoint(function() {
  if(!$(this).parent().parent().parent().hasClass('slider')){
     var animation = $(this).attr("data-animate");
     $(this).addClass(animation);
     $(this).addClass('start-anim');
  }
}, { offset: '80%' });

/* show Back to top links */
$('#main-content').waypoint(function() {
  $('#top-link').toggleClass('active');
},{offset:'-100%'});

/* animate Col, Blocks and Rows */
setTimeout(function() {
  $('.scroll-animate').waypoint(function() {
     if(!$(this).parent().parent().parent().parent().hasClass('slider')){
      $(this).addClass('animated');
      $(this).addClass($(this).data('animate')); 
      }
  },{offset: '80%'});
}, 100);

/* Add sticky header */
var header_offset = -$('#masthead').outerHeight();
$('.sticky_header #masthead').waypoint('sticky', {
  offset: header_offset
});

$('.sticky_header .wide-nav').waypoint('sticky', {
  offset: header_offset
});

/* make sticky header move down while scrolling */
$('#main-content').waypoint(function() {
   $('.sticky_header #masthead, .wide-nav').toggleClass('move_down');
   $('.sticky_header #masthead').toggleClass('site-header');
},{offset: header_offset});


/********* SCROLL TO LINKS **********/

/* top link */
$('#top-link').click(function(e) {
    $.scrollTo(0,300);
    e.preventDefault();
}); // top link

/* scroll-to shortcode */
$('.scroll-to').each(function(){
    var link = $(this).data('link');
    var end = $(this).offset().top;
    var title = $(this).data('title');

    if($(this).data('bullet','true')){
      $('.scroll-to-bullets').append('<a href="'+link+'"><strong>'+title+'</strong><span></span></a><br/>');
    }

    $('a[href="'+link+'"]').click(function(){
        $.scrollTo(end,500);
    });

    $(this).waypoint(function() {
      $('.scroll-to-bullets a').removeClass('active');
      $('.scroll-to-bullets').find('a[href="'+link+'"]').toggleClass('active');
    },{offset:'0'});
});

/* reviews link */
$('.scroll-to-reviews').click(function(e){

    $('.product-details .tabs-nav li').removeClass('current-menu-item');
    $('.product-details .tabs-nav').find('a[href=#panelreviews]').parent().addClass('current-menu-item');
    $('.tabs li, .tabs-inner,.panel.entry-content').removeClass('active');
    $('.tabs li.reviews_tab, #panelreviews, #tab-reviews').addClass('active');
    $('.panel.entry-content').css('display','none');
    $('#tab-reviews').css('display','block');
    $.scrollTo('#panelreviews',300,{offset:-90});
    $.scrollTo('.reviews_tab',300,{offset:-90});
    $.scrollTo('#section-reviews',300,{offset:-90});
    e.preventDefault();
});


/****** WIDGET EFFECTS *******/

$('.widget_nav_menu .menu-parent-item').hoverIntent(
    function () {
        $(this).find('ul').slideDown();
    },
    function () {
       $(this).find('ul').slideUp();
    }
);


/****** ACCORDIAN / TABS *******/

/* accordian toggle */
$('.accordion').each(function(){
  var acc = $(this).attr("rel") * 2;
  $(this).find('.accordion-inner:nth-child(' + acc + ')').show();
  $(this).find('.accordion-inner:nth-child(' + acc + ')').prev().addClass("active");
});
  
$('.accordion .accordion-title').click(function() {
  if($(this).next().is(':hidden')) {
    $(this).parent().find('.accordion-title').removeClass('active').next().slideUp(200);
    $(this).toggleClass('active').next().slideDown(200);
  } else {
    $(this).parent().find('.accordion-title').removeClass('active').next().slideUp(200);
  }
  return false;
});

/* tabs toggle */
$('.shortcode_tabgroup ul.tabs li a').click(function(e){
  e.preventDefault();
  $(this).parent().parent().parent().find('ul li').removeClass('active');
  $(this).parent().addClass('active');
  var currentTab = $(this).attr('href');
  $(this).parent().parent().parent().find('div.panel').removeClass('active');
  $(currentTab).addClass('active');
  // Find iosSliders and update them and go to slide 1.
  var iOS = ( navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry)/g) ? true : false );
  if($(currentTab).find('.iosSlider') && iOS) {
    $(currentTab).find('.iosSlider').each(function(i){
      var id = $(this).attr('id');
      $('#'+id).iosSlider('update').iosSlider('goToSlide', 1);
    });
  }
  $(window).resize();
  return false;
});


$('.product-details .tabbed-content .tabs a').click(function(){
  var panel = $(this).attr('href');
  $(panel).addClass('active');
  return false;
});


/* tabs vertical */
$('.shortcode_tabgroup_vertical ul.tabs-nav li a').click(function(e){
  e.preventDefault();
  $(this).parent().parent().parent().find('ul li').removeClass('current-menu-item');
  $(this).parent().addClass('current-menu-item');
  var currentTab = $(this).attr('href');
  $(this).parent().parent().parent().parent().find('div.tabs-inner').removeClass('active');
  $(currentTab).addClass('active');
  $(window).resize();
  return false;
});

/****** TOOLTIPS *********/
if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
  $('.yith-wcwl-wishlistexistsbrowse.show').each(function(){
      var tip_message = $(this).find('a').text();
      $(this).find('a').attr('data-tip',tip_message).addClass('tip-top');
  });

  $('.yith-wcwl-add-button.show').each(function(){
      var tip_message = $(this).find('a.add_to_wishlist').text();
      $(this).find('a.add_to_wishlist').attr('data-tip',tip_message).addClass('tip-top');
  });

  $('.tip,.tip-bottom').tipr();
  $('#main-content .tip-top, .footer .tip-top, .absolute-footer .tip-top, .featured-box .tip-top').tipr({mode:"top"});
  $('#top-bar .tip-top, #masthead .tip-top').tipr({mode:"bottom"});
}

/******* blog stuff ******/
$('textarea#comment').focus(function(){
    $('.form-allowed-tags').slideDown();
    $('.form-submit').slideDown();
});

$('textarea#comment').blur(function(){
  if(!$(this).val()){
    $('.form-allowed-tags').slideUp();
    $('.form-submit').slideUp();
  }
});

$('textarea#comment').blur(function(){
  if(!$(this).val()){
    $('.form-allowed-tags').slideUp();
    $('.form-submit').slideUp();
  }
});

/****** Layout fixes *********/
$('.ux_banner .center').vAlign();
$( window ).resize(function() {
  $('.ux_banner .center').vAlign();
});

$('.col_hover_focus').hover(function(){
  $(this).parent().find('.columns > *').css('opacity','0.5');
}, function() {
  $(this).parent().find('.columns > *').css('opacity','1');
});

$('.slider .add_to_cart_button').hover(
  function() {
    $('.sliderControlls').css('pointer-events','none');
  }, function() {
    $('.sliderControlls').css('pointer-events','all');
  }
);

$('.add-to-cart-grid.product_type_simple').click(function(){
  jQuery('.mini-cart').addClass('active cart-active');
  jQuery('.mini-cart').hover(function(){jQuery('.cart-active').removeClass('cart-active');});
  setTimeout(function(){jQuery('.cart-active').removeClass('active')}, 5000);
});

$('.row ~ br').remove();
$('.columns ~ br').remove();
$('.columns ~ p').remove();
$('#megaMenu').wrap('<li/>');
$('select.ninja-forms-field,select.addon-select').wrap('<div class="custom select-wrapper"/>');
$(window).resize();


}(jQuery));