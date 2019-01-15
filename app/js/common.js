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

});




$.fn.removeClassRegex = function(regex) {
  return $(this).removeClass(function(index, classes) {
    return classes.split(/\s+/).filter(function(c) {
      return regex.test(c);
    }).join(' ');
  });
};

/*
$('#hello').removeClassRegex(/^color-/)
*/