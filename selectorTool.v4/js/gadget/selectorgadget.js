function initSelector() {
	//console.log("---------------------- in initSelector()")
	var urltemp = getFolderUrlNow();
	urltemp = urltemp.substring(0, urltemp.lastIndexOf("/"));
	urltemp = urltemp.substring(0, urltemp.lastIndexOf("/"));
	urltempCss = String.format(urltemp + "/css/selectorgadget.css");
	urltempPatch = String.format(urltemp + "/js/gadget/diff_match_patch.js");
	urltempDom = String.format(urltemp + "/js/gadget/dom.js");
	urltempInter = String.format(urltemp + "/js/gadget/interface.js");
	urltempReact = String.format("//cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js");
	//urltempTr = String.format(urltemp + "/js/libs/JSXTransformer-0.10.0.js");
	
	importCSS(urltempCss);
		//importJS(urltempPatch, 'diff_match_patch', function() {
			//importJS(urltempDom, 'DomPredictionHelper', function() {
				importJS(urltempInter);
				importJS(urltempReact);
				//importJS(urltempTr);
			//});
		//});
}
function importCSS(href, look_for, onload) {
	//console.log("---------------------- in importCSS()")
	var s = document.createElement('link');
	s.setAttribute('rel', 'stylesheet');
	s.setAttribute('type', 'text/css');
	s.setAttribute('media', 'screen');
	s.setAttribute('href', href);
	if (onload)
		wait_for_script_load(look_for, onload);
	var head = document.getElementsByTagName('head')[0];
	if (head) {
		head.appendChild(s);
	} else {
		document.body.appendChild(s);
	}
}
function importJS(src, look_for, onload) {
	
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', src);
	if (onload)
		wait_for_script_load(look_for, onload);
	var head = document.getElementsByTagName('head')[0];
	if (head) {
		head.appendChild(s);
	} else {
		document.body.appendChild(s);
	}
	//set finished status for webview				
	webview.set({'checkFinish':'true'});
	console.log("Kiem tra trang thai webview :"+webview.get('checkFinish'));
}
// cho cho script chay xong 
function wait_for_script_load(look_for, callback) {
	//console.log("---------------------- in wait_for_script_load()")
	var interval = setInterval(function() {
		if (eval("typeof " + look_for) != 'undefined') {
			clearInterval(interval);
			callback();
		}
	}, 50);
}