var Validate = Backbone.Model.extend({
	defaultsar : {
		prjData : '',
		prjUrl : '',
		urls : '',
		data : '',
	},
	initialize : function(){
		console.log('New Validate()');
		this.on('change', function(){
			if( this.hasChanged('urls') && this.get('urls') != ''){
				console.log('change:urls')							
				this.renderUrlsList();
				this.renderWebview();
				this.getCodeData()
				//this.set({'data':this.tempData()});				
				//this.renderDataTable();
			}
		});	
	},	
	renderWebview : function(){
		top.frames['web1'].$('body').html('');
		for( var i= 0; i < this.get('urls').length ; i++){
			top.frames['web1'].$('body').append(String.format('<iframe id="frame{0}" src="testpage.html" style="width:100%; height:300px;"></iframe>',i));
		}
	},
	renderDataTable : function(){
		var tmpl = doT.template($('#tmpl-data-table').html());
		var html = tmpl(this.get('data'));
		$('.resultContent').html(html);
	},
	renderUrlsList : function(){
		var tmpl = doT.template($('#tmpl-urlsList').html());
		var html = tmpl(this.get('urls'));
		$('#validateDiv').html(html);
	},
	dataDefault : function(){
		var data = [
			{url : this.get('prjUrl')},
		];
		return data;
	},
	tempData : function (){
		var element1 = [
			{ name : 'title', data : 'new data'},
			{ name : "sumary", data : 'new data'},
		];	
		var element2 = [
			{ name : 'title', data : 'new data'},
			{ name : "sumary", data : 'new data'},
		];
		var data = [
			{ element : element1},
			{ element : element2},
		];
		return data;
	},
	toggleResult : function(element){
		console.log($(element).text());
		if( $(element).children('.glyphicon').hasClass('glyphicon-chevron-up')){
			$(element).children('.glyphicon').removeClass('glyphicon-chevron-up');
			$(element).children('.glyphicon').addClass('glyphicon-chevron-down');
			$(element).siblings('.resultContent').toggle();
		}else{
			$(element).children('.glyphicon').removeClass('glyphicon-chevron-down');
			$(element).children('.glyphicon').addClass('glyphicon-chevron-up');
			$(element).siblings('.resultContent').toggle();
		}	
	},
	inspectUrlList : function(){
		for( var i= 0; i < this.get('urls').length ; i++){
			var nameIframe = String.format('#frame{0}',i);
			this.inspectUrl(nameIframe, this.get('urls')[i].url );	
		}
	},
	inspectUrl : function(nameIframe, url) {
		// top.frames['web1'].$("#frame01").contents().find(".newtest").html('nguyen thai binh');
		// top.frames['web1'].$("#frame02").contents().find("#newtest").html('kiem tra');
		// top.frames['web1'].$("#frame03").contents().find("body").html('xong');
		// return
		console.log("in .inspect()");		
		if (url == ''){
			alert("URL empty!");			
		}
		var baseUrl = url;
		console.log('inspectUrl: ' + url);
		// Dùng proxy để lấy html của url cần phân tích
		url = 'http://data.metit.vn/extra/proxy.php?o=js&url=' + url;
		$.getScript(url, function(d, textStatus, jqxhr) {
		}).done(function() {
			var htmlStr = data['DATA'];
			//xóa các script bên trong html
			while (htmlStr.indexOf("<script") > 0) {
				var temp = htmlStr.slice(htmlStr.indexOf("<script"), htmlStr.indexOf("</script>") + 9);
				htmlStr = htmlStr.replace(temp, " ");
			}		
			top.frames['web1'].$(nameIframe).contents().find('head').prepend('<base id="baseId" href="' + baseUrl + '">');	
			try {				
				top.frames['web1'].$(nameIframe).contents().find('body').html(htmlStr);
			} catch(e) {
			};
			validate.getCode(htmlStr);
			//var csspath = validate.get('prjData').fieldListModel.parentCssPath;
			//top.frames['web1'].$(nameIframe).contents().find(csspath).css('background','yellow');
		});
	},
	getCodeData : function (){		
		//var SuggestElementArr = this.get('parentResult').SuggestElementArr;
		var elementNum = this.get('elementNum');
		var SuggestElementArr = this.get('prjData').fieldListModel.parentResult.SuggestElementArr;
		var elementNum = this.get('prjData').fieldListModel.elementNum;
		for (var i = 0; i < SuggestElementArr.length; i++) {
			if (Number(SuggestElementArr[i].number) == elementNum) {
				var csspath = SuggestElementArr[i].pathCss;
				i = SuggestElementArr.length;
			}
		}
		//Lất data và xóa các data không có csspath:
		//var fieldlistData = this.get('fieldlistData');
		var fieldlistData = this.get('prjData').fieldListModel.fieldlistData;
		var arrData = [];
		for( var i=0; i < fieldlistData.length ; i++){
			if( fieldlistData[i].path != ''){
				arrData.push(fieldlistData[i]);
			}
		}
		if( arrData.length < 1){
			reportError(".divGetUrl", "Data emplty!");
			return false;
		}
		//var url = projectManagerModel.get('insUrl');
		var url = this.get('prjUrl');
		console.log("Number fieldlist: "+arrData.length);
		var arrRender = {
			url : url,
			csspathparent : csspath,
			fieldlistData : arrData,
		};
		//console.log(JSON.stringify(arrRender))
		return arrRender;
	},
	getCode : function(htmlStr){
		var arrRender = this.getCodeData();
		var data = arrRender.fieldlistData;
		//var s = projectManagerModel.get('dataUrl').replace(/src/g,'data-src');
		var s = htmlStr.replace(/src/g,'data-src');
		var tmp = document.createElement('div');
		tmp.innerHTML = s;
		fragment = document.createDocumentFragment().appendChild(tmp);																			
		nodes = fragment.querySelectorAll(arrRender.csspathparent);			
		//main arr					
		var arr = [];
		//arr for render column table:
		var arrSelector = [];
		//arr for render line table:
		var arrLineTableData = [];
		var lineTableTitle = [];
		var checkTitle = false;
		for (var i = 0; i< nodes.length; i++){
			var artLineTableElement = [];
			var arrSelectorsub = [];							
			var art = {};				
			art['type'] = "news";	
			art['functionName'] = functionName;
			for( var j=0; j < data.length ; j++){
				art[data[j].title] = processNode(i,data[j].path, data[j].attr, data[j].attrStyle);																								
				arrSelectorsub.push({
					name : data[j].title,
					data : art[data[j].title]});	
				artLineTableElement.push({ data : art[data[j].title] });
				if( checkTitle == false){
					lineTableTitle.push({name : data[j].title});
				}				
			}	
			checkTitle = true; //set top for lineTableTitle[]
			arrLineTableData.push({element : artLineTableElement});							
			var artSelector = {
				element : arrSelectorsub 
			};
			arrSelector.push(artSelector);			
			arr.push(art);
		}
		var arrLineTable = {
			dataArr  : arrLineTableData,
			titleArr : lineTableTitle,
		};
		 for (var i = 0; i< arrSelector.length; i++){
			 console.log("----------------------");
			 console.log(JSON.stringify(arrSelector[i]));			
		}
		//render tabletab in columnStyle:
		var tmpl = doT.template($('#tmpl-data-table').html());
		var html = tmpl(arrSelector);
		$('#tableTab').html(html);
		//render table in LineStyle:
		var tmpl = doT.template($('#tmpl-data-linetable').html());
		var html = tmpl(arrLineTable);
		$('#lineTableTab').html(html);
		//show Data in JsonStyle:
		setTimeout(function(){
			localStorage.setItem('jsonStr',JSON.stringify(arr, null, '\t'));
		},500);
	},
});
