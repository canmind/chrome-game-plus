// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.

var msg = {baseURI:"",aLink:"",className:"",targetcss:""}
;

function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  msg.baseURI = info.pageUrl;
  msg.aLink = info.linkUrl;
  //console.log(info);
  gameSelection();
  chrome.runtime.sendMessage(msg);
}
var className = "";
var selectId = "";
var targetcss = "";
var baseURI = "";
function gameSelection(){
	var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
             html = sel.getRangeAt(0).commonAncestorContainer;
			 baseURI = sel.getRangeAt(0).commonAncestorContainer.baseURI;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
	if(html.nodeName=="#text"){
		html=$(html).parent();
	}

	console.log(baseURI);
	console.log(targetcss);

}
// Create one test item for each context type.
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "智能抓取源分析";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});
  console.log("'" + context + "' item:" + id);
}
