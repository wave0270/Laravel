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
		var url = $('.inputUrl').val().trim();
		top.frames['web0'].projectManagerModel.inspectUrl(url);
	},
	keypress_inspect : function(e){
		var url = $('.inputUrl').val().trim();
		if (e.keyCode == 13) {
	        top.frames['web0'].projectManagerModel.inspectUrl(url);
	    }
	},
});
var webviewListView = new WebviewListView(); 


