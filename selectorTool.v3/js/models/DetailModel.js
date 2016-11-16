var DetailModel = Backbone.Model.extend({
	defaults : {
		timeIndex : '',
		newestCssPath : '',
		status : '',
		detailData : [],
	},
	initialize : function(){
		this.on("change", function(){
			if(this.hasChanged('timeIndex')){
				
			}
			if( this.hasChanged('newestCssPath')){
				this.set({'detailData': this.gernerateDetailData()});
				this.renderDetailData();
			}
		});
	},
	gernerateDetailData : function(){
		//projectManagerModel.requireUnHightLight();
		//projectManagerModel.requireHightLight(this.get('newestCssPath'));
		projectManagerModel.initHometag();
		var detailData = this.get("detailData");
		var tempEl = {
			csspath : this.get('newestCssPath'),
			text : top.frames['web1'].$(this.get('newestCssPath')).text(),
		};
		detailData.push(tempEl);
		return detailData;
	},
	renderDetailData : function(){
		console.log("DetailModel.renderDetailData()")
		var tmpl_fieldlist = doT.template($('#tmpl-detail').html());
		var html_fieldlist = tmpl_fieldlist(this.get('detailData'));
		$('#detail-content').html(html_fieldlist);
		$('table').footable();
	},
});
