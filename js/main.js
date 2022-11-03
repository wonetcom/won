$(document).ready(function() {
	// Header Scroll
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

		if (scroll >= 50) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});

	// Fancybox
	$('.work-box').fancybox();

	// Flexslider
	$('.flexslider').flexslider({
		animation: "fade",
		directionNav: false,
	});

	// Page Scroll
	var sections = $('section')
		nav = $('nav[role="navigation"]');

	$(window).on('scroll', function () {
	  	var cur_pos = $(this).scrollTop();
	  	sections.each(function() {
	    	var top = $(this).offset().top - 76
	        	bottom = top + $(this).outerHeight();
	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
	    	}
	  	});
	});
	
	$(document).on('click', 'nav[role="navigation"] a', function () {
	  	var $el = $(this)
	    	id = $el.attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 500);
	  return false;
	});

	// Mobile Navigation
	$(document).on('click', '.nav-toggle', function() {
		$(this).toggleClass('close-nav');
		$('nav[role="navigation"]').toggleClass('open');
		return false;
	});	
	$(document).on('click', 'nav[role="navigation"] a', function() {
		$('.nav-toggle').toggleClass('close-nav');
		$('nav[role="navigation"]').toggleClass('open');
	});
	
	var lang = localStorage.getItem('lang');

    if(lang===null) {
      lang = 'ko';
      localStorage.setItem('lang', lang);
    }
    loadContents(lang);
});

function changeLang(lang) {
	localStorage.setItem('lang', lang);
	loadContents(lang);
	window.scrollTo(0, 0);
 }

 function loadContents(lang) {
   var source   = $('#openidea-template').html();
   var template = Handlebars.compile(source);
   $.getJSON("/open/i18n/"+lang+".json", function(json) {
	   var vHtml = template(json);
	   $('#contents').html(vHtml);
   });
 }
