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