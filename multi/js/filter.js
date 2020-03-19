$(window).load(function(){'use strict';
		var $calculus_selectors = $('.calculus-filter>a');
		var $calculus = $('.calculus-items');
		$calculus.isotope({
			itemSelector : '.calculus-item',
			layoutMode : 'fitRows'
		});
		
		$calculus_selectors.on('click', function(){
			$calculus_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$calculus.isotope({ filter: selector });
			return false;
		});
	});