jQuery(function ($) {
	'use strict';
	//串 json
	function memberPhotoItem(item) {
		return `
		<div class="calculus-item ${item.job} col-md-3 col-xs-6 col-sm-4">
            <div class="calculus-item-inner" >
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
		function experienceInfoItem(item) {
			var count_key = Object.keys(item.experience).length
			var count_value = Object.values(item.experience)
			var experienceArray = []
			for (var i = 0; i < count_key; i++) {
				experienceArray += '<li>' + count_value[i] + '</li>'
			}
			return experienceArray
		}

		function courseInfoItem(item) {
			var count_key = Object.keys(item.course).length
			var count_value = Object.values(item.course)
			var courseArray = []
			for (var i = 0; i < count_key; i++) {
				courseArray += '<li>' + count_value[i] + '</li>'
			}
			return courseArray
		}

		function researchInfoItem(item) {
			var count_key = Object.keys(item.research).length
			var count_value = Object.values(item.research)
			var researchArray = []
			for (var i = 0; i < count_key; i++) {
				researchArray += '<li>' + count_value[i] + '</li>'
			}
			return researchArray
		}

		function contactInfoItem(item) {
			var count_key = Object.keys(item.contact).length
			var count_value = Object.values(item.contact)
			var contactArray = []
			for (var i = 0; i < count_key; i++) {
				contactArray += '<li>' + count_value[i] + '</li>'
			}
			return contactArray
		}

		function teachInfoItem(item) {
			var count_key = Object.keys(item.teach).length
			var count_value = Object.values(item.teach)
			var teachArray = []
			for (var i = 0; i < count_key; i++) {
				teachArray += '<li>' + count_value[i] + '</li>'
			}
			return teachArray
		}
		return `
		<div class="lightbox" id="${item.name_en}">
			<figure>
				<a href="#" class="close"></a>
				<figcaption>
				<h1>${item.name_zh} ${item.name_en}</h1>
				<div class="container">
					<div class="row">
						<div class="calculus_info col-sm-6 col-xs-4 col-md-4">
							<h2>${item.job_title}</h2>
							<h3 class="preview fa fa-list"> 經歷</h3><br>${experienceInfoItem(item)}
							<h3 class="preview fa fa-book"> 講授課程</h3><br>${courseInfoItem(item)}
						</div>
						<div class="calculus_info col-sm-6 col-xs-4 col-md-4">
							<img class="img-responsive" src="images/members/${item.job}/${item.name_zh}.jpg">
						</div>
					</div>
					<div class="row">
						<div class="calculus_info col-sm-6 col-xs-4 col-md-4">
							<h3 class="preview fa fa-book"> 研究領域</h3><br>${researchInfoItem(item)}
						</div>
						<div class="calculus_info col-sm-3 col-xs-5 col-md-2">
							<h3 class="preview fa fa-book"> 聯絡資訊</h3><br>${contactInfoItem(item)}
						</div>
						<div class="calculus_info col-sm-3 col-xs-5 col-md-2">
							<h3 class="preview fa fa-book"> 教學資源</h3><br>${teachInfoItem(item)}
						</div>
					</div>
				</div>
				</figcaption>
			</figure>
		</div>`
	}
	fetch('/json/member.json')
		.then(function (response) {
			return response.json()
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
		var rendered = Mustache.render(template, {
			name: 'Luke'
		});
		document.getElementById('target').innerHTML = rendered;
	}
	// Navigation Scroll
	$(window).scroll(function (event) {
		Scroll();
	});

	$('.navbar-collapse ul li a').on('click', function () {
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top - 5
		}, 1000);
		return false;
	});

	// User define function
	function Scroll() {
		var contentTop = [];
		var contentBottom = [];
		var winTop = $(window).scrollTop();
		var rangeTop = 200;
		var rangeBottom = 500;
		$('.navbar-collapse').find('.scroll a').each(function () {
			contentTop.push($($(this).attr('href')).offset().top);
			contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
		})
		$.each(contentTop, function (i) {
			if (winTop > contentTop[i] - rangeTop) {
				$('.navbar-collapse li.scroll')
					.removeClass('active')
					.eq(i).addClass('active');
			}
		})
	};

	$('#tohash').on('click', function () {
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top - 5
		}, 1000);
		return false;
	});

	// accordian
	$('.accordion-toggle').on('click', function () {
		$(this).closest('.panel-group').children().each(function () {
			$(this).find('>.panel-heading').removeClass('active');
		});

		$(this).closest('.panel-heading').toggleClass('active');
	});

	//Slider
	$(document).ready(function () {
		var time = 7; // time in seconds

		var $progressBar,
			$bar,
			$elem,
			isPause,
			tick,
			percentTime;

		//Init the carousel
		$("#main-slider").find('.owl-carousel').owlCarousel({
			slideSpeed: 500,
			paginationSpeed: 500,
			singleItem: true,
			navigation: true,
			navigationText: [
				"<i class='fa fa-angle-left'></i>",
				"<i class='fa fa-angle-right'></i>"
			],
			afterInit: progressBar,
			afterMove: moved,
			startDragging: pauseOnDragging,
			//autoHeight : true,
			transitionStyle: "fadeUp"
		});

		//Init progressBar where elem is $("#owl-demo")
		function progressBar(elem) {
			$elem = elem;
			//build progress bar elements
			buildProgressBar();
			//start counting
			start();
		}

		//create div#progressBar and div#bar then append to $(".owl-carousel")
		function buildProgressBar() {
			$progressBar = $("<div>", {
				id: "progressBar"
			});
			$bar = $("<div>", {
				id: "bar"
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
			if (isPause === false) {
				percentTime += 1 / time;
				$bar.css({
					width: percentTime + "%"
				});
				//if percentTime is equal or greater than 100
				if (percentTime >= 100) {
					//slide to next item 
					$elem.trigger('owl.next')
				}
			}
		}

		//pause while dragging 
		function pauseOnDragging() {
			isPause = true;
		}

		//moved callback
		function moved() {
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
	$(window).load(function () {
		'use strict';
		var $calculus_selectors = $('.calculus-filter >li>a');
		var $calculus = $('.calculus-items');
		$calculus.isotope({
			itemSelector: '.calculus-item',
			layoutMode: 'fitRows'
		});

		$calculus_selectors.on('click', function () {
			$calculus_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$calculus.isotope({
				filter: selector
			});
			return false;
		});
	});


	// Contact form
	var form = $('#main-contact-form');
	form.submit(function (event) {
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function () {
				form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn());
			}
		}).done(function (data) {
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});


});