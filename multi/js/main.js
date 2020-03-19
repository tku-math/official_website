jQuery(function($) {'use strict';
	//串 json
	function memberPhotoItem(item) {
		return `
		<div class="calculus-item ${item.job} col-xs-5">
            <div class="calculus-item-inner">
                <img class="img-responsive" src="images/members/${item.job}/${item.name_zh}.jpg">
                <div class="calculus-info">
                    <h3>${item.name_zh}</h3>
                    ${item.job_title}
					<a class="preview fa fa-eye" href="#${item.name_en}"></a>
                </div>
            </div>
        </div>`
	}
	function memberInfoItem(item) {
		return `
		<div class="lightbox" id="${item.name_en}">
			<figure>
				<a href="#" class="close"></a>
				<figcaption>
				<h1>${item.name_zh} ${item.name_en}</h1>
				<div class="container">
					<div class="row">
						<div class="calculus_info col-sm-4 col-xs-4">
							<h2>${item.job_title}</h2>
							<h3 class="preview fa fa-graduation-cap"> ${item.education}</h3><br>
							<h3 class="preview fa fa-list"> 經歷${item.experience.experience1}</h3><br>
						</div>
						<div class="calculus_info col-sm-4 col-xs-5">
							<img class="img-responsive" src="images/members/${item.job}/${item.name_zh}.jpg">
						</div>
					</div>
				</div>
				</figcaption>
			</figure>
		</div>`
	}
	fetch('/json/member.json')
		.then(function (response) {
			return response.clone().json()
		})
		.then(function (memberInfo) {
			var wrapperphoto = document.getElementById('memberPhoto')
			var wrapperInfo = document.getElementById('memberInfo')
			memberInfo.forEach(function (response) {
				wrapperphoto.innerHTML += memberPhotoItem(response)
				wrapperInfo.innerHTML += memberInfoItem(response)
			})
		});


	function renderHello() {
		var template = document.getElementById('template').innerHTML;
		var rendered = Mustache.render(template, { name: 'Luke' });
		document.getElementById('target').innerHTML = rendered;
	}
	// Navigation Scroll
	$(window).scroll(function(event) {
		Scroll();
	});

	$('.navbar-collapse ul li a').on('click', function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});

	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		$('.navbar-collapse').find('.scroll a').each(function(){
			contentTop.push( $( $(this).attr('href') ).offset().top);
			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		})
		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				$('.navbar-collapse li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');			
			}
		})
	};

	$('#tohash').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});

	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Slider
	$(document).ready(function() {
		var time = 7; // time in seconds

	 	var $progressBar,
	      $bar, 
	      $elem, 
	      isPause, 
	      tick,
	      percentTime;
	 
	    //Init the carousel
	    $("#main-slider").find('.owl-carousel').owlCarousel({
	      slideSpeed : 500,
	      paginationSpeed : 500,
	      singleItem : true,
	      navigation : true,
			navigationText: [
			"<i class='fa fa-angle-left'></i>",
			"<i class='fa fa-angle-right'></i>"
			],
	      afterInit : progressBar,
	      afterMove : moved,
	      startDragging : pauseOnDragging,
	      //autoHeight : true,
	      transitionStyle : "fadeUp"
	    });
	 
	    //Init progressBar where elem is $("#owl-demo")
	    function progressBar(elem){
	      $elem = elem;
	      //build progress bar elements
	      buildProgressBar();
	      //start counting
	      start();
	    }
	 
	    //create div#progressBar and div#bar then append to $(".owl-carousel")
	    function buildProgressBar(){
	      $progressBar = $("<div>",{
	        id:"progressBar"
	      });
	      $bar = $("<div>",{
	        id:"bar"
	      });
	      $progressBar.append($bar).appendTo($elem);
	    }
	 
	    function start() {
	      //reset timer
	      percentTime = 0;
	      isPause = false;
	      //run interval every 0.01 second
	      tick = setInterval(interval, 10);
	    };
	 
	    function interval() {
	      if(isPause === false){
	        percentTime += 1 / time;
	        $bar.css({
	           width: percentTime+"%"
	         });
	        //if percentTime is equal or greater than 100
	        if(percentTime >= 100){
	          //slide to next item 
	          $elem.trigger('owl.next')
	        }
	      }
	    }
	 
	    //pause while dragging 
	    function pauseOnDragging(){
	      isPause = true;
	    }
	 
	    //moved callback
	    function moved(){
	      //clear interval
	      clearTimeout(tick);
	      //start again
	      start();
	    }
	});

	//Initiat WOW JS
	new WOW().init();
	//smoothScroll
	smoothScroll.init();

	// calculus filter
	$(window).load(function(){'use strict';
		var $calculus_selectors = $('.calculus-filter >li>a');
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

	
	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});

	//Google Map
	var latitude = $('#google-map').data('latitude');
	var longitude = $('#google-map').data('longitude');
	function initialize_map() {
		var myLatlng = new google.maps.LatLng(latitude,longitude);
		var mapOptions = {
			zoom: 14,
			scrollwheel: false,
			center: myLatlng
		};
		var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize_map);

});