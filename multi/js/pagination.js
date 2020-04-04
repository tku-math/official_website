// index_news_annoncement

jQuery(document).ready(function () {

	//Pagination JS
	//how much items per page to show
	var show_per_page = 4;
	//getting the amount of elements inside pagingBox div
	var number_of_items = $('#pagingBox').children().size();
	var number_of_items1 = $('#pagingBox1').children().size();
	//calculate the number of pages we are going to have
	var number_of_pages = Math.ceil(number_of_items / show_per_page);
	var number_of_pages1 = Math.ceil(number_of_items1 / show_per_page);

	//set the value of our hidden input fields
	$('#current_page').val(0);
	$('#show_per_page').val(show_per_page);
	$('#current_page1').val(0);
	$('#show_per_page1').val(show_per_page);

	//now when we got all we need for the navigation let's make it '

	/* 
	what are we going to have in the navigation?
		- link to previous page
		- links to specific pages
		- link to next page
	*/
	var navigation_html = '<a class="previous_link" href="javascript:previous();"><</a>';
	var current_link = 0;
	while (number_of_pages > current_link) {
		navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
		current_link++;
	}
	navigation_html += '<a class="next_link" href="javascript:next();">></a>';


	var current_link1 = 0;
	var navigation_html1 = '<a class="previous_link1" href="javascript:previous1();"><</a>';
	while (number_of_pages1 > current_link1) {
		console.log('owo')
		navigation_html1 += '<a class="page_link1" href="javascript:go_to_page1(' + current_link1 + ')" longdesc="' + current_link1 + '">' + (current_link1 + 1) + '</a>';
		current_link1++;
	}
	navigation_html1 += '<a class="next_link1" href="javascript:next1();">></a>';

	$('#page_navigation').html(navigation_html);
	$('#page_navigation1').html(navigation_html1);

	//add active_page class to the first page link
	$('#page_navigation .page_link:first').addClass('active_page');
	$('#page_navigation1 .page_link1:first').addClass('active_page1');

	//hide all the elements inside pagingBox div
	$('#pagingBox').children().css('display', 'none');
	$('#pagingBox1').children().css('display', 'none');

	//and show the first n (show_per_page) elements
	$('#pagingBox').children().slice(0, show_per_page).css('display', 'block');
	$('#pagingBox1').children().slice(0, show_per_page).css('display', 'block');

});



//Pagination JS

function previous() {

	new_page = parseInt($('#current_page').val()) - 1;
	//if there is an item before the current active link run the function
	if ($('.active_page').prev('.page_link').length == true) {
		go_to_page(new_page);
	}

}

function next() {
	new_page = parseInt($('#current_page').val()) + 1;
	//if there is an item after the current active link run the function
	if ($('.active_page').next('.page_link').length == true) {
		go_to_page(new_page);
	}

}

function go_to_page(page_num) {
	//get the number of items shown per page
	var show_per_page = parseInt($('#show_per_page').val());

	//get the element number where to start the slice from
	start_from = page_num * show_per_page;

	//get the element number where to end the slice
	end_on = start_from + show_per_page;

	//hide all children elements of pagingBox div, get specific items and show them
	$('#pagingBox').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');

	/*get the page link that has longdesc attribute of the current page and add active_page class to it
	and remove that class from previously active page link*/
	$('.page_link[longdesc=' + page_num + ']').addClass('active_page').siblings('.active_page').removeClass('active_page');

	//update the current page input field
	$('#current_page').val(page_num);
}


// index_news_event

function previous1() {

	new_page = parseInt($('#current_page1').val()) - 1;
	//if there is an item before the current active link run the function
	if ($('.active_page1').prev('.page_link1').length == true) {
		go_to_page1(new_page);
	}

}

function next1() {
	new_page = parseInt($('#current_page1').val()) + 1;
	//if there is an item after the current active link run the function
	if ($('.active_page1').next('.page_link1').length == true) {
		go_to_page1(new_page);
	}

}

function go_to_page1(page_num) {
	//get the number of items shown per page
	var show_per_page = parseInt($('#show_per_page1').val());

	//get the element number where to start the slice from
	start_from = page_num * show_per_page;

	//get the element number where to end the slice
	end_on = start_from + show_per_page;

	//hide all children elements of pagingBox div, get specific items and show them
	$('#pagingBox1').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');

	/*get the page link that has longdesc attribute of the current page and add active_page class to it
	and remove that class from previously active page link*/
	$('.page_link1[longdesc=' + page_num + ']').addClass('active_page1').siblings('.active_page1').removeClass('active_page1');

	//update the current page input field
	$('#current_page1').val(page_num);
}