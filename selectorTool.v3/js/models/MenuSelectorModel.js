var MenuSelectorModel = Backbone.Model.extend({
	defaults : {
		timeindex : '',
		url : '',
		generateCssPath : '',
		menuData : '',
		stylemenu : 'parent',
	},
	initialize : function(){
		this.on('change', function(){
			if( this.hasChanged('generateCssPath')){
				console.log('change:generateCssPath MenuSelectorModel');
				console.log(this.get('generateCssPath'))
				if(this.get('stylemenu') == 'parent'){
					this.set({'menuData':this.gernerateDataByParent()});
				}
				if(this.get('stylemenu') == 'child'){
					this.set({'menuData':this.gernerateDataByChild()});
				}			
				this.set({'url': projectManagerModel.get('insUrl')});
				this.renderMenuSelector();
			}	
			if( this.hasChanged('timeindex')){
				this.renderMenuSelector();
			}
		});
	},
	gernerateDataByParent : function(){
		projectManagerModel.requireUnHightLight();
		projectManagerModel.requireHightLight(this.get('generateCssPath'));
		projectManagerModel.initHometag();
		//gerneralCssPathModel = new GerneralCssPathModel();
		var cssPath = this.get('generateCssPath');
		var arrTemp = [];
		var htmstr = top.frames['web1'].$(cssPath).html();
		//get href by init fragment:
		var tmp = document.createElement('div');
		tmp.innerHTML = htmstr;
		fragment = document.createDocumentFragment().appendChild(tmp);
		var nodes = fragment.querySelectorAll("[hreftemp]");
		for (var i = 0; i < nodes.length; i++) {
			var temp = {};
			temp["href"] = nodes[i].getAttribute("hreftemp");
			temp["title"] = nodes[i].innerText.trim();
			arrTemp.push(temp);
		}		
		return arrTemp;
	},
	gernerateDataByChild : function(){
		var cssPath = this.get('generateCssPath');
		var arrTemp = [];
		top.frames['web1'].$(cssPath).each(function(){
			var href = $(this).attr('hreftemp');
			if( href != '' && href != null && href != undefined){
				if( href.indexOf('http') < 0){
					href = String.format('{0}{1}',projectManagerModel.get('insUrl'),href);
				}
				//if( $(this).text() != ''){//}	
				var temp = {
					href : href,
					title : $(this).text(),
				};		
				arrTemp.push(temp);				
			}				
		});
		return arrTemp;
	},
	renderMenuSelector : function(arrCssPaths) {
		console.log("in MenuSelectorModel.renderMenuSelector")
		var tmpl_dataSelectors = doT.template($('#tmpl-menuselector').html());
		var html_dataSelectors = tmpl_dataSelectors(this.get('menuData'));
		$('.renderTableOfMenu').html(html_dataSelectors);
		$('table').footable();
	},
	removeMenulist : function(number){
		console.log("in MenuSelectorModel.removeFieldlist()")
		var menuData = this.get('menuData');
		menuData.splice(number, 1);
		this.set({'menuData': menuData});		
		var timeindex = new Date();
		this.set({'timeindex': timeindex.getTime()});	
	},
	changeStyle : function(type){
		this.set({'stylemenu':type});
		console.log("Change selector style: "+this.get('stylemenu'));
		projectManagerModel.requireUnHightLight();	
	},
	getdata : function(){
		console.log("in MenuSelectorModel.getdata")
		projectManagerModel.renderSubmitDialogBox();
		$(".modal-title").text("Data");
		$(".modal").css("display", "block");
		$(".modal .modal-body").html('<textarea class="menudata" rows="5" style="width:100%"></textarea>');
		$("#submitDialog").css("display","none");
		$(".menudata").val(JSON.stringify(this.get('menuData')));
		this.transformData();
		
	},
	testProject : function(){
		projectManagerModel.renderSubmitDialogBox();
		$(".modal-title").text("Load Project");
		$(".modal").css("display", "block");
		$(".modal .modal-body").html('<textarea class="menudata" rows="5" style="width:100%"></textarea>');
	},
	transformData : function(){
		//send menu data to localstorage for menu.html:
		console.log('in MenuSelectorModel.transformData()')
		var arrData = this.get('menuData');
		var newArrData = [];
		var temp = {};
		for( var i=0; i<arrData.length ; i++){
			temp['text'] = arrData[i].title;
			temp['onclick'] = String.format('viewArtList\n{0}\n',arrData[i].href);
			temp['class'] = 'menuItem';
			newArrData.push(temp);
		}
		//console.log(JSON.stringify(newArrData))
		//localStorage.setItem('menuData',JSON.stringify(newArrData));
	},
});
