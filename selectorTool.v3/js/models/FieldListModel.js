/**default ProjectManagerModel ready**/
var FieldListModel = Backbone.Model.extend({
	defaults : {
		timeindex : '',
		parentResult : '',
		parentCssPath : '',
		elementNum : '',
		fieldlistData : '',
		presentIndex : '3',
	},
	initialize : function() {
		console.log("New FieldListModel");
		this.set({'fieldlistData' : this.defaulData()});
		this.renderFieldlist();
		$("#tableTab").text("No Data");
		$("#lineTableTab").text("No Data");
		this.on('change:timeindex', function() {
			console.log("FieldListModel change:fieldlistData");
			if (this.get('parentResult') == "") {
				fieldListModel.set({
					'parentCssPath' : $('.default-rule input').val()					
				});				
				this.set({
					'parentResult' : gerneralCssPathModel.toJSON()
				}); 				
			} else {
				this.renderFieldlist();
				/*Render data to table*/
				this.getCode();
			}
		});
		this.on("change:parentCssPath",function(){
			console.log("FieldListModel change:parentCssPath");
			$(".default-rule input").val(this.get('parentCssPath'));
			this.set({'elementNum' : countElements(this.get('parentCssPath'))});
		});
		this.on('change:elementNum',function(){		
			console.log("FieldListModel change:elementNum");
			$(".default-itemCount").text(this.get('elementNum'));
		});
		this.on('change:presentIndex',function(){
			projectManagerModel.requireUnHightLight();
			arrClicks = [];
			gerneralCssPathModel = new GerneralCssPathModel();
		});
	},
	renderFieldlist : function() {
		/*Render Project*/
		var tmpl_fieldlist = doT.template($('#tmpl-fieldlist').html());
		var html_fieldlist = tmpl_fieldlist(this.get('fieldlistData'));
		$('#fieldlistView').html(html_fieldlist);
		/*Render select option tag*/
		for( var i=0; i<this.get('fieldlistData').length ; i++){
			var attr = this.get('fieldlistData')[i].attrStyle;
			$(String.format(".attrField{0} option",i)).each(function(){
				if($(this).val() == attr){this.selected = true;}
			});
		}
		if( this.get('parentResult') != ''){
			$(String.format('#childNode{0}', this.get('presentIndex'))).addClass('choicedIndex');
			document.getElementById(String.format('radio{0}', this.get('presentIndex'))).checked = true;			
		}
	},
	getDataFromFieldlistView : function(){
		var fieldlistData = [];
		$('#fieldlistView tr').each(function(){
			if( $(this).children('.titleFieldlist').text().trim() != ''){
				var temp = {};
				temp['title'] = $(this).children('.titleFieldlist').text().trim();
				temp['path'] = $(this).children('.pathField').text().trim();
				temp['number'] = $(this).children('.numberField').text().trim();
				if( $(this).find('.selectAttr').val() == 'href' || $(this).find('.selectAttr').val() == 'src'){
					temp['attr'] = 'getAttribute';
					temp['attrStyle'] = $(this).find('.selectAttr').val();
				}else{
					temp['attr'] = $(this).find('.selectAttr').val();
					temp['attrStyle'] = $(this).find('.selectAttr').val();
			}			
			fieldlistData.push(temp);
			}
		});
		/*add them empty data*/
		var temp = { title : '',path : '',number : '', attr : '',attrStyle :'' };
		fieldlistData.push(temp);
		this.set({'fieldlistData':fieldlistData});
		var timeindex = new Date();
		this.set({'timeindex': timeindex.getTime()});	
	},
	choiceTitle : function(indexInArr) {		
		console.log("FieldListModel.choiceTitle()")
		if( this.get('presentIndex') == indexInArr) return false;
		if(projectManagerModel.initFieldlist() == false) return false;	
		//xóa nhận diên title đang chọn
		$(".childNode").each(function() {
			$(this).removeClass("choicedIndex");
		});
		this.set({'presentIndex' : indexInArr});
		$(String.format('#childNode{0}', indexInArr)).addClass('choicedIndex');
		document.getElementById(String.format('radio{0}', indexInArr)).checked = true;
		
	},
	defaulData : function() {
		dataFieldlist = [
		{
			title : "title",
			path : "null",
			number : "0",
			attr : "innerText",
			attrStyle : "innerText",
		},
		{
			title : "summary",
			path : "null",
			number : "0",
			attr : "innerText",
			attrStyle : "innerText",
		},
		{
			title : "linkTo",
			path : "null",
			number : "0",
			attr : "getAttribute",
			attrStyle : "href",
		},
		{
			title : "imgUrl",
			path : "null",
			number : "0",
			attr : "getAttribute",
			attrStyle : "src",
		},
		{
			title : "",
			path : "",
			number : "",
			attr : "",
			attrStyle : "",
		},	
		];
		return dataFieldlist;
	},
	getCodeData : function (){		
		if(projectManagerModel.initFieldlist() == false){
			return false;
		}
		var elementNum = this.get('elementNum');
		var csspath = this.get('parentCssPath');
		//Lất data và xóa các data không có csspath:
		var fieldlistData = this.get('fieldlistData');
		var arrData = [];
		for( var i=0; i < fieldlistData.length ; i++){
			if( fieldlistData[i].path != 'null' && fieldlistData[i].path != '' ){
				arrData.push(fieldlistData[i]);
			}
		}
		if( arrData.length < 1){
			return false;
		}
		var url = projectManagerModel.get('insUrl');
		console.log("Number fieldlist: "+arrData.length);
		var arrRender = {
			url : url,
			csspathparent : csspath,
			fieldlistData : arrData,
		};
		return arrRender;
	},
	getCode : function(){
		var arrRender = this.getCodeData();
		var data = arrRender.fieldlistData;
		var s = projectManagerModel.get('dataUrl').replace(/src/g,'data-src');
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
				art[data[j].title] = processElement(nodes[i],data[j].path, data[j].attr, data[j].attrStyle);																								
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
	generateCode : function (status) {
		var arrRender = this.getCodeData();
		if( arrRender == false){
			return false;
		}
		if(arrRender.fieldlistData.length < 1){
			reportError(".divGetUrl", "Data empty!");
			return false;
		}
		doT.templateSettings.strip = false;
		var tmpl_dataSelectors = doT.template($('#tmpl-project').html());
		var html_dataSelectors = tmpl_dataSelectors(arrRender);
		$('#codeTab').html(html_dataSelectors);
		if( status == null){
			//open new window:
			myWindow = window.open('codeView.html', 'nameWindow',String.format('location=0,status=0,scrollbars=0,left={0},top=0,resizable=1,width={1},height={2}',screen.width/3,(screen.width/3)*2,screen.height));	
			setTimeout(function(){
				localStorage.setItem('javascriptStr',$('#codeTab').text());				
			},500);		
			try{
					myWindow.focus();
			}catch(e){
				console.log("Error when focus window!")
			}
		}
		return $('#codeTab').text();
	},
	updateDataWithNewWebview : function(){
		if(this.get('parentResult') != ""){
			var data = this.get('fieldlistData');
			for( var i=0; i < data.length ; i++){
				if( data[i].path != null && data[i].path != ''){
					data[i].number = countElements(String.format("{0} {1}",this.get('parentCssPath'),data[i].path));
				}
			}
			this.set({'fieldlistData':data});
			var timeindex = new Date();
			this.set({'timeindex': timeindex.getTime()});
		}	
	},
});

function processNode(i,csspath,attr,attrStyle){
	if(nodes[i].querySelector(csspath) == null){
		console.log('Have empty data!');
		return '';
	}
	if( attr == "innerHTML"){
		return nodes[i].querySelector(csspath).innerHTML;
	}
	if( attr == "outerHTML"){
		return nodes[i].querySelector(csspath).outerHTML;
	}
	if( attr == "getAttribute") {				
		if(attrStyle == 'src'){
			return  nodes[i].querySelector(csspath).getAttribute('data-src');
		}
		return  nodes[i].querySelector(csspath).getAttribute(attrStyle);
	}
	return nodes[i].querySelector(csspath).innerText.trim();
}	
function processElement(elem, csspath, attr, attrStyle) {
	var result = elem.querySelector(csspath);
	if (result == null) return '';
	if (attr == '' || attr == null) attr = 'innerHTML';
	if (attr == 'innerHTML') return result.innerHTML;
	if (attr == 'outerHTML') return result.outerHTML;
	if (attr == 'getAttribute') {
		if (attrStyle == 'href') return processHref_Src(elem, csspath, attr, attrStyle);
		if (attrStyle == 'src') {
			attrStyle = 'data-src';
			return processHref_Src(elem, csspath, attr, attrStyle);
		}
	} 
	return result.innerText.trim();
}
function processHref_Src(elem, csspath, attr, attrStyle){
	var result = elem.querySelector(csspath);
	var data = null;
	data = result.getAttribute(attrStyle);
	/*recursive children - 3 level*/
	if( data == null){
		var childList = $(result).children();
		for( var i=0; i<childList.length; i++){
			data = childList[i].getAttribute(attrStyle);
			if(data != null) return data;
			var childList2 = $(childList[i]).children();
			for( var j=0; j<childList2.length; j++){
				data = childList2[j].getAttribute(attrStyle);
				if(data != null) return data;
				var childList3 = $(childList2[j]).children();
				for( var f=0; f<childList3.length; f++){
					data = childList3[f].getAttribute(attrStyle);
					if( data != null) return data;
				}
			}		
		}
	}	
	/*recursive parent*/
	if( data == null){
		var parent = $(result).parent()[0];
		while( parent != elem){
			data = parent.getAttribute(attrStyle);
			if( data != null) return data;
			parent = $(parent).parent()[0];
		}
	}
	/*case link at elem*/
	if( data == null) data = elem.getAttribute(attrStyle);
	return data;
}
//function empty, will use at app:
var functionName = 'viewDetail';
