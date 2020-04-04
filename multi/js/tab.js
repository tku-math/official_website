const tabPageIdList = [{
	tabId: 'tab_1',
	pageId: 'page_1'
}, {
	tabId: 'tab_2',
	pageId: 'page_2'
}, {
	tabId: 'tab_3',
	pageId: 'page_3'
}, {
	tabId: 'tab_4',
	pageId: 'page_4'
}, {
	tabId: 'tab_5',
	pageId: 'page_5'
}];

function show(DOM) {
	DOM.classList.add('active');
}

function hide(DOM) {
	DOM.classList.remove('active');
}

function EventHandler(DOMList, index) {
	console.log(DOMList)
	DOMList.forEach(function (item) {
		hide(item.tab);
		hide(item.page);
	});

	show(DOMList[index].tab);
	show(DOMList[index].page);
}

function init() {
	const tabPageDOMList = tabPageIdList.map(function (item) {
		return {
			tab: document.querySelector(`#${item.tabId}`),
			page: document.querySelector(`#${item.pageId}`)
		};
	});

	// Bind listener to every tab
	tabPageDOMList.forEach(function (item, index) {
		item.tab.addEventListener('click', function () {
			EventHandler(tabPageDOMList, index);
		});
	});

	// default show first page
	show(tabPageDOMList[0].tab);
	show(tabPageDOMList[0].page);
}

window.onload = init();
// indes_news
function previous(){
	
	new_page = parseInt($('#current_page').val()) - 1;
	//if there is an item before the current active link run the function
	if($('.active_page').prev('.page_link').length==true){
		go_to_page(new_page);
	}
	
}

function next(){
	new_page = parseInt($('#current_page').val()) + 1;
	//if there is an item after the current active link run the function
	if($('.active_page').next('.page_link').length==true){
		go_to_page(new_page);
	}
	
}
function go_to_page(page_num){
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
	$('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');
	
	//update the current page input field
	$('#current_page').val(page_num);
}