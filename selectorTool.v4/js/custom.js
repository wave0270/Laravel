/**
 * Load Html thông qua proxy. Kết quả trả vè ở dạng json. Nội dung của json bao gồm:
 * - DATA: html content
 * - ENCODING: encoding của html
 * - ERROR_CODE: http error code. 200 = ok.
 * - ERROR_MSG: thông báo lỗi (nếu có) ở dạng string
 * Reference: http://api.jquery.com/jquery.ajax/
 * @param url
 * @param useCache: cờ báo hiệu cho biết có sử dụng cache hay không. Default là có dùng cache.
 * @returns {*}
 */
function getRemoteUrl(url, useCache) {
    var result = null;
    if (useCache == null) useCache = true;  // Nếu không định nghĩa thì default là có sử dụng cache.
    if (useCache == true) {
        // Thử đọc dữ liệu từ session storage. Nếu có dữ liệu thì trả kết quả về.
        response = sessionStorage.getItem(url);
        if (response != null) {
            console.log('getRemoteUrl: cache hit, url=', url);
            result = JSON.parse(response);
        }
    }else{
    	console.log('getRemoteUrl: loading from url=', url);
    	$.ajax({
		    url: URL_ROOT+'server/getUrlContent.php',
		    type: 'POST',
		    async: false,
		    dataType: 'text',
		    data: {
		        address: url
		    },
		    success: function(response) {
		    	// Lưu dữ liệu trong trường hợp có sử dụng cache
	            if (useCache == true) {
	                sessionStorage.setItem(url, response);
	            }
		       result = response;
		    }
		});
    }
	return result;
}
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
function getUrlVars() {
    var vars = [], hash;
    var hashes = top.window.location.href.slice(top.window.location.href.indexOf('#') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push({title : hash[0] , data : hash[1]});
    }
    return vars;
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
/*************************************/
function createFullPathForEcommerce(arrayCssSelector,text) {
	console.log('createFullPathForEcommerce()');
	var level = projectManagerModel.checkParentOfField();
	var pathCssFull = [];
	for (var i = 0; i < arrayCssSelector.length; i++) {
		var element = String.format("{0}", arrayCssSelector[i].tagName);	
		/*add tag and nth-of-type. Note: no add :nth-of-type because we are using :contains*/
		/*add id*/
		if (arrayCssSelector[i].id != "") {
			element = String.format("{0}#{1}", element, arrayCssSelector[i].id);
		}
		/*add class*/
		if (arrayCssSelector[i].className != "") {
			for (var j = 0; j < arrayCssSelector[i].className.length; j++) {
				element = String.format("{0}.{1}", element, arrayCssSelector[i].className[j]);
			}
		}
		/*add attr*/
		if (arrayCssSelector[i].specialAttr.length != 0) {
			for (var j = 0; j < arrayCssSelector[i].specialAttr.length; j++) {
				element = String.format("{0}[{1}=\'{2}\']", element, arrayCssSelector[i].specialAttr[j].nameSpecialAttr, arrayCssSelector[i].specialAttr[j].valueSpecialAttr);
			}
		}
		/*add text if the node is last*/
		if( i == 0){	
			element = String.format("{0}:contains({1})", element, text);
		}
		/*add node to csspath*/
		if (arrayCssSelector[i].tagName == "" && arrayCssSelector[i].id == "" && arrayCssSelector[i].className == "" && arrayCssSelector[i].specialAttr.length == 0) {
		} else {
			pathCssFull.unshift(element);
		}
	}
	pathCssFull = pathCssFull.join(" > ");
	return pathCssFull;
}
function createFullPath(arrayCssSelector) {
	var level = projectManagerModel.checkParentOfField();
	var pathCssFull = [];
	for (var i = 0; i < arrayCssSelector.length; i++) {
		var element = String.format("{0}", arrayCssSelector[i].tagName);	
		/*add tag and nth-of-type. Note: add nth-of-type: not add with html, body, last node:*/
		if(level == 1){
				if (arrayCssSelector[i].tagName != "html" && arrayCssSelector[i].tagName != "body" && arrayCssSelector[i].nthOfType != "" && arrayCssSelector[i].tagName != "") {
				element = String.format("{0}:nth-of-type({1})", element, arrayCssSelector[i].nthOfType);
			}
		}
		if(level == 0){
			if (arrayCssSelector[i].tagName != "html" && arrayCssSelector[i].tagName != "body" && arrayCssSelector[i].nthOfType != "" && arrayCssSelector[i].tagName != "" && i != arrayCssSelector.length-1) {
				element = String.format("{0}:nth-of-type({1})", element, arrayCssSelector[i].nthOfType);
			}
		}
		/*add id*/
		if (arrayCssSelector[i].id != "") {
			element = String.format("{0}#{1}", element, arrayCssSelector[i].id);
		}
		/*add class*/
		if (arrayCssSelector[i].className != "") {
			for (var j = 0; j < arrayCssSelector[i].className.length; j++) {
				element = String.format("{0}.{1}", element, arrayCssSelector[i].className[j]);
			}
		}
		/*add attr*/
		if (arrayCssSelector[i].specialAttr.length != 0) {
			for (var j = 0; j < arrayCssSelector[i].specialAttr.length; j++) {
				element = String.format("{0}[{1}=\'{2}\']", element, arrayCssSelector[i].specialAttr[j].nameSpecialAttr, arrayCssSelector[i].specialAttr[j].valueSpecialAttr);
			}
		}
		/*add node to csspath*/
		if (arrayCssSelector[i].tagName == "" && arrayCssSelector[i].id == "" && arrayCssSelector[i].className == "" && arrayCssSelector[i].specialAttr.length == 0) {
		} else {
			pathCssFull.unshift(element);
		}
	}
	pathCssFull = pathCssFull.join(" > ");
	return pathCssFull;
}
function countElements(pathCss) {
	projectManagerModel.requireUnHightLight();
	var number = 0;
	var s = projectManagerModel.get('dataUrl').replace(/src/g,'data-src');
	var tmp = document.createElement('div');
	tmp.innerHTML = s;
	number = $(tmp).find(pathCss).length;
	return number;
}
function setTreetable(id){
	$(String.format("{0}",id)).treetable({
		expandable : true
	});
	// Highlight selected row
	$(String.format("{0} tbody",id)).on("mousedown", "tr", function() {
		$(".selected").not(this).removeClass("selected");
		$(this).toggleClass("selected");
	});
	// Drag & Drop Example Code
	$(String.format("{0} .file, {0} .folder",id)).draggable({
		helper : "clone",
		opacity : .75,
		refreshPositions : true, // Performance?
		revert : "invalid",
		revertDuration : 300,
		scroll : true
	});

	$(String.format("{0} .folder",id)).each(function() {
		$(this).parents(String.format("{0} tr",id)).droppable({
			accept : ".file, .folder",
			drop : function(e, ui) {
				var droppedEl = ui.draggable.parents("tr");
				$(String.format("{0}",id)).treetable("move", droppedEl.data("ttId"), $(this).data("ttId"));
			},
			hoverClass : "accept",
			over : function(e, ui) {
				var droppedEl = ui.draggable.parents("tr");
				if (this != droppedEl[0] && !$(this).is(".expanded")) {
					$(String.format("{0}",id)).treetable("expandNode", $(this).data("ttId"));
				}
			}
		});
	});
}	
function generateArrClickElements(arrClickElements) {
	console.log("in GerneralCssPathModel.generalElementArr()")
	if( arrClickElements.length < 1){
		return false;
	}else{
		var arrTemp = arrClickElements;
	}	
	var pathCss = createFullPath(arrTemp[0]);
	var arraySelectorStart = arrTemp[0];
	if (arrTemp.length < 2) {
		return arraySelectorStart;
	} else {
		//cach 2: so sánh đơn giản giữa hai node cùng level vơi nhau, bắt đầu từ node -> html
		for (var i = 1; i < arrTemp.length; i++) {
			var arraySelectorNext = arrTemp[i];
			var arraySelectorRecure = [];
			//kiểm tra để lấy độ dài mảng nhỏ nhất làm điều kiện vòng l
			if (arraySelectorStart.length < arraySelectorNext.length) {
				var length = arraySelectorStart.length;
			} else {
				var length = arraySelectorNext.length;
			}
			//so sánh song song hai node cùng level
			for (var j = 0; j < length; j++) {
				compareNode(arraySelectorStart[j], arraySelectorNext[j], arraySelectorRecure);
			}
			arraySelectorStart = arraySelectorRecure;
		}		
		return arraySelectorStart;
	}
}
function initCssSelectorNodeBegin(arrCssPaths, arrayCssSelector) {
	console.log("in initCssSelectorNodeBegin()")
	console.log(arrayCssSelector)
	var path = "";
	for (var i = 0; i < arrayCssSelector.length; i++) {
		if (arrCssPaths.length == 0) {
			if (arrayCssSelector[i].id != "") {
				path = String.format("#{0}", arrayCssSelector[i].id);
				addNumberToArrCssPath(path, arrCssPaths, true);
			}
			if (arrayCssSelector[i].tagName != "") {
				if (arrayCssSelector[i].nthOfType != "") {
					path = String.format("{0}:nth-of-type({1})", arrayCssSelector[i].tagName, arrayCssSelector[i].nthOfType);
					addNumberToArrCssPath(path, arrCssPaths, true);
				} else {
					path = String.format("{0}", arrayCssSelector[i].tagName);
					addNumberToArrCssPath(path, arrCssPaths, true);
				}
			}
			if (arrayCssSelector[i].className != "") {
				for (var j = 0; j < arrayCssSelector[i].className.length; j++) {
					path = String.format(".{0}", arrayCssSelector[i].className[j]);
					addNumberToArrCssPath(path, arrCssPaths, true);
				}
			}
			if (arrayCssSelector[i].specialAttr.length != 0) {
				for (var j = 0; j < arrayCssSelector[i].specialAttr.length; j++) {
					path = String.format("[{0}={1}]", arrayCssSelector[i].specialAttr[j].nameSpecialAttr, arrayCssSelector[i].specialAttr[j].valueSpecialAttr);
					addNumberToArrCssPath(path, arrCssPaths, true);
				}
			}
		}
	}
}
function addNumberToArrCssPath(path, arrCssPaths, firstNode) {
	var numberElement = countElements(path).toString();
	if( firstNode == true){
		var temp = {
			number : numberElement,
			pathCss : path,
		};
		arrCssPaths.push(temp);
	}else{
		if(gerneralCssPathModel.get('elementNumber') >= numberElement){
			var temp = {
				number : numberElement,
				pathCss : path,
			};
			arrCssPaths.push(temp);
		}
	}
}
/*** Các hàm generate ******************************/
function compareNode(nodeSelectorStart, nodeSelectorNext, arraySelectorRecure) {
	var id = compareId(nodeSelectorStart, nodeSelectorNext);
	var className = compareClass(nodeSelectorStart, nodeSelectorNext);
	var tagName = compareTag(nodeSelectorStart, nodeSelectorNext);
	if (tagName != "") {
		var nthOfType = compareNthchild(nodeSelectorStart, nodeSelectorNext);
	} else {
		var nthOfType = "";
	}
	var specialAttr = compareAttr(nodeSelectorStart, nodeSelectorNext);
	addNodeToArrSelector(id, className, tagName, nthOfType, specialAttr, arraySelectorRecure);
}

function addNodeToArrSelector(id, className, tagName, nthOfType, specialAttr, arraySelectorRecure) {
	var tempSelector = {
		tagName : tagName,
		nthOfType : nthOfType,
		id : id,
		className : className,
		specialAttr : specialAttr,
	};
	arraySelectorRecure.push(tempSelector);
}

function compareId(nodeSelectorStart, nodeSelectorNext) {
	var id = "";
	if (nodeSelectorStart.id == nodeSelectorNext.id && nodeSelectorStart.id != "") {
		id = nodeSelectorStart.id;
	}
	return id;
}

function compareTag(nodeSelectorStart, nodeSelectorNext) {
	var tagName = "";
	if (nodeSelectorStart.tagName == nodeSelectorNext.tagName && nodeSelectorStart.tagName != "") {
		tagName = nodeSelectorStart.tagName;
	}
	return tagName;
}

function compareNthchild(nodeSelectorStart, nodeSelectorNext) {
	var nthOfType = "";
	if (nodeSelectorStart.nthOfType == nodeSelectorNext.nthOfType) {
		nthOfType = nodeSelectorStart.nthOfType;
	}
	return nthOfType;
}

//So sánh list Class
function compareClass(nodeSelectorStart, nodeSelectorNext) {
	//check className
	if (nodeSelectorStart.className == "" || nodeSelectorNext.className == "") {
		var className = "";
	} else {
		var className = [];
		for (var i = 0; i < nodeSelectorStart.className.length; i++) {
			for (var j = 0; j < nodeSelectorNext.className.length; j++) {
				if (nodeSelectorStart.className[i] == nodeSelectorNext.className[j]) {
					className.push(nodeSelectorStart.className[i]);
				}
			}
		}
		if (className.length == 0) {
			var className = "";
		}
	}
	return className;
}
//so sánh list Attribute:
function compareAttr(nodeSelectorStart, nodeSelectorNext) {
	var specialAttr = [];
	if (nodeSelectorStart.specialAttr.length == 0) {
	} else {
		for (var i = 0; i < nodeSelectorStart.specialAttr.length; i++) {
			for (var j = 0; j < nodeSelectorNext.specialAttr.length; j++) {
				if (nodeSelectorStart.specialAttr[i].nameSpecialAttr == nodeSelectorNext.specialAttr[j].nameSpecialAttr && nodeSelectorStart.specialAttr[i].valueSpecialAttr == nodeSelectorNext.specialAttr[j].valueSpecialAttr) {
					var tempAttr = {
						nameSpecialAttr : nodeSelectorStart.specialAttr[i].nameSpecialAttr,
						valueSpecialAttr : nodeSelectorStart.specialAttr[i].valueSpecialAttr,
					};
					specialAttr.push(tempAttr);
				}
			}
		}
	}
	return specialAttr;
}
function createArrayCssPathFromElement(el, numberLevelNode) {
	/*Creay array of nodes from clicked Element*/
	console.log("in createArrayCssPathFromElement()");
	var number = 1;
	var varClass = "";
	var varId = "";
	var tagName = "";
	var nthOfType = '';
	var specialAttr = [];
	var arrayCssSelector = [];
	while (el.parentNode) {
		/*get tagName of node*/
		tagName = el.localName;
		/*getnth-of-type of node*/
		if (el == el.ownerDocument.documentElement) {
			nthOfType = "1";
		} else {
			for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling){				
				if( el.localName == e.previousElementSibling.localName ){
					c++;			
				}
			}								
			nthOfType = c.toString();
		}
		/*get id of node - not get id beacause some page use custom id*/ 
		// if (el.id != '') {
			// varId = el.id;
		// }
		/*get class arr of node*/
		if (el.classList.length != 0) {
			varClass = el.classList;
		}
		/*get attr arr of node*/
		for (var c = 0; c < el.attributes.length; c++) {
			// if (el.attributes[c].name != "id" && el.attributes[c].name != "class" && el.attributes[c].name != "src" && el.attributes[c].name != "href" && el.attributes[c].name != "style" && el.attributes[c].name != "hreftemp" && el.attributes[c].name != "title" && el.attributes[c].name != "xmlns" && el.attributes[c].name != "onclick" && el.attributes[c].name != "alt" && el.attributes[c].name != "lang" && el.attributes[c].name != "width" && el.attributes[c].name != "cellspacing" && el.attributes[c].name != "border" && el.attributes[c].name != "action" && el.attributes[c].name != "data-mobile-href" && el.attributes[c].name != "datetime" && el.attributes[c].name != "xml:lang" && el.attributes[c].name != "rev" && el.attributes[c].name != "background") {
			if (el.attributes[c].name == "class") {
				var tempAttr = {
					valueSpecialAttr : el.attributes[c].value,
					nameSpecialAttr : el.attributes[c].name,
				};
				//specialAttr.push(tempAttr);
			}
		}
		var temp = {
			tagName : tagName,nthOfType : nthOfType,id : varId,className : varClass,specialAttr : specialAttr,
		};
		arrayCssSelector.push(temp);
		varClass = ""; varId = ""; specialAttr = []; nthOfType = "";
		//Kiểm tra sô cấp node cần lấy:
		if (numberLevelNode == null) {
			el = el.parentNode;
		} else {
			if (number == numberLevelNode) {
				return arrayCssSelector;
			} else {
				el = el.parentNode;
				number++;
			}
		}
	}
	//remove node: html, body, #topdiv:
	arrayCssSelector.splice(arrayCssSelector.length-3,3);	
	return arrayCssSelector;
}