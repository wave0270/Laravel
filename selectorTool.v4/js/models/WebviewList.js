var WebviewList = Backbone.Model.extend({
	defaults : {
		activeWebview : '0',
		weblistData : '',
		numberWebview : '',
	},
	initialize : function(){
		console.log("New WebviewList()");
		this.set({'weblistData':this.weblistDefault()});
		this.set({'numberWebview':String.format('{0}',this.weblistDefault().length)});
		this.on('change:activeWebview', function(){
			var index = this.get('activeWebview');
			$('.inputUrl').val(this.get('weblistData')[Number(index)].url);
			/*update webviewCheck of webview*/	
			var dataToMenu = { 
				dataUrl : this.get('weblistData')[Number(index)].dataUrl,
				insUrl : this.get('weblistData')[Number(index)].url,
				webviewCheck : index,
			};
			$(String.format("#iframe{0}",this.get('activeWebview')))[0].contentWindow.webview.sendDataToLocalStorage("_callMenuFunction",dataToMenu,"changeWebview");
		});		
	},
	weblistDefault : function(){
		var data = [
			{
				url : '',
				dataUrl : '',
			},
			{
				url : '',
				dataUrl : '',
			},
			{
				url : '',
				dataUrl : '',
			}
		];
		return data;
	},
	changeWebview : function(){
		//change webviewCheck parameter:
		$('#myTab li').click(function(){
			if($(this).attr('id') != webviewList.get('webviewList')){
				webviewList.set({'activeWebview':$(this).attr('id')});
			}
		});
	},
	updateDataWebview : function(dataUrl, url){
		var data = this.get('weblistData');
		data[Number(this.get('activeWebview'))].dataUrl = dataUrl;
		data[Number(this.get('activeWebview'))].url = url;
		this.set({'weblistData':data});
		$('.inputUrl').val(this.get('weblistData')[Number(this.get('activeWebview'))].url);
	},
	sendDataToLocalStorage : function(key,data,method){
		var sendingData = {
 			data : data,
 			method : method,
 			from : "WebviewList",
 			timeindex : new Date(),
 		};
    	localStorage.setItem(key,JSON.stringify(sendingData));
	},
	openWebview : function(url){
		$(String.format("#iframe{0}",this.get('activeWebview')))[0].contentWindow.location = url;
	},
	setBaseForWebview : function(baseUrl){
		$(String.format("#iframe{0}",this.get('activeWebview'))).contents().find("head").prepend('<base id="baseId" href="' + baseUrl + '">');
	},
	inspectUrlWebview : function(htmlStr,baseUrl){
		$(String.format("#iframe{0}",this.get('activeWebview'))).contents().find('body').html('<div id="topdiv"></div>');
		$(String.format("#iframe{0}",this.get('activeWebview'))).contents().find('#topdiv').html(htmlStr);
		$(String.format("#iframe{0}",this.get('activeWebview')))[0].contentWindow.initSelector();
		$(String.format("#iframe{0}",this.get('activeWebview')))[0].contentWindow.webview.disableTagA();
		this.updateDataWebview(htmlStr,baseUrl);
	},
	doIfWebviewReady : function(){
		var interval = setInterval(function() {		
			if ($(String.format("#iframe{0}",webviewList.get('activeWebview')))[0].contentWindow.webview.get('checkFinish') != undefined && $(String.format("#iframe{0}",webviewList.get('activeWebview')))[0].contentWindow.webview.get('checkFinish') != '') {
				$(String.format("#iframe{0}",webviewList.get('activeWebview')))[0].contentWindow.webview.sendDataToLocalStorage("_callMenuFunction",null,"renderTreetable");		
				clearInterval(interval);			
			}
		}, 100);
	},
	setPositionCsspath : function(data){
		var element = document.createElement('div');
		element.className = 'info-selected';
		element.id = 'info-selected';
		element.innerHTML = data.text;
  		$(String.format("#iframe{0}",webviewList.get('activeWebview')))[0].contentWindow.$(data.parent).css({'position':'static'});
		$(String.format("#iframe{0}",webviewList.get('activeWebview')))[0].contentWindow.$(data.child).css({'position':'relative'});
		$(String.format("#iframe{0}",webviewList.get('activeWebview')))[0].contentWindow.$(data.child).append(element);
  	},
});
var webviewList = new WebviewList();
webviewList.changeWebview();

function onStorageEvent(storageEvent){
	/*listen event localstorage*/
	if( storageEvent.newValue == null || storageEvent.newValue == ""){ return false;}
	var storageData = JSON.parse(storageEvent.newValue);
	if( storageEvent.key == "_callWebviewFunction"){
		if( storageData.method == "openWebview"){
			webviewList.openWebview(storageData.data);
		}
		if( storageData.method == "setBaseForWebview"){
			webviewList.setBaseForWebview(storageData.data);
		}
		if( storageData.method == "inspectUrlWebview"){
			webviewList.inspectUrlWebview(storageData.data.htmlStr,storageData.data.baseUrl);
		}
		if( storageData.method == "setPositionCsspath"){
			webviewList.setPositionCsspath(storageData.data);
		}
		if( storageData.method == "hightLightALL"){
			for(var i=0; i < Number(webviewList.get("numberWebview")) ; i++){
				$(String.format("#iframe{0}",i))[0].contentWindow.webview.hightLightALL(storageData.data);
			}
		}
		if( storageData.method == "hightLightGenCssPath"){
			for(var i=0; i < Number(webviewList.get("numberWebview")) ; i++){
				$(String.format("#iframe{0}",i))[0].contentWindow.webview.hightLightGenCssPath(storageData.data);
			}
		}
		if( storageData.method == "unHightLight"){
			for(var i=0; i < Number(webviewList.get("numberWebview")) ; i++){
				$(String.format("#iframe{0}",i))[0].contentWindow.webview.unHightLight();
			}
		}
		if( storageData.method == "doIfWebviewReady"){
			webviewList.doIfWebviewReady();
		}
		if( storageData.method == "removeCsspath"){
			for(var i=0; i < Number(webviewList.get("numberWebview")) ; i++){
				$(String.format("#iframe{0}",i))[0].contentWindow.webview.removeCsspath(storageData.data);
			}
		}
	}
}
window.addEventListener('storage', onStorageEvent, false);