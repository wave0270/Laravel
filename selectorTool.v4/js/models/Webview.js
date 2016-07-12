var Webview = Backbone.Model.extend({
	defaults : {
		elNodes : '',
		checkFinish : '',
	},
	initialize: function(){
		console.log("new Webview()");
		this.on("change:elNodes", function(){	
			if(this.get('elNodes') != ''){
				console.log("change:elNodes");	
				this.elementClickedEvent();
			}	
		});
	},
  	elementClickedEvent: function(){
 		console.log("Webview.elementClickedEvent()");
 		var sendingData = {
 			data : this.get("elNodes"),
 			from : 'webview',
 			timeindex : new Date(),
 		};
    	localStorage.setItem("_clickedElement",JSON.stringify(sendingData));
  	},
  	setNodataForWebview : function(){
		setTimeout(function(){
			$('body h2').text('No Data.');
		},500);
	},
  	unHightLight : function(){	
  		this.set({'elNodes':''});
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
  	removeCsspath : function(csspath){
  		$(csspath).remove();
  	},
	disableTagA : function() {
		$("a").each(function() {
			var strHref = $(this).attr("href");
			$(this).removeAttr("href");
			$(this).attr("hrefTemp", strHref);
		});
	},
	sendDataToLocalStorage : function(key,data,method){
		var sendingData = {
 			data : data,
 			method : method,
 			from : "Webview",
 			timeindex : new Date(),
 		};
    	localStorage.setItem(key,JSON.stringify(sendingData));
	},
});

