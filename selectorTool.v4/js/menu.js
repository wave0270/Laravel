/**
 * @jsx React.DOM
 */
var arrClickElements = [];
var projectManagerModel = new ProjectManagerModel();
/*******************/
projectManagerModel.updateDefaultDataToRulelist();
var hashData = getUrlVars();
if( hashData[0].title == "project" ){
	console.log("Mở Project từ file: "+ hashData[0].data);
	projectManagerModel.loginToServer("read",hashData[0].data);
}
/***Send and Listen message****************/	
function onStorageEvent(storageEvent){
	//console.log(storageEvent);
	if( storageEvent.newValue == null || storageEvent.newValue == ""){ return false;}
	var storageData = JSON.parse(storageEvent.newValue);
	if( storageEvent.key == "_clickedElement"){
		if(projectManagerModel.get('projectCheck') == 'defaultSelector'){	
			if(projectManagerModel.checkChangedData() == false){return false;}	
			projectManagerModel.getDataFromTreetable(false);
			/*if element no have parent element*/
			if(projectManagerModel.checkParentOfField() == 0){
				var tempClick = storageData.data;
				arrClickElements.push(tempClick);
				callBackDefaultSelector(arrClickElements);
				return true;
			}
			/*if element have parent element*/
			if(projectManagerModel.checkParentOfField() == 1){	
				var tempClick = storageData.data;
				/*stop if clicked element have different csspath-length */
				if( arrClickElements.length != 0){
					if( arrClickElements[0].length != tempClick.length){
						alert("Element bạn chọn không thể tạo ra csspath!");
						return false;
					}
				}
				arrClickElements.push(tempClick);
				var parentOfField = projectManagerModel.getParentOfField();	
				//Xác định số lượng node con:					
				var arrNodeOfChild = generateArrClickElements(arrClickElements);
				var arrNodeOfParent = generateArrClickElements(parentOfField.arrClickElements);
				var numberChildPath = arrNodeOfChild.length - arrNodeOfParent.length ;
				if( numberChildPath == 0){
					alert("Bạn vừa chọn parent element!");
					return false;
				}
				/*creat short csspath*/
				var arrNew = [];
				for( var i=0; i < numberChildPath ; i++){
					arrNew.push(arrNodeOfChild[i]);
				}		
				/*Check select in Ecommerce case - * parentCsspath just have 1 element*/
				if( Number(parentOfField.number) == 1){
					var s = projectManagerModel.get('dataUrl').replace(/src/g,'data-src');
					var tmp = document.createElement('div');
					tmp.innerHTML = s;
					var currentElement = $(tmp).find(createFullPath(arrNodeOfChild))[0];
					var text = $(currentElement).text();
					var fullCssPath = createFullPathForEcommerce(arrNew,text);
				}else{
					var childCssPath = createFullPath(arrNew);
					var fullCssPath = String.format("{0} > {1}",parentOfField.path,childCssPath);	
				}					
				//not allow if number > numberOfParent
				var numberCount = countElements(fullCssPath);	
				if( numberCount > parentOfField.number){
					fullCssPath = 'null';
					alert("Element bạn chọn không kết hợp csspath được!");
				}
				projectManagerModel.updateRuleWhenClickEl(fullCssPath,true);
				projectManagerModel.requireHightLightClickEls();
				projectManagerModel.requireHightLightGenCssPath(fullCssPath);
				return true;
			}
			if(projectManagerModel.checkParentOfField() == 2){
				return false;
			}
		}
	}
	/*webview call menu function*/
	if( storageEvent.key == "_callMenuFunction"){
		if( storageData.method == "inspectUrl"){
			projectManagerModel.inspectUrl(storageData.data);
		}
		if( storageData.method == "renderTreetable"){
			projectManagerModel.renderTreetable();
		}
		if( storageData.method == "changeWebview"){
			projectManagerModel.changeWebview(storageData.data);
		}
	}
}
window.addEventListener('storage', onStorageEvent, false);

function callBackDefaultSelector(arrClicks){
	var path = createFullPath(generateArrClickElements(arrClickElements));
	projectManagerModel.updateRuleWhenClickEl(path,true);
	projectManagerModel.requireHightLightClickEls();
	projectManagerModel.requireHightLightGenCssPath(path);
	
}
/************************************/