var WebviewListView = Backbone.View.extend({
	el : $('#main-content'), // el attaches to existing element
	events : {
		'click #inspectButton' : 'click_inputUrl',
		'keypress .inputUrl' : 'keypress_inspect',	
	},
	initialize : function() {
		_.bindAll(this, 'render', 'click_inputUrl','keypress_inspect');
	},
	render : function() {
	},
	/*Run event*/
	click_inputUrl : function() {
		webviewList.sendDataToLocalStorage("_callMenuFunction",$('.inputUrl').val().trim(),"inspectUrl");
	},
	keypress_inspect : function(e){
		if (e.keyCode == 13) {
	        this.click_inputUrl();
	    }
	},
});
var webviewListView = new WebviewListView(); 

