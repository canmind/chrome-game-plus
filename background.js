function checkForValidUrl(tabId, changeInfo, tab) {
	chrome.pageAction.show(tabId);

};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

var articleData = {};
articleData.error = "加载中...";
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){

	//if(request.type!=="cnblog-article-information")
	//return;
	articleData = request;
	console.log(articleData.doc);
});

