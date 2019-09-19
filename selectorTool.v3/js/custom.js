//khởi tạo hàm String.format
String.format = function() {
	var theString = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
		theString = theString.replace(regEx, arguments[i]);
	}
	return theString;
};
function getFolderUrlNow() {
	var url_folder = $(location).attr('href');
	url_folder = url_folder.substring(0, url_folder.lastIndexOf("/") + 1);
	return url_folder;
}
function getDommainUrl(){
	var url_folder = $(location).attr('href');
	var headUrl = url_folder.substring(0,url_folder.lastIndexOf("://")+3);
	url_folder = url_folder.substring(url_folder.lastIndexOf("://")+3, url_folder.length);
	url_folder = url_folder.substring(0,url_folder.indexOf("/"));
	return headUrl + url_folder;
}
function reportError(idNailElement, errorStr) {
	$(idNailElement).after("<div id='errorReport' style='color:#008CBA; font-size:10px;'>" + errorStr + "</div>");
	setTimeout(function() {
		$("#errorReport").remove("#errorReport");
	}, 2000);
}
//********************/
function createFullPath(arrayCssSelector, isChild = false) {
	var pathCssFull = [];
	for (var i = 0; i < arrayCssSelector.length; i++) {
		var element = String.format("{0}", arrayCssSelector[i].tagName);	
		//note: add nth-child: ko add with html, body, last node:
		if (arrayCssSelector[i].tagName != "html" && arrayCssSelector[i].tagName != "body" && arrayCssSelector[i].nthchild != "" && arrayCssSelector[i].tagName != "" && i != arrayCssSelector.length-1) {
			if (isChild) {
				element = String.format("{0}", element, arrayCssSelector[i].nthchild);
			} else {
				element = String.format("{0}:nth-child({1})", element, arrayCssSelector[i].nthchild);
			}
		}
		if (arrayCssSelector[i].id != "") {
			element = String.format("{0}#{1}", element, arrayCssSelector[i].id);
		}
		if (arrayCssSelector[i].className) {
			if (arrayCssSelector[i].className.length) {
				// is array
				for (var j = 0; j < arrayCssSelector[i].className.length; j++) {
					element = String.format("{0}.{1}", element, arrayCssSelector[i].className[j]);
				}
			} else {
				// is object
				for (var j in arrayCssSelector[i].className ) {
					element = String.format("{0}.{1}", element, arrayCssSelector[i].className[j]);
				}
			}
		}
		if (arrayCssSelector[i].specialAttr.length != 0) {
			for (var j = 0; j < arrayCssSelector[i].specialAttr.length; j++) {
				element = String.format("{0}[{1}=\'{2}\']", element, arrayCssSelector[i].specialAttr[j].nameSpecialAttr, arrayCssSelector[i].specialAttr[j].valueSpecialAttr);
			}
		}
		if (arrayCssSelector[i].tagName == "" && arrayCssSelector[i].id == "" && arrayCssSelector[i].className == "" && arrayCssSelector[i].specialAttr.length == 0) {
		} else {
			pathCssFull.unshift(element);
		}
	}
	pathCssFull = pathCssFull.join(" > ");
	return pathCssFull;
}
function countElements(pathCss) {
	var number = 0;
	top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCss).each(function() {
		number++;
	});
	return number;
}
/****************************************************/
// function getscriptdata(){
	// var url = getFolderUrlNow();
	// url = url.substring(0, url.lastIndexOf("/"));
	// url = url.substring(0, url.lastIndexOf("/"));
	// console.log(String.format("{0}/js/menu.js",url))
	// $.ajax({
		// url: String.format("{0}/js/menu.js",url),
		// //context: document.body
		// }).done(function(data) {
			// //$( this ).addClass( "done" );
			// console.log(data);
			// return;
		// });	
// }
// //getscriptdata()
// function  postData(){
   	// var strContent = "test"
   	// console.log("Save file to local");
		// var a = document.createElement('a');
		// var blob = new Blob([strContent], {
			// 'type' : 'application/octet-stream'
		// });
		// a.href = window.URL.createObjectURL(blob);
		// a.save = 'dataSelector.txt';
		// a.click();
// }

