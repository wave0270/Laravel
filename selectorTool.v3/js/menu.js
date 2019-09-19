/**
 * @jsx React.DOM
 */
var arrClicks = [];
var projectManagerModel = new ProjectManagerModel();
var gerneralCssPathModel = new GerneralCssPathModel();
var fieldListModel = new FieldListModel();
var menuSelectorModel = new MenuSelectorModel();
var detailModel = new DetailModel();
var fieldlistData = fieldListModel.defaulData();
/***Send and Listen message****************/
window.addEventListener('message', receiveMessage); 
function receiveMessage(e){
	// Check to make sure that this message came from the correct domain.
	var urlDomain = getDommainUrl();
	if (e.origin !== urlDomain){return;}			
	if(projectManagerModel.get('projectCheck') == 'defaultSelector'){
		var tempClick = JSON.parse(e.data).elNodes;
		var pathCssFull = createFullPath(tempClick);	
		addToArrClickElements(pathCssFull, tempClick, arrClicks);
		callBackDefaultSelector(arrClicks);
	}
	if(projectManagerModel.get('projectCheck') == 'secondSelector'){	
		console.log('in secondSelector');
		if(fieldListModel.get('presentIndex') == ''){
			console.log('Bạn chưa chọn title!' );
		}else{
			var tempClick = JSON.parse(e.data).elNodes;
			var pathCssFull = createFullPath(tempClick);
			//add to arrClicks:
			addToArrClickElements(pathCssFull, tempClick , arrClicks);
			//add to GerneralCssPathModel
			gerneralCssPathModel.set({'arrClickElements':arrClicks});
			var timeindex = new Date();
			gerneralCssPathModel.set({'timeindex': timeindex.getTime()});
			var datareact = gerneralCssPathModel.initSuggestElementArr();
			var cssPath = gerneralCssPathModel.get('generateCssPath');	
			//Xác định số lượng node con:					
			var arrCsspath = fieldListModel.get('parentResult').generateArrClickElements;
			var numberChildPath = tempClick.length - arrCsspath.length ;
			var generateArrClickElements = gerneralCssPathModel.get('generateArrClickElements');
			
			var arrNew = [];
			for( var i=0; i < numberChildPath ; i++){
				arrNew.push(generateArrClickElements[i]);
			}		
			var childCssPath = createFullPath(arrNew);
			var fullCssPath = String.format("{0} {1}",fieldListModel.get('parentCssPath'),childCssPath);
			var numberElements = countElements(fullCssPath);
			
			/* optimize childCsspath */
			var childCssPath_2 = createFullPath(arrNew, true);
			var fullCssPath_2 = String.format("{0} {1}",fieldListModel.get('parentCssPath'),childCssPath_2);
			var numberElements_2 = countElements(fullCssPath_2);
			if (numberElements === numberElements_2) {
				console.log('*** Get from childCssPath_2, oldchildCsspath: ', childCssPath)
				childCssPath = childCssPath_2;
				fullCssPath = fullCssPath_2;
				numberElements = numberElements_2;
			} else {
				console.log('*** Get from childCssPath, numberElements_2: ', numberElements_2)
			}
			/* end optimize childCsspath */
			projectManagerModel.requireHightLightGenCssPath(fullCssPath);

			/*update data from #fieldlistView*/
			fieldListModel.getDataFromFieldlistView();
			var fieldlistData = fieldListModel.get('fieldlistData');
			var presentIndex = Number(fieldListModel.get('presentIndex'));
			//not allow if number > numberOfParent
			if( numberElements > fieldListModel.get('elementNum')){
				fieldlistData[presentIndex].path = 'null';
				fieldlistData[presentIndex].number = '0';
			}else{
				fieldlistData[presentIndex].path = childCssPath;
				fieldlistData[presentIndex].number = numberElements;
			}
			//chèn data và render fieldlist
			fieldListModel.set({'fieldlistData': fieldlistData});
			var timeindex = new Date();
			fieldListModel.set({'timeindex': timeindex.getTime()});	
		}
	}
	if(projectManagerModel.get('projectCheck') == 'menuSelector'){
		var tempClick = JSON.parse(e.data);
		var pathCssFull = createFullPath(tempClick);
		addToArrClickElements(pathCssFull, tempClick, arrClicks);
		//set data for gerneralCssPathModel
		gerneralCssPathModel.set({'arrClickElements':arrClicks});
		var timeindex = new Date();
		gerneralCssPathModel.set({'timeindex': timeindex.getTime()});
		//set data for menuSelectorModel:
		var generateCssPath = gerneralCssPathModel.get('generateCssPath');		
		menuSelectorModel.set({'generateCssPath': generateCssPath});	
		projectManagerModel.requireHightLightGenCssPath(generateCssPath);
	}
	if(projectManagerModel.get('projectCheck') == 'detailSelector'){
		var tempClick = JSON.parse(e.data);
		var pathCssFull = createFullPath(tempClick);
		addToArrClickElements(pathCssFull, tempClick, arrClicks);
		//set data for gerneralCssPathModel
		gerneralCssPathModel.set({'arrClickElements':arrClicks});
		var timeindex = new Date();
		gerneralCssPathModel.set({'timeindex': timeindex.getTime()});
		//set data for detailModel;
		detailModel.set({'newestCssPath':gerneralCssPathModel.get('generateCssPath')});
	}
}
function callBackDefaultSelector(arrClicks){
	//add to GerneralCssPathModel
	gerneralCssPathModel.set({'arrClickElements':arrClicks});
	var timeindex = new Date();
	gerneralCssPathModel.set({'timeindex': timeindex.getTime()});	
}
/***function global*****/
function addToArrClickElements(pathCssFull, arraySelector, arr) {
	console.log("in addToarrClicks()");
	var tempclickElement = {
		pathCssFull : pathCssFull,
		arraySelector : arraySelector,
	};
	//biến này được khai báo toàn cục trên file content.html
	arr.push(tempclickElement);
}

function importJS(src, look_for, onload) {
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', src);
	if (onload)
		wait_for_script_load(look_for, onload);
	var head = document.getElementsByTagName('head')[0];
	if (head) {
		head.appendChild(s);
	} else {
		document.body.appendChild(s);
	}
}
/************************************/