var ListProjectView = Backbone.View.extend({
	el : $('#main-body'), // el attaches to existing element
	events : {
		'click #inspectButton' : 'click_inputUrl',
		'click .buttonGlobalOpen' : 'click_open',
		'click .buttonGlobalSave' : 'click_save',
		'click .buttonGlobalReset' : 'click_reset',
		'click .buttonGlobalValidate' : 'click_validate',
		'click .buttonGlobalGencode' : 'click_gencode',
		'click #showHideBt' : 'click_show',		
		'keypress .inputUrl' : 'keypress_inspect',	
		/*event at level2*/
		'click #showCsspathList' : 'click_showCsspathList',	
	},
	initialize : function() {
		_.bindAll(this, 'render', 'click_inputUrl','click_open','click_save','click_reset','click_validate','click_gencode','click_show','keypress_inspect','click_showCsspathList');
		// every function that uses 'this' as the current object should be in here
		// this.counter = 0; // total number of items added thus far
		// this.render();
	},
	render : function() {
	},
	/*Run event*/
	click_inputUrl : function() {
		projectManagerModel.inspectUrl();
	},
	click_open : function(){
		projectManagerModel.openDialogProject();
	},
	click_save : function(){
		projectManagerModel.saveProject();
	},
	click_reset: function(){
		projectManagerModel.initHometag();
	},
	click_validate: function(){
		projectManagerModel.initValidate();
	},
	click_gencode: function(){
		fieldListModel.generateCode(null);
	},	
	click_show: function(){
		projectManagerModel.showHideMenu();
	},	
	keypress_inspect : function(e){
		if (e.keyCode == 13) {
	        projectManagerModel.inspectUrl();
	    }
	},
	click_showCsspathList: function(){
		gerneralCssPathModel.renderCssSelector();
	},
	
});
var listProjectView = new ListProjectView(); 


