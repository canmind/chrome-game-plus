document.onmouseup = function(ev){
var ev=ev||window.event,
    left=ev.clientX,
    top=ev.clientY;
	console.log(left);
	console.log(top);
	gameSelection();
}

var className = "";
var selectId = "";
var targetcss = "";
var baseURI = "";
var targetrule = "";

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
	getChindLink(html);
	getParentAttr(html);
	if(typeof selectId != "undefined"){
		targetcss="#"+selectId+" a";
	}
	if(typeof className != "undefined"&&targetcss==""){
		var strs= new Array(); //定义一数组 
		strs = className.split(" "); //字符分割 
		for (i=0;i<strs.length ;i++){ 
			targetcss += "."+strs[i]+" ";
		} 
		targetcss+=" a";

	}
	var msg = {
		type: "getURL",
		baseURI : baseURI,
		targetcss : targetcss,
		targetrule :targetrule
		
	};
	chrome.runtime.sendMessage(msg);
    return html;
}
function IsNum(s)
{
    if(s!=null){
        var r,re;
        re = /\d*/i; //\d表示数字,*表示匹配多个数字
        r = s.match(re);
        return (r==s)?true:false;
    }
    return false;
}
function getChindLink(dom){
	if(!$(dom).is("a")){
		getChindLink($(dom).children());
	}else{
		var href = $(dom).attr("href");
		//href = "200012312-b-11020.shtml";
		//href = "200012312.shtml";
		//href = "abcdefg.shtml";
		var strs= new Array(); //定义一数组 
		strs = href.split("/");
		console.log(strs);
		var i = strs.length;
		var lastLink = strs[strs.length-1].split(".");
		var htmlName = lastLink[0];
		var suffix = lastLink[1];
	
		//console.log(htmlName);
		var rule1="",rule2="",rule3="";
	    rule1 = getNameRule(htmlName);
		 if(rule1==""){
			 rule1="\\S";
		  }
		if(strs.length>1){
	      rule2 = getNameRule(strs[strs.length-2]);
		  if(rule2==""){
			 rule2="\\S";
		  }
		  rule2+="/";
		}
		if(strs.length>2){
	      rule3 = getNameRule(strs[strs.length-3]);
		  if(rule3==""){
			 rule3="\\S";
		  }
			rule3+="/";
		}
	
		targetrule =  rule3+rule2+rule1+"."+suffix;
		
	}

}
function getNameRule(htmlName){
	var numcount = 0;
	var charcount = 0;
	var rule = "";
	var namecount= htmlName.length;
	for(var index=0;index<htmlName.length;index++)
	{
		if(IsNum(htmlName.charAt(index))){
			numcount++;
			charcount = 0;
		}else{
			namecount=namecount-numcount;
			numcount = 0;
			charcount++;
			//if(htmlName.charAt(index)=="-"||htmlName.charAt(index)=="_"){
				//rule+=htmlName.charAt(index);
			//}else{
				//rule+="\\S";
			//}			
		}
		if(numcount==namecount){
			rule+="\\d{"+numcount+"}";
		}else if(charcount==namecount){
			rule+="\\S";
		}
	}
	return rule;
}
//递归获取css
function getParentAttr(dom){
	 selectId = $(dom).attr("id");
	 if(typeof selectId == "undefined"){
		className = $(dom).attr("class");
		if(typeof className == "undefined"){
			getParentAttr($(dom).parent());
		}
	}
	return $(dom);
}