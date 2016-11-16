var WebviewList = Backbone.Model.extend({
	defaults : {
		activeWebview : '0',
		weblist : ''
		
	},
	initialize : function(){
		console.log("New WebviewList()")
		this.set({'weblist':this.weblistDefault()});
		this.on('change:activeWebview', function(){
			var index = this.get('activeWebview');
			$('.inputUrl').val(this.get('weblist')[Number(index)].url);
			/*update webviewCheck of webview*/	
			top.frames['web0'].projectManagerModel.set({'dataUrl': this.get('weblist')[Number(this.get('activeWebview'))].dataUrl});
			top.frames['web0'].projectManagerModel.set({'insUrl': this.get('weblist')[Number(this.get('activeWebview'))].url});
			top.frames['web0'].projectManagerModel.set({'webviewCheck': this.get('activeWebview')});
		});		
	},
	weblistDefault : function(){
		var data = [
			{
				siteName : 'Website1',
				url : '',
				dataUrl : '',
			},
			{
				siteName : 'Website2',
				url : '',
				dataUrl : '',
			},
			{
				siteName : 'Website3',
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
		var data = this.get('weblist');
		data[Number(this.get('activeWebview'))].dataUrl = dataUrl;
		data[Number(this.get('activeWebview'))].url = url;
		this.set({'weblist':data});
		top.frames['web0'].projectManagerModel.set({'dataUrl': dataUrl});
		console.log(this.get('activeWebview'))
	},
	
});
var webviewList = new WebviewList();
webviewList.changeWebview();
