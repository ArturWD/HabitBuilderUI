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
	});
	
	
	$('.day').on('click', function(e){
		var $this = $(e.currentTarget);
		var card = $this.closest('.card');
		var chainCount = card.find('.card__chain-count');
		var options = card.find('.mark-options');
		var pos = determinePos($this);
		
		
		if ( options.hasClass('mark-options--open') &&  options.hasClass('mark-options--origin-'+pos)){
			options.removeClass('mark-options--open');
			chainCount.removeClass('card__chain-count--down');
		} else{
			options.addClass('mark-options--open');
			options.removeClassRegex(/^mark-options--origin-/);
			options.addClass('mark-options--origin-'+pos);
			chainCount.addClass('card__chain-count--down');
		}
		
	})

});




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
