/**default ProjectManagerModel ready**/
var GerneralCssPathModel = Backbone.Model.extend({
	defaults : {
		timeindex : '',
		arrClickElements : '',
		generateCssPath : '',
		generateArrClickElements : '',
		elementNumber : '',
		attrStyle : 'innerText',
	},
	initialize : function(){
		console.log("Khởi tạo GerneralCssPathModel");
		if(projectManagerModel.get('projectCheck') == 'defaultSelector'){
			$('.default-rule input').val('');
			$('.default-itemCount').text('');
		}	
		this.on('change:timeindex', function(){
			//Node: lưu trên cùng biến sẽ ko dc nhận dạng là change:
			console.log('GerneralCssPathModel change:timeindex');
			this.set({'generateCssPath':createFullPath(this.generateArrClickElements())});		
			this.set({'generateArrClickElements':this.generateArrClickElements()});		
		});
		this.on('change:generateCssPath',function(){
			console.log('GerneralCssPathModel change:generateCssPath');
			this.set({'elementNumber':countElements(this.get('generateCssPath'))});
			if(projectManagerModel.get('projectCheck') == 'defaultSelector'){
				$(".default-rule input").val(this.get('generateCssPath'));	
				this.showDataInTabManual();		
				projectManagerModel.requireHightLightGenCssPath(this.get('generateCssPath'));	
			}
		});
		this.on('change:elementNumber',function(){
			if(projectManagerModel.get('projectCheck') == 'defaultSelector'){
				$('.default-itemCount').text(this.get('elementNumber'));
			}
		});
	},
	generateArrClickElements : function() {
		//console.log("in GerneralCssPathModel.generalElementArr()")
		if( this.get('arrClickElements') == ''){
			return false;
		}else{
			var arrTemp = this.get('arrClickElements');
		}	
		var pathCss = arrTemp[0].pathCssFull;
		var arraySelectorStart = arrTemp[0].arraySelector;
		if (arrTemp.length < 2) {
			return arraySelectorStart;
		} else {
			//cach 2: so sánh đơn giản giữa hai node cùng level vơi nhau, bắt đầu từ node -> html
			for (var i = 1; i < arrTemp.length; i++) {
				var arraySelectorNext = arrTemp[i].arraySelector;
				var arraySelectorRecure = [];
				//kiểm tra để lấy độ dài mảng nhỏ nhất làm điều kiện vòng l
				if (arraySelectorStart.length < arraySelectorNext.length) {
					var length = arraySelectorStart.length;
				} else {
					var length = arraySelectorNext.length;
				}
				//so sánh song song hai node cùng level
				for (var j = 0; j < length; j++) {
					compareNode(arraySelectorStart[j], arraySelectorNext[j], arraySelectorRecure);
				}
				arraySelectorStart = arraySelectorRecure;
			}		
			return arraySelectorStart;
		}
	},

	shortenArrayCssSelector: function({ arrayCssSelector = [], number = 0 } ) {
		const newArr = _.cloneDeep(arrayCssSelector)
		newArr.pop();
		
		if (countElements(createFullPath(newArr)) <= number && !_.isEmpty(newArr)) {
			arrayCssSelector = this.shortenArrayCssSelector({number, arrayCssSelector: newArr});
		}

		console.log('shortenArrayCssSelector', arrayCssSelector, countElements(createFullPath(arrayCssSelector)), createFullPath(newArr))
		return arrayCssSelector
	},

	initSuggestElementArr : function() {
		console.log("in GerneralCssPathModel.initSuggestElementArr()");
		var arrayCssSelector = this.generateArrClickElements();
		var fullPath = createFullPath(arrayCssSelector)
		var number = countElements(fullPath)
		var arrCssPaths = [];
		arrayCssSelector = this.shortenArrayCssSelector({ arrayCssSelector, number })
		initCssSelectorNodeBegin(arrCssPaths, arrayCssSelector);

		for (var i = 1; i < arrayCssSelector.length; i++) {
			var length = arrCssPaths.length;
			if (arrayCssSelector[i].id != "") {
				for (var j = 0; j < length; j++) {
					path = String.format("#{0} {1}", arrayCssSelector[i].id, arrCssPaths[j].pathCss);
					addNumberToArrCssPath(path, arrCssPaths, false);
				}
				arrCssPaths.push({number, pathCss: createFullPath(arrayCssSelector)})
				console.log(arrCssPaths)
				return arrCssPaths;
			}

			//  arrayCssSelector[i].tagName != "div"
			if (arrayCssSelector[i].tagName != "" && arrayCssSelector[i].tagName != "html" && arrayCssSelector[i].tagName != "body") {
				if (arrayCssSelector[i].nthchild != "") {
					for (var j = 0; j < length; j++) {
						path = String.format("{0}:nth-child({1}) {2}", arrayCssSelector[i].tagName, arrayCssSelector[i].nthchild, arrCssPaths[j].pathCss);
						addNumberToArrCssPath(path, arrCssPaths, false);	
						if( arrCssPaths.length == 200){
							arrCssPaths.push({number, pathCss: createFullPath(arrayCssSelector)})
							console.log(arrCssPaths)
							return arrCssPaths;	
						}											
					}
				} else {
					for (var j = 0; j < length; j++) {
						path = String.format("{0} {1}", arrayCssSelector[i].tagName, arrCssPaths[j].pathCss);
						addNumberToArrCssPath(path, arrCssPaths, false);
					}
				}
			}
			if (arrayCssSelector[i].className != "") {
				for (var j = 0; j < arrayCssSelector[i].className.length; j++) {
					for (var g = 0; g < length; g++) {
						path = String.format(".{0} {1}", arrayCssSelector[i].className[j], arrCssPaths[g].pathCss);
						addNumberToArrCssPath(path, arrCssPaths, false);
					}
				}
				//chỉ cho phép lấy class trên 2 node cha:
				// numberParentClass++;
				// if (numberParentClass == 2) {
				// 	return arrCssPaths;
				// }
			}
			if (arrayCssSelector[i].specialAttr.length != 0) {
				for (var j = 0; j < arrayCssSelector[i].specialAttr.length; j++) {
					for (var g = 0; g < length; g++) {
						path = String.format("[{0}={1}] {2}", arrayCssSelector[i].specialAttr[j].nameSpecialAttr, arrayCssSelector[i].specialAttr[j].valueSpecialAttr, arrCssPaths[g].pathCss);
						addNumberToArrCssPath(path, arrCssPaths, false);
					}
				}
			}	
		}
		
		arrCssPaths.push({number, pathCss: createFullPath(arrayCssSelector)})
		console.log(arrCssPaths)
		return arrCssPaths;
	},
	renderCssSelector : function(arrCssPaths) {
		if( this.get('generateCssPath') == ''){
			reportError(".divGetUrl","Chưa có dữ liệu !");
			return false;
		}
		var tmpl_dataSelectors = doT.template($('#tmpl-dataSelectors').html());
		var html_dataSelectors = tmpl_dataSelectors(this.initSuggestElementArr());
		$('.modal-body').html(html_dataSelectors);
		projectManagerModel.showDialogBox();
		$(".modal-title").text("Generate cssPath!");
		$("#submitDialog").css("display","none");
	},
	showDataInTabManual : function(){
		//render tabletab in columnStyle:
		var data = [];
		if( this.get('attrStyle') == 'innerText'){
			top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(this.get('generateCssPath')).each(function(){
				data.push({ data: $(this).text()});				
			});
		}	
		if( this.get('attrStyle') == 'innerHTML'){
			top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(this.get('generateCssPath')).each(function(){
				data.push({ data: $(this).html()});				
			});
		}	
		if( this.get('attrStyle') == 'href'){
			top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(this.get('generateCssPath')).each(function(){
				data.push({ data: $(this).attr('href')});				
			});
		}	
		if( this.get('attrStyle') == 'src'){
			top.frames['web1'].$(String.format("#iframe{0}",projectManagerModel.get('webviewCheck')))[0].contentWindow.$(this.get('generateCssPath')).each(function(){
				data.push({ data: $(this).attr('href')});				
			});
		}	
		var tempData = {
			data : data,
			attrStyle : this.get('attrStyle')
		};
		var tmpl = doT.template($('#tmpl-data-default').html());
		var html = tmpl(tempData);
		$('#tableTab').html(html);
		$('#lineTableTab').html(html);
	},
	openDialogEditDefault :function(){
		projectManagerModel.showDialogBox();
		$("#submitDialog").attr("onclick","gerneralCssPathModel.editDefault()");	
		$(".modal-body").html('<p><label style="width:24%; line-height:40px;">Attr</label><input class="attrDefaul" style="width:75%"></input></p><p style="text-align:right;color:gray; font-size:12px;">innerText, innerHTML, href, src</p>');	
		$('.attrDefaul').val(this.get('attrStyle'));
	},
	editDefault : function(){
		if( $('.attrDefaul').val() != '' && $('.attrDefaul').val() != this.get('attrStyle')){
			this.set({'attrStyle':$('.attrDefaul').val()});
			$('.default-attr').text(this.get('attrStyle'));
		}			
		projectManagerModel.closeDialogBox();
	},
	updateDataWithNewWebview : function(){
		if( this.get('generateCssPath') != ''){
			this.set({'elementNumber':countElements(this.get('generateCssPath'))});
			this.showDataInTabManual();
		}		
	}
});

/*** Cac ham chia nho*****************************/
function initCssSelectorNodeBegin(arrCssPaths, arrayCssSelector) {
	console.log("in initCssSelectorNodeBegin()")
	var path = "";
	for (var i = 0; i < arrayCssSelector.length; i++) {
		if (arrCssPaths.length == 0) {
			if (arrayCssSelector[i].id != "") {
				path = String.format("#{0}", arrayCssSelector[i].id);
				addNumberToArrCssPath(path, arrCssPaths, true);
			}
			if (arrayCssSelector[i].tagName != "") {
				if (arrayCssSelector[i].nthchild != "") {
					path = String.format("{0}:nth-child({1})", arrayCssSelector[i].tagName, arrayCssSelector[i].nthchild);
					addNumberToArrCssPath(path, arrCssPaths, true);
				} else {
					path = String.format("{0}", arrayCssSelector[i].tagName);
					addNumberToArrCssPath(path, arrCssPaths, true);
				}
			}
			if (arrayCssSelector[i].className != "") {
				for (var j = 0; j < arrayCssSelector[i].className.length; j++) {
					path = String.format(".{0}", arrayCssSelector[i].className[j]);
					addNumberToArrCssPath(path, arrCssPaths, true);
				}
			}
			if (arrayCssSelector[i].specialAttr.length != 0) {
				for (var j = 0; j < arrayCssSelector[i].specialAttr.length; j++) {
					path = String.format("[{0}={1}]", arrayCssSelector[i].specialAttr[j].nameSpecialAttr, arrayCssSelector[i].specialAttr[j].valueSpecialAttr);
					addNumberToArrCssPath(path, arrCssPaths, true);
				}
			}
		}
	}
}
function addNumberToArrCssPath(path, arrCssPaths, firstNode) {
	
	var numberElement = countElements(path).toString();
	console.log(path, numberElement)
	if( firstNode == true){
		var temp = {
			number : numberElement,
			pathCss : path,
		};
		arrCssPaths.push(temp);
	}else{
		if(gerneralCssPathModel.get('elementNumber') === Number(numberElement)){
			var temp = {
				number : numberElement,
				pathCss : path,
			};
			arrCssPaths.push(temp);
		}
	}
}
/*** Các hàm generate ******************************/
function compareNode(nodeSelectorStart, nodeSelectorNext, arraySelectorRecure) {
	var id = compareId(nodeSelectorStart, nodeSelectorNext);
	var className = compareClass(nodeSelectorStart, nodeSelectorNext);
	var tagName = compareTag(nodeSelectorStart, nodeSelectorNext);
	if (tagName != "") {
		var nthchild = compareNthchild(nodeSelectorStart, nodeSelectorNext);
	} else {
		var nthchild = "";
	}
	var specialAttr = compareAttr(nodeSelectorStart, nodeSelectorNext);
	addNodeToArrSelector(id, className, tagName, nthchild, specialAttr, arraySelectorRecure);
}

function addNodeToArrSelector(id, className, tagName, nthchild, specialAttr, arraySelectorRecure) {
	var tempSelector = {
		tagName : tagName,
		nthchild : nthchild,
		id : id,
		className : className,
		specialAttr : specialAttr,
	};
	arraySelectorRecure.push(tempSelector);
}

function compareId(nodeSelectorStart, nodeSelectorNext) {
	var id = "";
	if (nodeSelectorStart.id == nodeSelectorNext.id && nodeSelectorStart.id != "") {
		id = nodeSelectorStart.id;
	}
	return id;
}

function compareTag(nodeSelectorStart, nodeSelectorNext) {
	var tagName = "";
	if (nodeSelectorStart.tagName == nodeSelectorNext.tagName && nodeSelectorStart.tagName != "") {
		tagName = nodeSelectorStart.tagName;
	}
	return tagName;
}

function compareNthchild(nodeSelectorStart, nodeSelectorNext) {
	var nthchild = "";
	if (nodeSelectorStart.nthchild == nodeSelectorNext.nthchild) {
		nthchild = nodeSelectorStart.nthchild;
	}
	return nthchild;
}

//So sánh list Class
function compareClass(nodeSelectorStart, nodeSelectorNext) {
	//check className
	if (nodeSelectorStart.className == "" || nodeSelectorNext.className == "") {
		var className = "";
	} else {
		var className = [];
		if (nodeSelectorStart.className.length) {
			// nodeSelectorStart is arr
			for (var i = 0; i < nodeSelectorStart.className.length; i++) {
				for (var j = 0; j < nodeSelectorNext.className.length; j++) {
					if (nodeSelectorStart.className[i] == nodeSelectorNext.className[j]) {
						className.push(nodeSelectorStart.className[i]);
					}
				}
			}
		} else {
			// nodeSelectorStart is object
			for (var i in nodeSelectorStart.className) {
				for (var j in nodeSelectorNext.className) {
					if (nodeSelectorStart.className[i] == nodeSelectorNext.className[j]) {
						className.push(nodeSelectorStart.className[i]);
					}
				}
			}
		} 
		if (className.length == 0) {
			var className = "";
		}
	}
	return className;
}

//so sánh list Attribute:
function compareAttr(nodeSelectorStart, nodeSelectorNext) {
	var specialAttr = [];
	if (nodeSelectorStart.specialAttr.length == 0) {
	} else {
		for (var i = 0; i < nodeSelectorStart.specialAttr.length; i++) {
			for (var j = 0; j < nodeSelectorNext.specialAttr.length; j++) {
				if (nodeSelectorStart.specialAttr[i].nameSpecialAttr == nodeSelectorNext.specialAttr[j].nameSpecialAttr && nodeSelectorStart.specialAttr[i].valueSpecialAttr == nodeSelectorNext.specialAttr[j].valueSpecialAttr) {
					var tempAttr = {
						nameSpecialAttr : nodeSelectorStart.specialAttr[i].nameSpecialAttr,
						valueSpecialAttr : nodeSelectorStart.specialAttr[i].valueSpecialAttr,
					};
					specialAttr.push(tempAttr);
				}
			}
		}
	}
	return specialAttr;
}

//////////////End các hàm tổng quát hóa