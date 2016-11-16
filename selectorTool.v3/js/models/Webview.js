var Webview = Backbone.Model.extend({
	defaults : {
		timeindex : '',
		elNodes : '',
		elClickedCssPath : '',
		checkFinish : '',
	},
	initialize: function(){
		console.log("new Webview()")
		this.on("change:elNodes", function(){		
			console.log("change:elNodes");
			var arrTemp = this.get('elNodes');
			this.set({'elClickedCssPath' : createFullPath(arrTemp)});		
			this.elementClickedEvent();
			this.hightLightALL(this.get('elClickedCssPath'));
		});
	},
 	elementClickedEvent: function(){
 		console.log("Webview.elementClickedEvent()");
 		var urlDomain = getDommainUrl();
 		var sendingData = {
 			//webviewCheck : webview.get('webviewCheck'),
 			elNodes : this.get("elNodes"),
 			from : 'webview',
 		};
    	top.postMessage(JSON.stringify(sendingData), urlDomain);
  	},
  	unHightLight : function(){	
  		$('.sg_selected').each(function(){
  			$(this).removeClass("sg_selected");
  		});
  		$('.sg_rejected').each(function(){
  			$(this).removeClass("sg_rejected");
  		});
  		$('.sg_suggested').each(function(){
  			$(this).removeClass("sg_suggested");
  		});
  	},
  	hightLightALL : function(csspath){
  		$(csspath).each(function(){
  			if(!$(this).hasClass('sg_selected') && !$(this).hasClass('sg_suggested')){
  				$(this).addClass("sg_selected");
  			}else{
  				console.log('Element da chon!');
  			}
  		});
  	},
  	hightLightGenCssPath : function(csspath){
  		$(csspath).each(function(){
  			if(!$(this).hasClass('sg_selected')){
  				$(this).addClass('sg_suggested');
  			}
  		});
  	},
	disableTagA : function() {
		$("a").each(function() {
			var strHref = $(this).attr("href");
			$(this).removeAttr("href");
			$(this).attr("hrefTemp", strHref);
		});
	},
});

function createArrayCssPathFromElement(el, numberLevelNode) {
	//tao ra mang cac node dua theo selector dc click
	console.log("in createArrayCssPathFromElement()");
	var number = 1;
	var varClass = "";
	var varId = "";
	var tagName = "";
	var nthchild = "";
	var specialAttr = [];
	var arrayCssSelector = [];
	while (el.parentNode) {
		if (el == el.ownerDocument.documentElement) {
			nthchild = "1";
		} else {
			for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++);
			nthchild = c.toString();
		}
		tagName = el.localName;
		if (el.classList.length != 0) {
			varClass = el.classList;
		}
		for (var c = 0; c < el.attributes.length; c++) {
			if (el.attributes[c].name == "id") {
				varId = el.attributes[c].value;
			}
			if (el.attributes[c].name != "id" && el.attributes[c].name != "class" && el.attributes[c].name != "src" && el.attributes[c].name != "href" && el.attributes[c].name != "style" && el.attributes[c].name != "hreftemp" && el.attributes[c].name != "title" && el.attributes[c].name != "xmlns" && el.attributes[c].name != "onclick" && el.attributes[c].name != "alt" && el.attributes[c].name != "lang" && el.attributes[c].name != "width" && el.attributes[c].name != "cellspacing" && el.attributes[c].name != "border" && el.attributes[c].name != "action" && el.attributes[c].name != "data-mobile-href" && el.attributes[c].name != "datetime" && el.attributes[c].name != "xml:lang" && el.attributes[c].name != "rev" && el.attributes[c].name != "background") {

				var tempAttr = {
					valueSpecialAttr : el.attributes[c].value,
					nameSpecialAttr : el.attributes[c].name,
				};
				//khong su dung attribute
				//specialAttr.push(tempAttr);
			}
		}
		var temp = {
			tagName : tagName,
			nthchild : nthchild,
			id : varId,
			className : varClass,
			specialAttr : specialAttr,
		};
		varClass = "";
		varId = "";
		specialAttr = [];
		nthchild = "";
		arrayCssSelector.push(temp);
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