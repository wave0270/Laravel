var ProjectManagerModel = Backbone.Model.extend({
	defaults : {
		projectCheck : 'defaultSelector',
		
		insUrl : '',
		dataUrl : '',
		webviewCheck : '0',
		webviewNum : 3,
		
		ruleList : [],
		ruleCheck : '0',
		presentNodeIndex : '0',
	},
	initialize : function(){
		console.log("New ProjectManagerModel");
		this.setNodataForLinetable();
		this.on('change:dataUrl', function(){
			console.log('change:dataUrl');
		});
		this.on('change:projectCheck',function(){
			console.log(String.format("Bạn đang chọn project: {0}",this.get('projectCheck')));
		});
		this.on('change:webviewCheck',function(){
			console.log('change:webviewCheck: '+this.get('webviewCheck'));
			this.showDataOfPresentRule();
		});
	},
	setNodataForLinetable: function(){
		/*empty default data*/
		var data = '[{"dataParent": [""],"titleParent": "title","dataChild": []}]';
		localStorage.setItem('jsonStr',data);
	},
	sendDataToLocalStorage : function(key,data,method){
		//athere
		var sendingData = {
 			data : data,
 			method : method,
 			from : "ProjectManagerModel",
 			timeindex : new Date(),
 		};
    	localStorage.setItem(key,JSON.stringify(sendingData));
	},
	changeWebview : function(data){
		this.set({'dataUrl': data.dataUrl});
		this.set({'insUrl': data.insUrl});
		this.set({'webviewCheck': data.webviewCheck});
	},
	inspectUrl : function(url) {	
		/*Lấy html từ url chèn vào webview*/		
		if(this.get('projectCheck') == 'defaultSelector'){	
			this.resetPresentRule();
			if (url == ''){
				//url = 'http://www.thegioididong.com/dtdd/samsung-galaxy-core-2-g355#!anh-xoay-360';
				url = 'http://vnexpress.net/tin-tuc/the-gioi/';
				//url = 'http://nanapi.jp/wedding';
				//url = 'http://mainichi.jp/select/seiji/';
				//url = 'http://aiti.edu.vn/category/tin-tuc-su-kien/tin-khoa-hoc-cong-nghe/';
				//url = 'http://www.5giay.vn/nuoc-hoa-my-pham.html'
				//url = 'http://lenta.ru';
				//url = 'http://www.binhduong.gov.vn/vn/index.php';						
			}
			var baseUrl = url;
			this.set({'insUrl': url}) ;
			console.log('inspectUrl: ' + url);
			// Dùng proxy để lấy html của url cần phân tích
			// Phải có để frame gọi lại trang web và gán script selectorTool lại
			// this.sendDataToLocalStorage("_callWebviewFunction","webview.html","openWebview");
			
			$.ajax({
			    url: '../server/getUrlContent.php',
			    type: 'POST',
			    async: false,
			    dataType: 'text',
			    data: {
			        address: url
			    },
			    success: function(response) {
			       var htmlStr = response;
			       // console.log(htmlStr)
			       if( htmlStr == null || htmlStr == ''){
						projectManagerModel.setNodataForWebview();
						alert(String.format("Không lấy được data từ URL : {0}!",baseUrl));					
						return false;
					}
					//xóa các script bên trong html
					while (htmlStr.indexOf("<script") > 0) {
						var temp = htmlStr.slice(htmlStr.indexOf("<script"), htmlStr.indexOf("</script>") + 9);
						htmlStr = htmlStr.replace(temp, " ");
					}	
					var dataForWebview = {
						htmlStr : htmlStr,
						baseUrl : baseUrl,
					};
					projectManagerModel.sendDataToLocalStorage("_callWebviewFunction",baseUrl,"setBaseForWebview");	
					projectManagerModel.sendDataToLocalStorage("_callWebviewFunction",dataForWebview,"inspectUrlWebview");	
					projectManagerModel.set({'insUrl': baseUrl});
					projectManagerModel.set({'dataUrl': htmlStr});
			       console.log('end ')
			    }
			});
			
			// url = 'http://data.metit.vn/extra/proxy.php?o=js&url=' + url;
			// $.getScript(url, function(d, textStatus, jqxhr) {
			// }).done(function() {
				// var htmlStr = data['DATA'];
				// if( htmlStr == null || htmlStr == ''){
					// projectManagerModel.setNodataForWebview();
					// alert(String.format("Không lấy được data từ URL : {0}!",baseUrl));					
					// return false;
				// }
				// //xóa các script bên trong html
				// while (htmlStr.indexOf("<script") > 0) {
					// var temp = htmlStr.slice(htmlStr.indexOf("<script"), htmlStr.indexOf("</script>") + 9);
					// htmlStr = htmlStr.replace(temp, " ");
				// }	
				// var dataForWebview = {
					// htmlStr : htmlStr,
					// baseUrl : baseUrl,
				// };
				// projectManagerModel.sendDataToLocalStorage("_callWebviewFunction",baseUrl,"setBaseForWebview");	
				// projectManagerModel.sendDataToLocalStorage("_callWebviewFunction",dataForWebview,"inspectUrlWebview");	
				// projectManagerModel.set({'insUrl': baseUrl});
				// projectManagerModel.set({'dataUrl': htmlStr});	
			// });
		}	
	},
	updateDefaultDataToRulelist : function(){
		/*Lấy ruleList mặc định từ array hardcode ban đầu*/
		var ruleList = [];
		var tempRule = {
			url : this.get('insUrl'),
			ruleCheck : this.get('ruleCheck'),
			projectCheck : this.get('projectCheck'),
			fieldlistData : this.defaultData(),
		};
		ruleList[Number(this.get('ruleCheck'))] = tempRule;
		this.set({'ruleList':ruleList});
		this.renderTreetable();
	},
	defaultData : function() {
		dataFieldlist = [
		{parentName : '',name : "list",path : "  ",number : "0",attr : "innerText",attrStyle : "innerText", arrClickElements : ''},
		{parentName : '',name : "",path : "  ",number : "0",attr : "",attrStyle : "", arrClickElements : ''},	
		];
		return dataFieldlist;
	},
	updateRuleWhenClickEl : function(path,render){
		/*update rulelist mỗi khi click element, cho phép render hoặc không sau khi update*/
		console.log(String.format("ProjectManagerModel.updateRule : {0}", this.get('ruleCheck')));
		var ruleList = this.get('ruleList');
		var number = countElements(path);
		ruleList[Number(this.get('ruleCheck'))].fieldlistData[Number(this.get('presentNodeIndex'))].path = path;
		ruleList[Number(this.get('ruleCheck'))].fieldlistData[Number(this.get('presentNodeIndex'))].number = number;
		ruleList[Number(this.get('ruleCheck'))].fieldlistData[Number(this.get('presentNodeIndex'))].arrClickElements = arrClickElements;
		ruleList[Number(this.get('ruleCheck'))].url = this.get('insUrl');
		ruleList[Number(this.get('ruleCheck'))].ruleCheck = this.get('ruleCheck');
		ruleList[Number(this.get('ruleCheck'))].projectCheck = this.get('projectCheck');
		this.set({'ruleList':ruleList});
		if( render == true){
			this.renderTreetable();
		}
	},
	addNewRule : function(){	
		/*Tạo thêm 1 rule mới - đưa các trạng thái về mặc định ban đầu*/
	},
	renderTreetable : function() {	
		/*Render ruleList thành Treetable - Render dữ liệu ra thành các Table*/
		var data = this.get('ruleList');
		var tmpl_fieldlist = doT.template($('#tmpl-treetable').html());
		var html_fieldlist = tmpl_fieldlist(data);
		$('#home-content-2').html(html_fieldlist);
		setTreetable("#example-advanced");
		/*Render select option tag*/
		for( var j=0; j < data.length ; j++){
			for( var i=0; i < data[j].fieldlistData.length ; i++){				
				var attr = data[j].fieldlistData[i].attrStyle;
				$(String.format("#home-content-2 .attrField{0} option",i)).each(function(){
					if($(this).val() == attr){this.selected = true;}
				});
			}
		}
		/*expand the using rule*/
		$('#example-advanced').treetable("expandNode",this.get('ruleCheck'));
		$("#parentrule-0").css("display","none");
		this.shortCsspath();
		this.showSelectedCsspath();
		this.showDataOfPresentRule();
		this.addEventToParentname();
	},
	addEventToParentname : function(){
		/*add Event click, to user can choice parentName from existed Name*/
		var data = this.get('ruleList')[Number(this.get('ruleCheck'))].fieldlistData;
		$(String.format(".childrule-{0}",this.get('ruleCheck'))).find('.parentName').each(function(){
			$(this).hover(function(){
				/*get parentName list*/
				var parentArr = [];
				for( var i=0 ; i < data.length ; i++ ){
					if( data[i].number != '0'){
						if( data[i].parentName == '_' || data[i].parentName == ''){parentArr.push(data[i].name);}
					}
				}
				/*show  parentName list*/
				if( parentArr.length > 0){
					$(this).append("<ul id='parentList'></ul>");
					for( var i=0; i < parentArr.length ; i++){
						$("#parentList").append(String.format("<li class='parentNameClick'>{0}</li>",parentArr[i]));
					}
				}	
				/*Add event click for parentName list*/
				$(".parentNameClick").each(function(){
					$(this).click(function(){
						$(String.format(".node-{0}-{1}",projectManagerModel.get('ruleCheck'),projectManagerModel.get('presentNodeIndex'))).find('.parentName').text(this.innerText);	
					});
				});
			},function(){
				$("#parentList").remove();
			});
		});
	},
	shortCsspath : function(){		
		/*display a short csspath replace for generated csspath - this just to view*/
		$(".showCsspath").each(function(){
			if( $(this).text() != '' && $(this).text() != "null"){
				var arr = $(this).text().split(' > ');
				$(this).text(arr[arr.length - 1].trim());
			}		
		});
	},
	showSelectedCsspath : function(){
		/*reset status of treetable, and set status for the selected field*/
		$(".showCsspath").each(function(){
			$(this).css('display','block');
		});
		$(".trueCsspath").each(function(){
			$(this).css('display','none');
		});
		$(String.format(".node-{0}-{1}",this.get('ruleCheck'),this.get('presentNodeIndex'))).addClass("selected");
		$(String.format(".node-{0}-{1}",this.get('ruleCheck'),this.get('presentNodeIndex'))).find('.trueCsspath').css('display','block');
		$(String.format(".node-{0}-{1}",this.get('ruleCheck'),this.get('presentNodeIndex'))).find('.showCsspath').css('display','none');
		/*add event to parentName*/
	},
	choiceTitle : function(status) {	
		/*Set new value for presentNodeIndex - showSelectedCsspath, resetPresentRule */
		console.log("ProjectManagerModel.choiceTitle()");		
		var indexAttr = status.split("-")[1];
		var ruleCheck = status.split("-")[0];
		/* update rulelist if choice other rule*/
		if( this.get('ruleCheck') != ruleCheck){
			console.log(String.format("Bạn đã đổi sang rule:{0}",Number(ruleCheck)+1));
			this.updateRule(fieldListModel,false);
			/*get from ruleList*/
			this.openRuleWithIndex(Number(ruleCheck,false));			
		}	
		this.set({'presentNodeIndex' : indexAttr});
		this.showSelectedCsspath(); 
		this.resetPresentRule();
	},
	getDataFromTreetable : function(render){
		/*get data on TreeTable, add arrClickElements from old ruleList, update ruleList, */
		var indexRule = this.get("ruleCheck");
		var fieldlistData = [];
		$(String.format('.childrule-{0}',indexRule)).each(function(){
			var temp = {};
			temp['parentName'] = $(this).children('.parentName').text().trim();
			temp['name'] = $(this).children('.titleFieldlist').text().trim();
			temp['path'] = $(this).find('.trueCsspath').text().trim();
			temp['number'] = countElements(temp['path']);
			if( $(this).find('.selectAttr').val() == 'href' || $(this).find('.selectAttr').val() == 'src'){
				temp['attr'] = 'getAttribute';
				temp['attrStyle'] = $(this).find('.selectAttr').val();
			}else{
				temp['attr'] = $(this).find('.selectAttr').val();
				temp['attrStyle'] = $(this).find('.selectAttr').val();
			}			
			fieldlistData.push(temp);
		});
		/*insert arrClickElements*/
		var ruleList = this.get('ruleList');
		var old_fieldlistData = ruleList[Number(this.get('ruleCheck'))].fieldlistData;
		for( var i=0; i < fieldlistData.length; i++){
			fieldlistData[i]['arrClickElements'] = old_fieldlistData[i].arrClickElements;
		}
		/*delete empty data*/
		for( var i=0; i < fieldlistData.length; i++){
			if( fieldlistData[i].name == '' || fieldlistData[i].name  == '_'){
				fieldlistData.splice(i,1);
				i = -1;
			}
		}
		/*add one empty data*/
		var temp = { parentName: '', name : ' ',path : '  ',number : '0', attr : '',attrStyle :'' , arrClickElements : '' };
		fieldlistData.push(temp);
		/*update rulelist*/
		ruleList[Number(this.get('ruleCheck'))].fieldlistData = fieldlistData;
		this.set({'ruleList':ruleList});
		if( render == true){this.renderTreetable();}
	},
	checkChangedData : function(){
		/*Check value of name,  is duplicate?*/
		console.log("in checkChangedData()");
		var fieldlistData = this.get('ruleList')[Number(this.get('ruleCheck'))].fieldlistData;
		var name = $(String.format(".node-{0}-{1}",this.get('ruleCheck'),this.get('presentNodeIndex'))).find('.titleFieldlist').text();
		for( var i=0; i < fieldlistData.length ; i++){
			if( i != this.get('presentNodeIndex')){
				if( name == fieldlistData[i].name){
					alert("Name bạn nhập đã có!");
					this.resetPresentRule();
					return false;
				}
			}
		}
		return true;
	},
	checkParentOfField : function(){
		/*return selected field have parent field or not*/
		var fieldlistData = this.get('ruleList')[Number(this.get('ruleCheck'))].fieldlistData;
		var parentName = fieldlistData[Number(this.get('presentNodeIndex'))].parentName;
		if( parentName == '' || parentName == '_'){
			return 0; //not input parent
		}else{
			for( var i=0 ; i < fieldlistData.length ; i++){
				if( parentName == fieldlistData[i].name && i != Number(this.get('presentNodeIndex'))){
					if( fieldlistData[i].number == '0'){
						alert("Parent bạn chọn chưa có chưa có dữ liệu!");
						$(String.format(".node-{0}-{1}",this.get('ruleCheck'),this.get('presentNodeIndex'))).find('.parentName').text('');
						this.getDataFromTreetable(true);
						return 2;
					}else{
						return 1; //have true parent
					}							
				}
			}
		}
		alert("Bạn nhập parent Name sai!");console.log("Bạn nhập parent Name sai!");
		$(String.format(".node-{0}-{1}",this.get('ruleCheck'),this.get('presentNodeIndex'))).find('.parentName').text('');
		this.getDataFromTreetable(true);
		return 2;
	},
	getParentOfField : function(){
		/*return parent field of selected field*/
		var ruleList =  this.get('ruleList');
		var parentName = ruleList[Number(this.get('ruleCheck'))].fieldlistData[Number(this.get('presentNodeIndex'))].parentName;
		for( var i = 0; i < ruleList[Number(this.get('ruleCheck'))].fieldlistData.length ; i++){
			if( parentName == ruleList[Number(this.get('ruleCheck'))].fieldlistData[i].name){
				var parent = ruleList[Number(this.get('ruleCheck'))].fieldlistData[i];
				return parent;
			}
		}
		return false;
	},
	showAdvanceSeletor : function(){
		/*Show-Hide td of csspath*/
		$('.td-csspath').each(function(){
			$(this).toggle();
		});
	},
	getDataOfPresentRule : function (){		
		/*Transform present ruleList to two arrs: arrHaveParent,arrNotParent*/
		var fieldlistData = JSON.parse(JSON.stringify(this.get('ruleList')[Number(this.get('ruleCheck'))].fieldlistData));
		for( var i=0; i < fieldlistData.length ; i++){
			if( fieldlistData[i].number == '0'){
				fieldlistData.splice(i,1);
				i = -1;
			}	
		}
		if( fieldlistData.length == 0){return fieldlistData;} 
		/*get parentName of field have child*/
		var arrParent = []	;
		for( var i=0; i < fieldlistData.length ; i++){
			if( fieldlistData[i].parentName != '' && fieldlistData[i].parentName != '_'){
				if(arrParent.length == 0) {
					arrParent.push(fieldlistData[i].parentName);
				}else{
					for( var j=0; j< arrParent.length ; j++){
						if( arrParent[j] != fieldlistData[i].parentName){arrParent.push(fieldlistData[i].parentName);}						
					}
				}	
			}
		}
		/*get field have child and */
		var arrHaveParent = [];
		for( var i=0; i < arrParent.length ; i++){
			var group = [];
			for( var j=0; j < fieldlistData.length ; j++){
				if( arrParent[i] == fieldlistData[j].name){
					var parent = fieldlistData[j];
					fieldlistData.splice(j,1);
					j = fieldlistData.length;
				}
			}
			for( var f=0; f < fieldlistData.length ; f++){
				if( arrParent[i] == fieldlistData[f].parentName){
					fieldlistData[f].path = fieldlistData[f].path.replace(String.format("{0} >",parent.path),'').trim();
					group.push(fieldlistData[f]);
					fieldlistData.splice(f,1);
					f = -1;
				}
			}
			if(group.length > 0){
				var temp = {
					fieldlistData :  group,
					parent : parent,
				};
				arrHaveParent.push(temp);
			}			
		}	
		/*get field don't have child*/
		var arrNotParent = [];	
		for( var i=0; i < fieldlistData.length ; i++){
			if( fieldlistData[i].parentName == '_' || fieldlistData[i].parentName == ''){
				arrNotParent.push(fieldlistData[i]);
			}
		}		
		var arrOfRule = {
			url : this.get('insUrl'),
			arrHaveParent : arrHaveParent,
			arrNotParent : arrNotParent,
		};
		return arrOfRule;
	},
	showDataOfPresentRule : function(){
		/*get transformed arrs, and run getscript to get data from selected webview*/
		var arrOfRule = this.getDataOfPresentRule();
		if( arrOfRule.length == 0){
			console.log("Không có dữ liệu!");
			return false;
		}		
		var arr = [];	//main arr
		var s = projectManagerModel.get('dataUrl').replace(/src/g,'data-src');
		var tmp = document.createElement('div');
		tmp.innerHTML = s;
		//fragment = document.createDocumentFragment().appendChild(tmp);
		/*get data from single element*/
		if( arrOfRule.arrNotParent.length != 0){
			var data = arrOfRule.arrNotParent;		
			for( var i=0 ; i < data.length ; i++){
				var art = {};
				var dataParent = [];
				var dataChild = [];
				//var nodes = fragment.querySelectorAll(data[i].path);
				var nodes = $(tmp).find(data[i].path);
				for( var j=0 ; j < nodes.length ; j++){	
					dataParent.push(processElement(nodes[j],data[i].path, data[i].attr, data[i].attrStyle));
				}
				art['dataParent'] = dataParent,
				art['titleParent'] = data[i].name,
				art['dataChild'] = dataChild;
				arr.push(art);
			}
		}	
		/*get data from element groups*/
		if(arrOfRule.arrHaveParent.length != 0 ){
			var data = arrOfRule.arrHaveParent;
			for( var i=0 ; i < data.length ; i++){
				var art = {};
				var dataParent = [];
				var dataChild = [];
				//nodes = fragment.querySelectorAll(data[i].parent.path);	
				var nodes = $(tmp).find(data[i].parent.path);
				/*for ecommerce group*/
				if( nodes.length == 1 ){
					nodes = $(tmp).find(data[i].parent.path)[0];
					var artChild = {};
					var fieldlistData = data[i].fieldlistData;
					for( var f=0; f < fieldlistData.length ; f++){
						artChild[fieldlistData[f].name] = processElementForEcommerce($(nodes).find(fieldlistData[f].path),fieldlistData[f].path, fieldlistData[f].attr, fieldlistData[f].attrStyle);																	
					}
					dataChild.push(artChild);
					art['dataParent'] = dataParent,
					art['titleParent'] = data[i].parent.name,
					art['dataChild'] = dataChild;
					arr.push(art);
				}
				/*default groups*/
				if( nodes.length > 1 ){
					for( var j=0 ; j < nodes.length ; j++){
						/*get data of ParentName*/
						//dataParent.push(processElement(nodes[j],data[i].parent.path, data[i].parent.attr, data[i].parent.attrStyle));
						var artChild = {};
						var fieldlistData = data[i].fieldlistData;
						for( var f=0; f < fieldlistData.length ; f++){
							//artChild[fieldlistData[f].name] = processElement(nodes[j].querySelector(fieldlistData[f].path),fieldlistData[f].path, fieldlistData[f].attr, fieldlistData[f].attrStyle);				
							artChild[fieldlistData[f].name] = processElement($(nodes[j]).find(fieldlistData[f].path)[0],fieldlistData[f].path, fieldlistData[f].attr, fieldlistData[f].attrStyle);																						
						}
						dataChild.push(artChild);
					}
					art['dataParent'] = dataParent,
					art['titleParent'] = data[i].parent.name,
					art['dataChild'] = dataChild;
					arr.push(art);
				}		
			}						
		}	
		localStorage.setItem('jsonStr',JSON.stringify(arr, null, '\t'));				
	},
	generateCode : function(render){
		/*get transformed arrs, render to a function, and open new window*/
		var arrOfRule = this.getDataOfPresentRule();
		if( arrOfRule.length == 0){
			console.log("Không có dữ liệu!");
			return false;
		}
		doT.templateSettings.strip = false;
		var tmpl_dataSelectors = doT.template($('#tmpl-project').html());
		var html_dataSelectors = tmpl_dataSelectors(arrOfRule);
		$('#codeDiv').html(html_dataSelectors);
		if( render == true){
			myWindow = window.open('codeView.html', 'nameWindow',String.format('location=0,status=0,scrollbars=0,left={0},top=0,resizable=1,width={1},height={2}',screen.width/3,(screen.width/3)*2,screen.height));	
			setTimeout(function(){localStorage.setItem('javascriptStr',$('#codeDiv').text());},1000);		
			try{
				myWindow.focus();
			}catch(e){console.log("Error when focus window!");}
		}
		return $('#codeDiv').text();
	},
	resetPresentRule : function(){
		/*restore default status*/
		this.requireUnHightLight();
		arrClickElements = [];
	},
	requireHightLightClickEls : function(){
		/*hightlight the elements in arrClickElements of selected field - all webview*/
		if( this.get('ruleList')[Number(this.get('ruleCheck'))].fieldlistData[Number(this.get('presentNodeIndex'))].arrClickElements.length > 0){
			var arr = this.get('ruleList')[Number(this.get('ruleCheck'))].fieldlistData[Number(this.get('presentNodeIndex'))].arrClickElements;
			for( var i=0; i < arr.length ; i++){
				this.sendDataToLocalStorage('_callWebviewFunction',createFullPath(arr[i]),'hightLightALL');
			}
		}
	},
	requireUnHightLight : function(){
		/*unhightlight all webview*/
		for(var i=0; i<this.get('webviewNum') ; i ++){
			this.sendDataToLocalStorage('_callWebviewFunction',null,'unHightLight');
		}
	},
	requireHightLight : function(csspath){
		/*unhightlight before hightlight input csspath on all webview*/
		if( csspath != ''){
			for(var i=0; i<this.get('webviewNum') ; i ++){
				this.sendDataToLocalStorage('_callWebviewFunction',null,'unHightLight');
				this.sendDataToLocalStorage('_callWebviewFunction',csspath,'hightLightALL');
			}
		}else{
			console.log('Chưa có cssPath !');
		}	
	},
	requireHightLightGenCssPath : function(csspath){
		/*not unhightlight before hightlight input csspath on all webview */
		if( csspath != ''){
			for(var i=0; i<this.get('webviewNum') ; i ++){
				this.sendDataToLocalStorage('_callWebviewFunction',csspath,'hightLightGenCssPath');
			}
		}else{
			console.log(' Chưa có cssPath ! ');
		}	
	},
	showDialogBox : function(){
		$(".modal").css('display','block');
		$("#submitDialog").css('display','block');
		$("#submitDialog").text('Submit');
	},
	closeDialogBox : function(){
		$(".modal").css('display','none');
		$('.modal-body').html('');
	},
	openDialogProject : function() {		
		console.log('in ProjectManagerModel.openDialogSelector');
		this.showDialogBox();
		$(".modal-title").text("Open Project");
		$(".modal-body").html('<textarea class="inputProject" rows="5" style="width:100%"></textarea>');
		$("#submitDialog").attr("onclick","projectManagerModel.loadListProject()");
	},
	saveProject : function(){
		/*show present rulelist and save generated function*/
		if(this.get('ruleList').length > 0 && this.get('projectCheck') == 'defaultSelector'){
			this.showDialogBox();
			var ruleListOut = this.get('ruleList');
			$(".modal-title").text("Project RuleList");
			$("#submitDialog").text("Save to Server");	
			$("#submitDialog").attr('onclick','projectManagerModel.loginToServer("write")');
			$(".modal-body").html('<textarea id="forumdata" rows="5" style="width:100%"></textarea>');
			$(".modal-body").append('<label style="width:24%">File Name: </label><input style="width:75%" class="fileName"></input>');
			$("#forumdata").val(JSON.stringify(ruleListOut));	
		}
	},
	loadListProject : function (){
		var ruleListOut = $("#dialogDiv .inputProject").val().trim();				
		try{
			this.renderProject(ruleListOut);
			this.closeDialogBox();
		}catch(e){
			reportError('#project-global','Dữ liệu không đúng!');
		}		
	},
	renderProject : function(ruleListOut){
		ruleListOut = JSON.parse(ruleListOut);
		this.set({'ruleList':ruleListOut});
		this.inspectUrl(ruleListOut[0].url);
		this.sendDataToLocalStorage("_callWebviewFunction",null,"doIfWebviewReady");	
	},
	showHideMenu : function(){
		if( $('#showHideBt p').text().trim() == 'Hide'){
			//top.document.getElementById("main-frameset").cols="5%,95%";
			$('.buttonGlobal').css('display','none');	
			$("#project-global").css('display','none');			
			$('#showHideBt').css('display','block');
			$('#showHideBt p').text("Show");
			$('.move-select').css('display','none');	
			$('#iframeMenu0').css('display','none');	
		}else{
			if( $('#showHideBt p').text().trim() == 'Show'){
				//top.document.getElementById("main-frameset").cols="30%,70%";
				$('.buttonGlobal').css('display','block');
				$("#project-global").css('display','block');	
				$('#showHideBt p').text("Hide");
				$('.move-select').css('display','block');
				$('#iframeMenu0').css('display','block');	
			}
		}
	},
	loginToServer : function(method,fileName){	
		/*Login to server app.xixo.vn and save rule to 1 file, function to 1 file*/
		var inputFileName = $(".modal-body .fileName").val();
		//set parameters for save file:
		var folderName = "selectorProject";
		var jsFileName = String.format("{0}.js",inputFileName);
		var jsContent = this.generateCode("saveToServer");
		var textFileName = String.format("{0}.txt",inputFileName);
		var textContent = $("#forumdata").val();
		var json_object = {"method":"login","user":"1",'pwd':"1","0":"js"};
		$.ajax({
	        url: "http://app.xixo.vn/api/uploads/index.php",
	        data: json_object,
	        dataType: 'json',
	        type: 'POST',
	        success: function(json_object) {
	            var session_id = json_object.data.session_id;
	       		console.log("Method : " + method);
	            if( method == "write"){
	            	projectManagerModel.writeFileToServer(folderName,jsFileName,jsContent,session_id);
	            	projectManagerModel.writeFileToServer(folderName,textFileName,textContent,session_id);
	            }
	            if( method == "read"){
	            	projectManagerModel.readFileFromServer(folderName,fileName,session_id);
	            }
	           	
	        },
	        error: function(json_object) {
	            console.log(json_object);
	        }
	    });
		this.closeDialogBox();
	},
	readFileFromServer : function(nameFolder,nameFile,session_id){
		var json_object = {"method":"read","session_id":session_id, "path": String.format('//{0}/{1}',nameFolder,nameFile)};
		$.ajax({
	        url: "http://app.xixo.vn/api/uploads/readfile.php",
	        data: json_object,
	        dataType: 'json',
	        type: 'POST',
	        success: function(json_object) {
	            console.log(json_object); 
	            console.log(String.format("read file: {0} ok!", nameFile));	
	            projectManagerModel.renderProject(json_object.data);
	        },
	        error: function(json_object) {
	            console.log(json_object);
	        }
	    });
	},
	writeFileToServer : function(nameFolder,nameFile,content,session_id){
		var json_object = {"method":"write","session_id":session_id, "path": String.format('//{0}/{1}',nameFolder,nameFile),"content":content};
		$.ajax({
	        url: "http://app.xixo.vn/api/uploads/index.php",
	        data: json_object,
	        dataType: 'json',
	        type: 'POST',
	        success: function(json_object) {
	            console.log(json_object); 
	            console.log(String.format("Save file: {0}", nameFile));	
	        },
	        error: function(json_object) {
	            console.log(json_object);
	        }
	    });
	},
	listFileToServer : function(nameFolder,session_id){
		var urlString = String.format('http://app.xixo.vn/api/uploads/?method=list&session_id={0}&path={1}&o=js',session_id,nameFolder);
		$.getScript(urlString).done(function(script, textStatus) {							
			
		});
	},
	deleteFileToServer : function(nameFolder,nameFile,session_id){
		var urlString = String.format('http://app.xixo.vn/api/uploads/?method=del&session_id={0}&path={1}/{2}&o=js',session_id,nameFolder,nameFile);
		$.getScript(urlString).done(function(script, textStatus) {							
			
		});
	},
	// lấy element parent
	arrowup: function(pathCssFull){
		console.log('arrow up');
		// Thực hiện sau khi đã chọn element
		if(typeof arrClickElements == 'object' && arrClickElements.length > 0){
			pathCssFullEnd = arrClickElements[arrClickElements.length - 1]; //pathCssFull sau cùng
			// Xóa tất cả class sg_suggested, vùng màu vàng
			this.sendDataToLocalStorage("_callWebviewFunction",null,"unHightLight");
			if(pathCssFullEnd.length > 1){		
				/* - khi có trên 2 element đã được chọn
				 * - Kiểm tra element hiện tại, có trùng với element nào đã được chọn hay không
				 * - Nếu không, bỏ vùng chọn. Nếu có, giữ vùng chọn
				 */
				duplicate = 0;
				if(arrClickElements.length > 1){
					for(var i = 0; i < arrClickElements.length - 1; i++){
						if(createFullPath(arrClickElements[i]) == createFullPath(pathCssFullEnd)){
							console.log('trùng');
							duplicate = 1;
							break;
						}
					}
				}
				if(duplicate == 0){
					this.sendDataToLocalStorage("_callWebviewFunction",null,"unHightLight");
				}
				
				pathCssFullParent = this.getPathCssFullParent(pathCssFullEnd); // Lấy element parent
				this.sendDataToLocalStorage("_callWebviewFunction","#info-selected","removeCsspath");
				this.createLableInFoElement(pathCssFullEnd, pathCssFullParent); // Gắn nhãn hiển thị tên thẻ đang chọn
				arrClickElements[arrClickElements.length - 1] = pathCssFullParent; // Cập nhật lại pathCss sau cùng 
				
				callBackDefaultSelector(arrClickElements);// tô màu lại các vùng có thể lấy và hiển thị lại các giá trị 
				
			}else{
				alert('Vùng chọn lớn nhất (sau <body>)');
			}
		}else{
			alert('Vui lòng chọn element!');
		}
		
	},
	// lấy element children
	arrowdown: function() {
		console.log('arrow down');
		if(typeof arrClickElements == 'object' && arrClickElements.length > 0){
			pathCssFullEnd = arrClickElements[arrClickElements.length - 1]; //pathCssFull sau cùng
			this.sendDataToLocalStorage("_callWebviewFunction","#info-selected","removeCsspath");
			pathCssFullChildren = this.getPathCssFullChildren(pathCssFullEnd); // Lấy element parent
			if(typeof pathCssFullChildren == 'object'){
				this.sendDataToLocalStorage("_callWebviewFunction",null,"unHightLight");
				arrClickElements[arrClickElements.length - 1] = pathCssFullChildren; // Cập nhật lại phần tử cuối của arrayClicks
				
				// Nếu Children đã được chọn, đánh dấu 			
		  		callBackDefaultSelector(arrClickElements);// tô màu lại các vùng có thể lấy và hiển thị lại các giá trị
				this.createLableInFoElement(pathCssFullEnd, pathCssFullChildren);// Gắn nhãn hiển thị tên thẻ đang chọn		
				
			}else{
				this.createLableInFoElement(this.getPathCssFullParent(pathCssFullEnd), pathCssFullEnd);// Gắn nhãn hiển thị tên thẻ đang chọn
				alert('Vùng chọn đã nhỏ nhấtS!');
			}
		}else{
			alert('Vui lòng chọn element');
		}
	},
	//siblings prev
	arrowleft: function(){
		console.log('arrow left');
		if(typeof arrClickElements == 'object' && arrClickElements.length > 0){
			pathCssFullEnd = arrClickElements[arrClickElements.length - 1]; //pathCssFull sau cùng
			var s = this.get('dataUrl').replace(/src/g,'data-src');
			var tmp = document.createElement('div');
			tmp.innerHTML = s;
			var currentElement = $(tmp).find(createFullPath(pathCssFullEnd))[0];
			siblingsPrev = $(currentElement).prev();
			this.siblings(pathCssFullEnd, siblingsPrev, -1);
		}else{
			alert('Vui lòng chọn element');
		}
	},
	//siblings next
	arrowright: function(){
		console.log('arrow left');
		if(typeof arrClickElements == 'object' && arrClickElements.length > 0){
			pathCssFullEnd = arrClickElements[arrClickElements.length - 1]; //pathCssFull sau cùng
			
			var s = this.get('dataUrl').replace(/src/g,'data-src');
			var tmp = document.createElement('div');
			tmp.innerHTML = s;
			var currentElement = $(tmp).find(createFullPath(pathCssFullEnd))[0];
			siblingsNext = $(currentElement).next();
			this.siblings(pathCssFullEnd, siblingsNext, 1);
			
		}else{
			alert('Vui lòng chọn element');
		}
	},
	// Lấy element parent
	getPathCssFullParent: function(selectorCurrent){
		var pathCssFullParent = [];
		for(i = 1; i < selectorCurrent.length; i++){
			pathCssFullParent[i-1] = selectorCurrent[i];
		}
		return pathCssFullParent;
	},
	// Lấy element children
	getPathCssFullChildren: function(selectorCurrent){
		var s = this.get('dataUrl').replace(/src/g,'data-src');
		var tmp = document.createElement('div');
		tmp.innerHTML = s;
		var currentElement = $(tmp).find(createFullPath(selectorCurrent))[0];
		var listChildElements = $(currentElement).children();
		pathCssFullChildren = '';
		if(listChildElements.length > 0){ // Nếu có element children
			specialAttr = []; // Các attribute
			classList = ''; // các class của element
			selectorNodesChildren = {};// nodes children
			if(listChildElements[0].classList.length > 0){
				classList = listChildElements[0].className.split(' ');
				//class sg_selected, sg_suggested luôn biến đổi, nên loại bỏ
				for(var i in classList){
					if(classList[i] == 'sg_selected' || classList[i] == 'sg_suggested'){
						classList.splice(i, 1);
					}
				}
			}			
			selectorNodesChildren = {
				'className' : classList,
				'id': listChildElements[0].id,
				'nthOfType': listChildElements[0].nodeType,
				'specialAttr': specialAttr,
				'tagName': listChildElements[0].localName,
			};
			var pathCssFullChildren = [];
			pathCssFullChildren.push(selectorNodesChildren);
			for(var i in selectorCurrent){
				pathCssFullChildren.push(selectorCurrent[i]);
			}			
		}
		return pathCssFullChildren;
	},
	// Lấy element siblings
	getNodesArraySiblings: function(selectorCurrent, node, noteType) {
		specialAttr = []; // Các attribute
		classList = ''; // các class của element
		selectorNodesSiblings = {};// nodes children
		pathCssFullSiblings = '';
		
		if(node[0].classList.length > 0){
			classList = node[0].className.split(' ');
			//class sg_selected, sg_suggested luôn biến đổi, nên loại bỏ
			for(var i in classList){
				if(classList[i] == 'sg_selected' || classList[i] == 'sg_suggested'){
					classList.splice(i, 1);
				}
			}
		}		
		nodeType = parseInt(selectorCurrent[0]['nthOfType']) + noteType; // nodeType hiện tại giảm 1
		selectorNodesSiblings = {
			'className' : classList,
			'id': node[0].id,
			'nthOfType': nodeType.toString(),
			'specialAttr': specialAttr,
			'tagName': node[0].localName,
		};
		var pathCssFullSiblings = [];
		pathCssFullSiblings.push(selectorNodesSiblings);
		for(var i = 1 ; i < selectorCurrent.length; i++){
			pathCssFullSiblings.push(selectorCurrent[i]);
		}
		return pathCssFullSiblings;
	},
	// Xử lý siblings
	siblings:function(pathCssFullEnd, siblings, nodeType) {
		if(siblings.length > 0){
			pathCssFullSiblings = this.getNodesArraySiblings(pathCssFullEnd, siblings, nodeType);
			try{
				// Nếu Siblings prev đã được chọn, đánh dấu 
				this.sendDataToLocalStorage("_callWebviewFunction",null,"unHightLight");
				arrClickElements[arrClickElements.length - 1] = pathCssFullSiblings; // Cập nhật lại phần tử cuối của arrayClicks		
				this.sendDataToLocalStorage("_callWebviewFunction","#info-selected","removeCsspath");
				this.createLableInFoElement(this.getPathCssFullParent(pathCssFullSiblings), pathCssFullSiblings);// Gắn nhãn hiển thị tên thẻ đang chọn
				callBackDefaultSelector(arrClickElements);// tô màu lại các vùng có thể lấy và hiển thị lại các giá trị
			}catch(err){
				console.log('đã có lỗi:');
				console.log(err);
			}
		}else{
			alert('Không còn element đồng cấp');
		}
	},
	// Tạo thẻ thông tin element đang chọn
	createLableInFoElement: function(pathCssFullParent, pathCssFullChildren) {
		if(pathCssFullParent.length > 2){
			text = pathCssFullChildren[1]['tagName'] + '>' + pathCssFullChildren[0]['tagName'];
		}else{
			text = 'body' + '>' + pathCssFullParent[0]['tagName'];
		}
		var data = { 
			parent : createFullPath(pathCssFullParent),
			child : createFullPath(pathCssFullChildren),
			text : text,
			};
		this.sendDataToLocalStorage("_callWebviewFunction",data,"setPositionCsspath");
	},
	guessProcess : function(){
		//athere
		console.log("in guessProcess()")
		/*get object of selected Field and remove all children of it*/
		var ruleList =  this.get('ruleList');
		var fieldlistData = ruleList[Number(this.get('ruleCheck'))].fieldlistData;
		var presentOfField = fieldlistData[Number(this.get('presentNodeIndex'))];
		if( presentOfField.parentName.trim() != ''){
			alert("Field bạn chọn không thể guess!");
			return false;
		}
		fieldlistData.splice(fieldlistData.length-1, 1);
		for( var i in fieldlistData){
			if( fieldlistData[i].parentName == presentOfField.name){
				fieldlistData.splice(i, 1);
			}
		}
		var s = this.get('dataUrl').replace(/src/g,'data-src');
		var tmp = document.createElement('div');
		tmp.innerHTML = s;
		var firstGenElement = $(tmp).find(presentOfField.path)[0];
		/*check conditions to guess*/
		
		/*check .title*/
		var title = $(firstGenElement).find(".title");
		if( title.length == 1){
			fieldlistData = this.addGuessNode("title",fieldlistData,presentOfField,title[0]);
		}
		/*add empty Field*/
		fieldlistData.push({parentName : '',name : "",path : "  ",number : "0",attr : "",attrStyle : "", arrClickElements : ''});
		ruleList[Number(this.get('ruleCheck'))].fieldlistData = fieldlistData;
		this.set({"ruleList":ruleList});
		this.renderTreetable();
		//{parentName : '',name : "",path : "  ",number : "0",attr : "",attrStyle : "", arrClickElements : ''},
		
	},
	addGuessNode : function(type,fieldlistData,presentOfField,elementOftype){
		var arrNodeOfPresent = generateArrClickElements(presentOfField.arrClickElements);
		var arrNodeOfChild = createArrayCssPathFromElement(elementOftype,null);
		var numberChildPath = arrNodeOfChild.length - arrNodeOfPresent.length + 3;
		var arrNew = [];
		for( var i=0; i < numberChildPath ; i++){
			arrNew.push(arrNodeOfChild[i]);
		}
		var childCssPath = createFullPath(arrNew);
		var fullCssPath = String.format("{0} > {1}",presentOfField.path,childCssPath);
		var temp = {};
		var arr = []; arr.push(arrNodeOfChild);
		temp["parentName"] =  presentOfField.name;
		temp["name"] = String.format("{0}.title",presentOfField.name);
		temp["path"] = fullCssPath;
		temp["number"] = countElements(fullCssPath);
		temp["attr"] = "innerText";
		temp["attrStyle"] = "";
		temp["arrClickElements"] = arr;
		fieldlistData.push(temp);
		return fieldlistData;
	}
});
/*********************************/
function processElement(elem, csspath, attr, attrStyle) {
	var result = elem;
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
function processElementForEcommerce(elem, csspath, attr, attrStyle) {
	var result = $(elem).next()[0];
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
	//var result = elem.querySelector(csspath);
	var result = elem;
	var data = null;
	data = result.getAttribute(attrStyle);
	/*recursive children - 3 level*/
	if( data == null){
		var childList = $(result).children();
		for( var i=0; i < childList.length; i++){
			data = childList[i].getAttribute(attrStyle);
			if(data != null) return data;
			var childList2 = $(childList[i]).children();
			for( var j=0; j < childList2.length; j++){
				data = childList2[j].getAttribute(attrStyle);
				if(data != null) return data;
				var childList3 = $(childList2[j]).children();
				for( var f=0; f < childList3.length; f++){
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
	/*case: link at elem*/
	if( data == null) data = elem.getAttribute(attrStyle);
	if( attrStyle == "href"){
		return absoluteToHref(data);
	}else{
		return data;
	}
}
function absoluteToHref(href){
	baseUrl = projectManagerModel.get('baseUrl');
	if(baseUrl == null){
		baseUrl = projectManagerModel.get('insUrl');
		href = URI(href).clone().authority("").absoluteTo(baseUrl);
	}
	return href._string;
}
function testdata(){
}
