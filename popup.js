document.addEventListener('DOMContentLoaded', function () {
	var data = chrome.extension.getBackgroundPage().articleData;
	if(data.error){
		$("#message").text(data.error);
		$("#content").hide();
	}else{
		$("#message").hide();
		$("#baseURI").text(data.baseURI);
		$("#rule").text(data.targetrule);
		$("#dom").text(data.targetcss);
	}
});
