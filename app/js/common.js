$(function() {
	
	window.addEventListener("load", function() { window. scrollTo(0, 0); });
	document.addEventListener("touchmove", function(e) { e.preventDefault() });
	
    var magnificPopup = $.magnificPopup.instance;
    $('#createHabitBtn').magnificPopup({
        type:'inline',
        closeOnBgClick: true,
        showCloseBtn: false,
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
		// Delay in milliseconds before popup is removed
		removalDelay: 300,

		// Class that is added to popup wrapper and background
		// make it unique to apply your CSS animations just to this exact popup
		mainClass: 'mfp-fade'
    });
	$('.create-form').on('submit', function(){
		magnificPopup.close();
	});
    
    $('#closepopup').on('click', function(){
        magnificPopup.close();
    });
    
	
	
	
	// PROFILE MENU
	$('.profile-button').on('click', function(e){
		$(e.currentTarget).offsetParent().find('.profile-menu').addClass('profile-menu--open');
		$(e.currentTarget).addClass('profile-button--pressed');
	});
	$('.profile-header__close').on('click', function(e){
		$(e.currentTarget).offsetParent().offsetParent().find('.profile-menu').removeClass('profile-menu--open');
		$('.profile-button').removeClass('profile-button--pressed');
	});
	
	$('.header__side-menu-button').on('click', function(e){
		var $this = $(e.currentTarget);
		
		$this.queueAddClass('header__side-menu-button--click').delay(500).queueRemoveClass('header__side-menu-button--click');
        
        $('.categories').toggleClass('categories--open');
        
	});
	
	
	//more menu
	$('.more-menu-button').on('click', function(e){
		var menu = $(e.currentTarget).siblings('.more-menu');
		if (menu.hasClass('more-menu--open')){
			menu.removeClass('more-menu--open');
		} else{
			menu.addClass('more-menu--open');
		}
			
	});
	
	
	
	
	
	
	$(window).scroll(function(){
		$('.profile-menu').removeClass('profile-menu--open');
		$('.profile-button').removeClass('profile-button--pressed');
		
		let header = $('.header');
		if(header.offset().top > 0){
			header.addClass('header--scrolled');
		} else{
			header.removeClass('header--scrolled');
		}
		
		$('.more-menu--open').removeClass('more-menu--open');
		
		closeMarkOptions();
	});
	
	
	$('.day:not(.day--disabled)').on('click', function(e){
		var $this = $(e.currentTarget);
        var week = $this.closest('.week');
		var card = $this.closest('.card');
		var chainCount = card.find('.card__chain-count');
		var options = week.find('.mark-options');
        var container = week.find('.week__mark-options-container');
		var pos = determinePos($this);
		
		
		$this.queueAddClass('day--click').delay(500).queueRemoveClass('day--click');
		
		
		if ( options.hasClass('mark-options--open') &&  options.hasClass('mark-options--origin-'+pos)){
            options.removeClass('mark-options--open');
			container.slideUp(200);
            
		} else{
			closeMarkOptions(container);
			
            container.slideDown(200);
			options.addClass('mark-options--open');
			options.removeClassRegex(/^mark-options--origin-/);
			options.addClass('mark-options--origin-'+pos);
            
            options.attr("data-identity", $this.attr("data-identity"));
            
		}
		
		
	});
    
    $('.mark-options__option').on('click', function(e){
        var $this = $(e.currentTarget);
        var options = $this.closest('.mark-options');
        var id = options.attr('data-identity');
        var day = $('.day[data-identity='+id+']');
        day.removeClass('day--success day--fail day--skip day--unmarked');
        
        if ($this.hasClass('option--fail')){
            day.addClass('day--fail');
        } else if ($this.hasClass('option--success')){
            day.addClass('day--success');
        } else{
            day.addClass('day--skip');
        }
    });
	
	resizeGoals();
	$(window).resize(function(){
		resizeGoals();
	});
	
	$('.more-menu').mouseleave(function(e){
		$(e.currentTarget).removeClass('more-menu--open');
	});
    
       
    
    $('.habit-tab').on('click', function(e){
        var $this = $(e.currentTarget);
        
        if (!$this.hasClass('habit-tab--active')){
            $this.siblings().removeClass('habit-tab--active');
            $this.addClass('habit-tab--active');
        }
    });
	
	
	
	
	$(".habit-carousel").owlCarousel({
		loop:false,
		items:1,
		autoHeight:true,
		nav: false,
		URLhashListener:true,
        startPosition: 1,
		smartSpeed:400
	});
    
     
	
	
	$('.owl-carousel').on('changed.owl.carousel', function(event) {
		var current = event.item.index;
		var hash = $(event.target).find(".owl-item").eq(current).find(".carousel-item").attr('data-hash');
		var link = $('.habit-tab[href="#'+hash+'"]');
		link.siblings().removeClass('habit-tab--active');
		link.addClass('habit-tab--active');
	});
	
	
	
	
	
	$("#addReason").on('click', function(e){
		$(".create-form__reasons").append('<div class="input">'+      
							'<input class="input__field" type="text" required pattern=".*" name="Reasons[]">'+
							'<span class="input__highlight"></span>'+
							'<span class="input__bar"></span>'+
							'<label class="input__label">Причина</label>'+
						'</div>');
	});
	
});

function closeMarkOptions(opened){
	$('.mark-options--open').removeClass('mark-options--open');
	$('.week__mark-options-container').not(opened).slideUp(200);
};

function resizeGoals(){
	var day = $('.week .day');
    var bar = $('.week .day:before');
	var size = day.width();
    bar.width('300px');
	
	var goals = $('.day--goal');
	goals.width(size);
	goals.height(size);
    
    
};



$.fn.removeClassRegex = function(regex) {
  return $(this).removeClass(function(index, classes) {
    return classes.split(/\s+/).filter(function(c) {
      return regex.test(c);
    }).join(' ');
  });
};

function determinePos(child){
	var elements = child.parent().children();
	for (var i =0; i< elements.length; i++){
		var curr = elements[i];
		if ( $(curr)[0] == $(child)[0] ) return i+1;
	}
}

$.fn.queueAddClass = function(className) {
    this.queue('fx', function(next) {
        $(this).addClass(className);
        next();
    });
    return this;
};

$.fn.queueRemoveClass = function(className) {
    this.queue('fx', function(next) {
        $(this).removeClass(className);
        next();
    });
    return this;
};









//NOTE JS
/*
var notePopup = $.magnificPopup.instance;
    $('.note-card__header').magnificPopup({
        type:'inline',
        closeOnBgClick: true,
        showCloseBtn: false,
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
		// Delay in milliseconds before popup is removed
		removalDelay: 300,

		// Class that is added to popup wrapper and background
		// make it unique to apply your CSS animations just to this exact popup
		mainClass: 'mfp-fade'
    });
	$('.create-form').on('submit', function(){
		notePopup.close();
	});
    
    $('#closeNotePopup').on('click', function(){
        notePopup.close();
    });


$('.note-view').masonry({
	// set itemSelector so .grid-sizer is not used in layout
	itemSelector: '.note-card',
	// use element for option
	//columnWidth: '.note-card',
	percentPosition: true,
	//horizontalOrder: true
	gutter: 16,
	initLayout: true,
	resize: true,
	containerStyle: null
});
window.dispatchEvent(new Event('resize'));


//PRELOADER
let circles = document.getElementsByClassName("preloader__circle");
let n = 0;
for(let i = 0; i <circles.length; i++){
  setTimeout( () => {
   circles[i].classList.add("zoom");
  }, n);
  n = n +200;
}


*/























