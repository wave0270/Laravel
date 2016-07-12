var ListProjectView = Backbone.View.extend({
	el : $('#main-body'), // el attaches to existing element
	events : {
		//'click #inspectButton' : 'click_inputUrl',
		'click .buttonGlobalOpen' : 'click_open',
		'click .buttonGlobalSave' : 'click_save',
		'click .buttonGlobalReset' : 'click_reset',
		'click .buttonGlobalGencode' : 'click_gencode',
		'click #showHideBt' : 'click_show',		
		
		'click #updateButton' : 'click_update',
		'click #guessButton' : 'click_guess',
	},
	initialize : function() {
		_.bindAll(this, 'render','click_open','click_save','click_reset','click_gencode','click_show','click_update','click_guess');
	},
	render : function() {
	},
	/*Run event*/
	click_open : function(){
		projectManagerModel.openDialogProject();
	},
	click_save : function(){
		projectManagerModel.saveProject();
	},
	click_reset: function(){
		projectManagerModel.resetPresentRule();
	},
	click_gencode: function(){
		projectManagerModel.generateCode(true);
	},	
	click_show: function(){
		projectManagerModel.showHideMenu();
	},	
	click_update: function(){
		projectManagerModel.getDataFromTreetable(true);
	},
	click_guess: function(){
		projectManagerModel.guessProcess();
	}
	
});
var listProjectView = new ListProjectView(); 


