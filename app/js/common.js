$(function() {

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
	});
	
	
	$('.day').on('click', function(e){
		var $this = $(e.currentTarget);
		var card = $this.closest('.card');
		var chainCount = card.find('.card__chain-count');
		var options = card.find('.mark-options');
		var pos = determinePos($this);
		
		
		$this.queueAddClass('day--click').delay(500).queueRemoveClass('day--click');
		
		
		if ( options.hasClass('mark-options--open') &&  options.hasClass('mark-options--origin-'+pos)){
			options.removeClass('mark-options--open');
			chainCount.removeClass('card__chain-count--down');
		} else{
			options.addClass('mark-options--open');
			options.removeClassRegex(/^mark-options--origin-/);
			options.addClass('mark-options--origin-'+pos);
			chainCount.addClass('card__chain-count--down');
            
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
});


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
