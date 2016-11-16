var ProjectManagerModel = Backbone.Model.extend({
	defaults : {
		insUrl : '',
		dataUrl : '',
		projectCheck : 'defaultSelector',
		webviewCheck : '0',
		webviewNum : 3,
	},
	initialize : function(){
		console.log("New ProjectManagerModel");
		this.setNodataForWebview();
		this.on('change:insUrl',function(){
			$('.inputUrl').val(this.get('insUrl'));
		});	
		this.on('change:projectCheck',function(){
			console.log(this.get('projectCheck'));
		});
		this.on('change:webviewCheck',function(){
			gerneralCssPathModel.updateDataWithNewWebview();
			fieldListModel.updateDataWithNewWebview();
		});
	},
	changeProjectCheck : function(projectType){
		this.set({'projectCheck':projectType});
	},
	setNodataForWebview : function(){
		setTimeout(function(){
			for(var i=0; i<projectManagerModel.get('webviewNum') ; i ++){
				top.frames['web1'].$(String.format("#iframe{0}",i))[0].contentWindow.$('body h2').text('No Data.');
			}
		},500);
	},
	inspectUrl : function(url) {
		if(this.get('projectCheck') == 'secondSelector'){
			fieldListModel = new FieldListModel();
			this.set({'projectCheck':'defaultSelector'});
		}
		if(this.get('projectCheck') == 'defaultSelector'){
			this.initHometag();
			if (url == ''){
				url = 'http://kinhdoanh.vnexpress.net/';
				//url = 'http://nanapi.jp/wedding';
				//url = 'http://mainichi.jp/select/seiji/';
				//url = 'http://aiti.edu.vn/category/tin-tuc-su-kien/tin-khoa-hoc-cong-nghe/';
				//url = 'http://www.5giay.vn'
				//url = 'http://lenta.ru';
				//url = 'http://www.binhduong.gov.vn/vn/index.php';						
			}
			var baseUrl = url;
			this.set({'insUrl': url}) ;
			console.log('inspectUrl: ' + url);
			// Dùng proxy để lấy html của url cần phân tích
			// Phải có để frame gọi lại trang web và gán script selectorTool lại
			top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.location = 'webview.html';
			url = 'http://data.metit.vn/extra/proxy.php?o=js&url=' + url;
			setTimeout(function(){
				var htmlStr = getRemoteUrl(baseUrl,false);
				while (htmlStr.indexOf("<script") > 0) {
					var temp = htmlStr.slice(htmlStr.indexOf("<script"), htmlStr.indexOf("</script>") + 9);
					htmlStr = htmlStr.replace(temp, " ");
				}	
				top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck'))).contents().find("head").prepend('<base id="baseId" href="' + baseUrl + '">');		
				try {				
					top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck'))).contents().find('body').html('<div id="topdiv"></div>');
					top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck'))).contents().find('#topdiv').html(htmlStr);
				} catch(e) {
				};
				top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.initSelector();
				top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.webview.disableTagA();
				/*update dataUrl of top.frames['web1']*/
				top.frames['web1'].webviewList.updateDataWebview(htmlStr,baseUrl);
			},500);
			
			
			// $.getScript(url, function(d, textStatus, jqxhr) {
			// }).done(function() {
				// var htmlStr = data['DATA'];
				// //xóa các script bên trong html
				// while (htmlStr.indexOf("<script") > 0) {
					// var temp = htmlStr.slice(htmlStr.indexOf("<script"), htmlStr.indexOf("</script>") + 9);
					// htmlStr = htmlStr.replace(temp, " ");
				// }	
				// top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck'))).contents().find("head").prepend('<base id="baseId" href="' + baseUrl + '">');		
				// try {				
					// top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck'))).contents().find('body').html('<div id="topdiv"></div>');
					// top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck'))).contents().find('#topdiv').html(htmlStr);
				// } catch(e) {
				// };
				// top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.initSelector();
				// top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.webview.disableTagA();
				// /*update dataUrl of top.frames['web1']*/
				// top.frames['web1'].webviewList.updateDataWebview(htmlStr,baseUrl);
			// });
		}
		
	},
	initHometag : function(){
		console.log("in ProjectManagerModel.initHometag()")
		this.requireUnHightLight();
		arrClicks = [];
		gerneralCssPathModel = new GerneralCssPathModel();
		if(this.get('projectCheck') == 'defaultSelector'){
			$("#tableTab").text("No Data");
			$("#lineTableTab").text("No Data");
		}
	},
	requireUnHightLight : function(){	
		for(var i=0; i<this.get('webviewNum') ; i ++){
			top.frames['web1'].$(String.format("#iframe{0}",i))[0].contentWindow.webview.unHightLight();
		}
	},
	requireHightLight : function(csspath){
		console.log("ProjectManagerModel.requireHightLight()");
		if( csspath != ''){
			for(var i=0; i<this.get('webviewNum') ; i ++){
				top.frames['web1'].$(String.format("#iframe{0}",i))[0].contentWindow.webview.unHightLight();
				top.frames['web1'].$(String.format("#iframe{0}",i))[0].contentWindow.webview.hightLightALL(csspath);
			}
		}else{
			csspath = $(".inputCssSelector").val();
			if( csspath != ''){
				for(var i=0; i<this.get('webviewNum') ; i ++){
					top.frames['web1'].$(String.format("#iframe{0}",i))[0].contentWindow.webview.hightLightALL(csspath);
				}
			}else{
				console.log('Chưa có cssPath !');
			}	
		}	
	},
	requireHightLightGenCssPath : function(csspath){
		if( csspath == null){
			csspath = $(".inputCssSelector").val();
		}
		if( csspath != ''){
			for(var i=0; i<this.get('webviewNum') ; i ++){
				top.frames['web1'].$(String.format("#iframe{0}",i))[0].contentWindow.webview.hightLightGenCssPath(csspath);
			}
		}else{
			console.log(' Chưa có cssPath ! ');
		}	
	},
	saveProject : function(){
		if( gerneralCssPathModel.get('arrClickElements') == '' ){
			reportError(".divGetUrl","Chưa có dữ liệu !");
			return;
		}
		//Show dialog box:
		this.showDialogBox();
		var websiteUrl = this.get('insUrl');
		$(".modal .modal-body").html('<textarea id="forumdata" rows="5" style="width:100%"></textarea>');
		//Kiểm tra Level Selector 1:
		if( this.get('projectCheck') == 'defaultSelector'){
			var arr = {
				status : this.get('projectCheck'),
				websiteUrl : websiteUrl,
				generateCssPath : gerneralCssPathModel.get('generateCssPath'),
				arrClickElements : gerneralCssPathModel.get('arrClickElements'),
			};
			var content = JSON.stringify(arr);
			$(".modal-title").text("Lv1 Project Data");
			$("#submitDialog").css("display","none");	
		}
		//Kiểm tra Level Selector 2:
		if( this.get('projectCheck') == 'secondSelector'){
			var arr = {
				status : this.get('projectCheck'),
				websiteUrl : websiteUrl,
				generateCssPath : fieldListModel.get("parentCssPath"),
				arrClickElements : fieldListModel.get('parentResult').arrClickElements,
				fieldlistData : fieldListModel.get("fieldlistData"),
			};
			var content = JSON.stringify(arr);
			$(".modal-title").text("Lv2 Project Data");
			$("#submitDialog").text("Save to Server");	
			$("#submitDialog").attr('onclick','projectManagerModel.loginToServer()');
			$(".modal-body").append('<label style="width:24%">File Name: </label><input style="width:75%" class="fileName"></input>');
		}
		$("#forumdata").val(content);
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
	initFieldlist :function (){	
		console.log("in ProjectManagerModel.initFieldlist()");	
		//Nếu hiện tại đang ở level2:
		if( this.get('projectCheck') == 'secondSelector'){
			return true;
		}
		//Nếu đã thực hiện 2 lần select:
		if( this.get('projectCheck') == 'defaultSelector'){
			if( arrClicks.length <= 1){
				reportError(".divGetUrl", "Chọn thêm 1 phần tử !");
				return false;		
			}else{
				this.set({'projectCheck': 'secondSelector'});
			}
		}
		var cssPath = $(".default-rule input").val();
		if (cssPath == "") {
			//reportError(".divGetUrl", "Parent Csspath chưa có !");
			return false;
		} else {
			var elementFirst = String.format("{0}:eq(1)", gerneralCssPathModel.get('generateCssPath'));
			try {
				for(var i=0; i<this.get('webviewNum') ; i ++){
					top.frames['web1'].$(String.format("#iframe{0}",i))[0].contentWindow.$(elementFirst).parent().append("<div class='overdiv' style='width:100%; height:100%; background:#006D91; position:fixed; top:0;left:0; opacity: 0.4; z-index:10'></div>");
				}
			} catch(e) {
				reportError(".divGetUrl", "CssPath bạn vừa nhập không tìm thấy Element!");
				return false; 
			}
			for(var i=0; i<this.get('webviewNum') ; i ++){
				top.frames['web1'].$(String.format("#iframe{0}",i))[0].contentWindow.$(cssPath).each(function() {
					$(this).addClass("secondselected");
				});	
			}
			//begin level 2
			var timeindex = new Date();
			fieldListModel.set({'timeindex': timeindex.getTime()});	
			fieldListModel.choiceTitle(0);
			this.initHometag();
		}
		return true;
	},
	// changeProject : function(nameProject){
    	// if(nameProject == "default" ){
			// console.log("Now, You at default Project")
			// $("#project-01").css("display","block");
			// $("#project-02").css("display","none");
			// $("#project-03").css("display","none");
			// this.initHometag();
			// top.frames['web1'].$(String.format("#iframe{0}",this.get('webviewCheck')))[0].contentWindow.window.location = 'content.html';
			// setTimeout(function(){
				// top.frames['web1'].$(String.format("#iframe{0}",this.get('webviewCheck')))[0].contentWindow.$('body h2').text('No Data.');
			// },500);
			// this.set({'projectCheck':'defaultSelector'});		
		// }
		// if(nameProject == "menuSelector" ){
			// console.log("Now, You at menu Project")
			// $("#project-01").css("display","none");
			// $("#project-02").css("display","block");
			// $("#project-03").css("display","none");
			// this.initHometag();
			// top.frames['web1'].$(String.format("#iframe{0}",this.get('webviewCheck')))[0].contentWindow.window.location = 'content.html';
			// setTimeout(function(){
				// top.frames['web1'].$(String.format("#iframe{0}",this.get('webviewCheck')))[0].contentWindow.$('body h2').text('No Data.');
			// },500);
			// this.set({'projectCheck':'menuSelector'});
		// }
		// if(nameProject == "detailSelector" ){
			// console.log("Now, You at detail Project")
			// $("#project-01").css("display","none");
			// $("#project-02").css("display","none");
			// $("#project-03").css("display","block");
			// this.initHometag();
			// top.frames['web1'].$(String.format("#iframe{0}",this.get('webviewCheck')))[0].contentWindow.window.location = 'content.html';
			// setTimeout(function(){
				// top.frames['web1'].$(String.format("#iframe{0}",this.get('webviewCheck')))[0].contentWindow.$('body h2').text('No Data.');
			// },500);
			// this.set({'projectCheck':'detailSelector'});
		// }	
	// },
	openDialogProject : function() {		
		console.log('in ProjectManagerModel.openDialogSelector');
		this.showDialogBox();
		$(".modal-title").text("Open Project");
		$(".modal-body").html('<textarea class="inputProject" rows="5" style="width:100%"></textarea>');
		$("#submitDialog").attr("onclick","projectManagerModel.loadListProject()");
	},
	loadDefault : function() {
		var url = "../data/project1.txt";
		$.get(url, function(data) {
			this.renderProject(data);			
		});
	},
	loadListProject : function (){
		var data = $("#dialogDiv .inputProject").val().trim();				
		try{
			this.renderProject(data);
			$(".modal").css("display", "none");
		}catch(e){
			reportError('.divGetUrl','Dữ liệu không đúng!');
		}		
	},
	doIfWebviewReady : function(){
		var interval = setInterval(function() {
			try{
				if (top.frames['web1'].$(String.format("#iframe{0}",this.get('webviewCheck')))[0].contentWindow.webview.get('checkFinish') != undefined && top.frames['web1'].$(String.format("#iframe{0}",this.get('webviewCheck')))[0].contentWindow.webview.get('checkFinish') != '') {
					if( fieldListModel.get('parentResult') == ''){
						projectManagerModel.requireHightLight(gerneralCssPathModel.get('generateCssPath'));
					}else{
						projectManagerModel.initFieldlist();
						fieldListModel.getCode();
					}					
					clearInterval(interval);			
				}
			}catch(e){
				console.log(e);
			}
		}, 50);
	},
	renderProject :function (data){				
		data = JSON.parse(data);
		if( data.status == 'defaultSelector'){
			if( data.generateCssPath != '' ){
				this.inspectUrl();
				gerneralCssPathModel.set({'arrClickElements':data.arrClickElements});
				var timeindex = new Date();
				gerneralCssPathModel.set({'timeindex': timeindex.getTime()});
				this.set({'insUrl':data.websiteUrl});
				$(".default-rule input").val(data.generateCssPath);
				$(".default-itemCount").text(gerneralCssPathModel.get('elementNumber'));
				this.doIfWebviewReady();
			}else{
				console.log("Dữ liệu nhập vào ko đúng!");
				return 0;
			}
		}	
		if( data.status == 'secondSelector'){
			if( data.generateCssPath != '' ){
				this.inspectUrl();	
				gerneralCssPathModel.set({'arrClickElements':data.arrClickElements});
				var timeindex = new Date();
				gerneralCssPathModel.set({'timeindex': timeindex.getTime()});
				this.set({'insUrl':data.websiteUrl});
				$(".default-rule input").val(data.generateCssPath);
				$(".default-itemCount").text(gerneralCssPathModel.get('elementNumber'));				
				
			}else{
				console.log("Dữ liệu nhập vào ko đúng!");
				return 0;
			}			
			fieldListModel.set({'parentResult':gerneralCssPathModel.toJSON()});
			fieldListModel.set({'parentCssPath':gerneralCssPathModel.get('generateCssPath')});
			fieldListModel.set({'elementNum':gerneralCssPathModel.get('elementNumber')});
			fieldListModel.set({'fieldlistData':data.fieldlistData});
			this.doIfWebviewReady();			
		}	
	},
	initValidate : function(){	
		if( this.get('projectCheck') == 'secondSelector'){
			var arr = {
				status : this.get('projectCheck'),
				websiteUrl : this.get('insUrl'),
				fieldListModel : fieldListModel,
			};
			var content = JSON.stringify(arr);
			$(".modal-title").text("Lv2 Project Data");
			//open validate Window:
			validateWindow = window.open('validate-web.html', 'nameValidateWindow');	
			setTimeout(function(){
				localStorage.setItem('validateData',content);		
			},500);		
			try{
				validateWindow.focus();
			}catch(e){
				console.log('Eror : not focus window !');
			}
			return true;
		}
		//Defaul event:
		reportError(".divGetUrl","Chưa có dữ liệu !");
		return false;
	},
	showHideMenu : function(){
		console.log($('#showHideBt p').text())
		if( $('#showHideBt p').text().trim() == 'Hide'){
			top.document.getElementById("main-frameset").cols="5%,95%";
			$('.buttonGlobal').css('display','none');
			$('.divGetUrl').css('display','none');		
			$("#project-global").css('display','none');
			$("#tabDiv").css('display','none');			
			$('#showHideBt').css('display','block');
			$('#showHideBt p').text("Show");
		}else{
			if( $('#showHideBt p').text().trim() == 'Show'){
				top.document.getElementById("main-frameset").cols="30%,70%";
				$('.buttonGlobal').css('display','block');
				$('.divGetUrl').css('display','block');	
				$("#project-global").css('display','block');	
				$("#tabDiv").css('display','block');	
				$('#showHideBt p').text("Hide");
			}
		}
		
	},
	loginToServer : function(){	
		var urlString = "http://app.xixo.vn/api/uploads/?method=login&user=1&pwd=1&o=js";	
		var inputFileName = $(".modal-body .fileName").val();
		//set parameters for save file:
		var folderName = "selectorProject";
		var jsFileName = String.format("{0}.js",inputFileName);
		var jsContent = fieldListModel.generateCode("save");
		var textFileName = String.format("{0}.txt",inputFileName);
		var textContent = $("#forumdata").val();
		console.log(String.format("Save file: {0}, {1}",jsFileName,textFileName));
		$.getScript(urlString).done(function(script, textStatus) {											
			var session_id = _result.data.session_id;
			projectManagerModel.writeFileToServer(folderName,jsFileName,jsContent,session_id);	
			projectManagerModel.writeFileToServer(folderName,textFileName,textContent,session_id);	
		});			
		this.closeDialogBox();
	},
	writeFileToServer : function(nameFolder,nameFile,content,session_id){
		//var urlString = String.format('http://app.xixo.vn/api/uploads/?path=//selectorProject/tuan.txt&content=tuantest&session_id=49ke1e86au6l6m8m36pf5304r1&o=js');
		var urlString = String.format("http://app.xixo.vn/api/uploads/?path=//{0}/{1}&content={2}&session_id={3}&o=js",nameFolder,nameFile,escape(content),session_id);
		$.getScript(urlString).done(function(script, textStatus) {							
			console.log(_result)
		});
	},
	listFileToServer : function(nameFolder,session_id){
		var urlString = String.format('http://app.xixo.vn/api/uploads/?method=list&session_id={0}&path={1}&o=js',session_id,nameFolder);
		$.getScript(urlString).done(function(script, textStatus) {							
			console.log(_result)
		});
	},
	deleteFileToServer : function(nameFolder,nameFile,session_id){
		var urlString = String.format('http://app.xixo.vn/api/uploads/?method=del&session_id={0}&path={1}/{2}&o=js',session_id,nameFolder,nameFile);
		$.getScript(urlString).done(function(script, textStatus) {							
			console.log(_result)
		});
	},
	// lấy element parent
	arrowup: function(pathCssFull){
		console.log('arrow up');
		// Thực hiện sau khi đã chọn element
		if(typeof arrClicks == 'object' && arrClicks.length > 0){
			
			pathCssFullEnd = arrClicks[arrClicks.length - 1]; //pathCssFull sau cùng
			// Xóa tất cả class sg_suggested, vùng màu vàng
			top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$('.sg_suggested').each(function(){
	  			$(this).removeClass("sg_suggested");
	  		});
			if(pathCssFullEnd['arraySelector'].length > 1){
				
				/* - khi có trên 2 element đã được chọn
				 * - Kiểm tra element hiện tại, có trùng với element nào đã được chọn hay không
				 * - Nếu không, bỏ vùng chọn. Nếu có, giữ vùng chọn
				 */
				duplicate = 0;
				if(arrClicks.length > 1){
					for(var i = 0; i < arrClicks.length - 1; i++){
						if(arrClicks[i]['pathCssFull'] == pathCssFullEnd['pathCssFull']){
							console.log('trùng');
							duplicate = 1;
							break;
						}
					}
				}
				if(duplicate == 0){
					top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullEnd['pathCssFull']).removeClass('sg_selected'); // Bỏ vùng chọn element hiện tại
				}
				
				pathCssFullParent = this.getPathCssFullParent(pathCssFullEnd); // Lấy element parent
				top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullParent['pathCssFull']).addClass('sg_selected'); // tạo vùng chọn parent
				
				top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$('#info-selected').remove();
				this.createLableInFoElement(pathCssFullEnd, pathCssFullParent); // Gắn nhãn hiển thị tên thẻ đang chọn
				arrClicks[arrClicks.length - 1] = pathCssFullParent; // Cập nhật lại pathCss sau cùng 
				
				callBackDefaultSelector(arrClicks);// tô màu lại các vùng có thể lấy và hiển thị lại các giá trị 
				
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
		if(typeof arrClicks == 'object' && arrClicks.length > 0){
			pathCssFullEnd = arrClicks[arrClicks.length - 1]; //pathCssFull sau cùng
			
			top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullEnd['pathCssFull']).removeClass("sg_selected"); // Bỏ vùng chọn element hiện tại
			top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$('#info-selected').remove(); // Bỏ nhãn hiển thị tên thẻ đang chọn
			
			pathCssFullChildren = this.getPathCssFullChildren(pathCssFullEnd); // Lấy element parent
			if(typeof pathCssFullChildren == 'object'){
				arrClicks[arrClicks.length - 1] = pathCssFullChildren; // Cập nhật lại phần tử cuối của arrayClicks
				
				// Nếu Children đã được chọn, đánh dấu 
				if(top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullChildren['pathCssFull']).hasClass('sg_selected')){
					top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullChildren['pathCssFull']).addClass('duplicate');
				}
				
				top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(arrClicks[arrClicks.length - 1]['pathCssFull']).addClass('sg_selected'); // tạo vùng chọn children
				
				top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$('.sg_suggested').each(function(){
		  			$(this).removeClass("sg_suggested");
		  		});// Xóa tất cả class sg_suggested, vùng màu vàng
		  		
				callBackDefaultSelector(arrClicks);// tô màu lại các vùng có thể lấy và hiển thị lại các giá trị
				this.createLableInFoElement(pathCssFullEnd, pathCssFullChildren);// Gắn nhãn hiển thị tên thẻ đang chọn		
				
			}else{
				this.createLableInFoElement(this.getPathCssFullParent(pathCssFullEnd), pathCssFullEnd);// Gắn nhãn hiển thị tên thẻ đang chọn
				
				top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullEnd['pathCssFull']).addClass('sg_selected'); // tạo vùng chọn children
				alert('Vùng chọn đã nhỏ nhấtS!');
			}
		}else{
			alert('Vui lòng chọn element');
		}
	},
	//siblings prev
	arrowleft: function(){
		console.log('arrow left');
		if(typeof arrClicks == 'object' && arrClicks.length > 0){
			pathCssFullEnd = arrClicks[arrClicks.length - 1]; //pathCssFull sau cùng
			siblingsPrev = top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullEnd['pathCssFull']).prev();
			this.siblings(pathCssFullEnd, siblingsPrev, -1);
		}else{
			alert('Vui lòng chọn element');
		}
	},
	//siblings next
	arrowright: function(){
		console.log('arrow left');
		if(typeof arrClicks == 'object' && arrClicks.length > 0){
			pathCssFullEnd = arrClicks[arrClicks.length - 1]; //pathCssFull sau cùng
			siblingsNext = top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullEnd['pathCssFull']).next();
			this.siblings(pathCssFullEnd, siblingsNext, 1);
			
		}else{
			alert('Vui lòng chọn element');
		}
	},
	// Lấy element parent
	getPathCssFullParent: function(selectorCurrent){
		pathCssFullParent = {
			'arraySelector': [],
			'pathCssFull': '',
		};
		
		for(i = 1; i < selectorCurrent['arraySelector'].length; i++){
			pathCssFullParent['arraySelector'][i-1] = selectorCurrent['arraySelector'][i];
		}
		pathCssFullParent['pathCssFull'] = createFullPath(pathCssFullParent['arraySelector']);
		
		return pathCssFullParent;
	},
	// Lấy element children
	getPathCssFullChildren: function(selectorCurrent){
		listChildElements = top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(selectorCurrent['pathCssFull']).children();
		pathCssFullChildren = '';
		console.log(pathCssFullChildren);
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
				'nthchild': listChildElements[0].nodeType,
				'specialAttr': specialAttr,
				'tagName': listChildElements[0].localName,
			};
			pathCssFullChildren = {};
			pathCssFullChildren['arraySelector'] = [];
			pathCssFullChildren['pathCssFull'] = '';
			pathCssFullChildren['arraySelector'].push(selectorNodesChildren);
			for(var i in selectorCurrent['arraySelector']){
				pathCssFullChildren['arraySelector'].push(selectorCurrent['arraySelector'][i]);
			}		
			pathCssFullChildren['pathCssFull'] = createFullPath(pathCssFullChildren['arraySelector']); // Gắn lại pathCssFull sau khi thêm
			
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
		nodeType = parseInt(selectorCurrent['arraySelector'][0]['nthchild']) + noteType; // nodeType hiện tại giảm 1
		selectorNodesSiblings = {
			'className' : classList,
			'id': node[0].id,
			'nthchild': nodeType.toString(),
			'specialAttr': specialAttr,
			'tagName': node[0].localName,
		};
		
		pathCssFullSiblings = {};
		pathCssFullSiblings['arraySelector'] = [];
		pathCssFullSiblings['pathCssFull'] = '';
		
		pathCssFullSiblings['arraySelector'].push(selectorNodesSiblings);
		for(var i = 1 ; i < selectorCurrent['arraySelector'].length; i++){
			pathCssFullSiblings['arraySelector'].push(selectorCurrent['arraySelector'][i]);
		}
		pathCssFullSiblings['pathCssFull'] = createFullPath(pathCssFullSiblings['arraySelector']); // Gắn lại pathCssFull sau khi thêm
		return pathCssFullSiblings;
	},
	// Xử lý siblings
	siblings:function(pathCssFullEnd, siblings, nodeType) {
		if(siblings.length > 0){
			pathCssFullSiblings = this.getNodesArraySiblings(pathCssFullEnd, siblings, nodeType);
			try{
				
				// Nếu Siblings prev đã được chọn, đánh dấu 
				if(top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullSiblings['pathCssFull']).hasClass('sg_selected')){
					top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullSiblings['pathCssFull']).addClass('duplicate');
				}			
				// Nếu element đang chọn, đã được đánh dấu, không bỏ chọn element này
				if(top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullEnd['pathCssFull']).hasClass('duplicate')){
					top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullEnd['pathCssFull']).removeClass('duplicate');
				}else{
					top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullEnd['pathCssFull']).removeClass('sg_selected'); // Bỏ vùng chọn element hiện tại
				}
				
				arrClicks[arrClicks.length - 1] = pathCssFullSiblings; // Cập nhật lại phần tử cuối của arrayClicks		
				top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$('#info-selected').remove(); // Bỏ nhãn hiển thị tên thẻ đang chọn
				top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$('.sg_suggested').each(function(){
		  			$(this).removeClass("sg_suggested");
		  		});// Xóa tất cả class sg_suggested, vùng màu vàng
				
				top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(arrClicks[arrClicks.length - 1]['pathCssFull']).addClass('sg_selected'); // tạo vùng chọn children
				this.createLableInFoElement(this.getPathCssFullParent(pathCssFullSiblings), pathCssFullSiblings);// Gắn nhãn hiển thị tên thẻ đang chọn
				callBackDefaultSelector(arrClicks);// tô màu lại các vùng có thể lấy và hiển thị lại các giá trị
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
		var element = document.createElement('div');
		element.className = 'info-selected';
		element.id = 'info-selected';
		if(pathCssFullParent['arraySelector'].length > 2){
			text = pathCssFullChildren['arraySelector'][1]['tagName'] + '>' + pathCssFullChildren['arraySelector'][0]['tagName'];
		}else{
			text = 'body' + '>' + pathCssFullParent['arraySelector'][0]['tagName'];
		}
		element.innerHTML = text;
		top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullParent['pathCssFull']).css({'position':'static'});
		top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullChildren['pathCssFull']).css({'position':'relative'});
		top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(pathCssFullChildren['pathCssFull']).prepend(element);
	},
});


/**
 * Load Html thông qua proxy. Kết quả trả vè ở dạng json. Nội dung của json bao gồm:
 * - DATA: html content
 * - ENCODING: encoding của html
 * - ERROR_CODE: http error code. 200 = ok.
 * - ERROR_MSG: thông báo lỗi (nếu có) ở dạng string
 * Reference: http://api.jquery.com/jquery.ajax/
 * @param url
 * @param useCache: cờ báo hiệu cho biết có sử dụng cache hay không. Default là có dùng cache.
 * @returns {*}
 */
function getRemoteUrl(url, useCache) {
    var result = null;
    if (useCache == null) useCache = true;  // Nếu không định nghĩa thì default là có sử dụng cache.
    if (useCache == true) {
        // Thử đọc dữ liệu từ session storage. Nếu có dữ liệu thì trả kết quả về.
        response = sessionStorage.getItem(url);
        // Cache hit
        if (response != null) {
            console.log('getRemoteUrl: cache hit, url=', url);
            result = JSON.parse(response);
            return result;
        }
    }

    // Cache miss
    console.log('getRemoteUrl: loading url=', url);
    $.ajax({
	    url: '../server/getUrlContent.php',
	    type: 'POST',
	    async: false,
	    dataType: 'text',
	    data: {
	        address: url
	    },
	    success: function(response) {
	    	// Lưu dữ liệu trong trường hợp có sử dụng cache
            if (useCache == true) {
                sessionStorage.setItem(url, response);
            }
	       result = response;
	    }
	});
    return result;
}