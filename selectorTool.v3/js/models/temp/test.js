function process(url,dataProject){
	if (url == undefined) {
			url = 'http://www.5giay.vn/thoi-trang-nam.html';
		}
		if (url != '') {
			if (isFrameworkAvailable()) {
				console.log('Load url via framework: ' + url);
				DBJavaScriptConnInterface.getUrl(url, 'getUrlCallback', '');
			} else {
				url = 'http://data.xixo.vn/extra/proxy.php?o=js&url=' + url;
				console.log('Load url via proxy: ' + url);
				$.getScript(url, function(d, textStatus, jqxhr) {
					getdata(data,dataProject);
				});
			}
		} else {
			console.log('Cần tham số url trên query param');
		}
}
function getdata(resObj,dataProject) {
	openDialogProcess();
	dataProject = JSON.parse(dataProject);
	var s = resObj['DATA'].replace(/src=/g, 'data-src=');
	var tmp = document.createElement('div');
	tmp.innerHTML = s;
	fragment = document.createDocumentFragment().appendChild(tmp);
	//select csspath
	var SuggestElementArr = dataProject.parentResult.SuggestElementArr;
	var elementNum  = dataProject.elementNum;
	for( var i=0; i<SuggestElementArr.length ; i++){
		console.log(SuggestElementArr[i].number)
		if(Number(SuggestElementArr[i].number) == elementNum){
			//console.log(SuggestElementArr[i].pathCss)
			var csspath = SuggestElementArr[i].pathCss;
			i = SuggestElementArr.length;
		}
	}
	nodes = fragment.querySelectorAll(csspath);
	var fieldlistData = dataProject.fieldlistData;
	console.log(nodes.length)
	console.log(fieldlistData.length)
	var arrlist = [];
	for (var i = 0; i<(nodes.length - 1); i++) {
		var arr = {};	
		for( var j=0 ; j<fieldlistData.length ; j++){
			if( fieldlistData[j].path != ''){
				arr[fieldlistData[j].title] = nodes[i].querySelector(fieldlistData[j].path).innerText.trim();
			}
		}
		console.log('------------------------------------------')
		console.log(JSON.stringify(arr))		
		arrlist.push(arr);
	}
}

===========================
chua xoa project
function process(url, dataProject) {
	if (url == undefined) {
		url = 'http://www.5giay.vn/thoi-trang-nam.html';
	}
	if (url != '') {
		if (isFrameworkAvailable()) {
			DBJavaScriptConnInterface.getUrl(url, 'getUrlCallback', '');
		} else {
			url = 'http://data.xixo.vn/extra/proxy.php?o=js&url=' + url;
			$.getScript(url, function(d, textStatus, jqxhr) {
				getdata(data, dataProject);
			});
		}
	} else {
	}
}

function getdata(resObj, dataProject) {
	dataProject = JSON.parse(dataProject);
	var s = resObj['DATA'].replace(/src=/g, 'data-src=');
	var tmp = document.createElement('div');
	tmp.innerHTML = s;
	fragment = document.createDocumentFragment().appendChild(tmp);
	var SuggestElementArr = dataProject.parentResult.SuggestElementArr;
	var elementNum = dataProject.elementNum;
	for (var i = 0; i < SuggestElementArr.length; i++) {
		if (Number(SuggestElementArr[i].number) == elementNum) {
			var csspath = SuggestElementArr[i].pathCss;
			i = SuggestElementArr.length;
		}
	}
	nodes = fragment.querySelectorAll(csspath);
	var fieldlistData = dataProject.fieldlistData;
	var arrlist = [];
	for (var i = 0; i < (nodes.length - 1); i++) {
		var arr = {};
		arr['Tiêu đề'] = nodes[i].querySelector('div:nth-child(1).threadinfo div:nth-child(2).inner h3:nth-child(1).threadtitle a:nth-child(3).title').innerText.trim();
		arrlist.push(arr);
	}
}
==================
function process(url){/n
											if (url == undefined) {/n
													url = 'http://www.5giay.vn/thoi-trang-nam.html';
												}
												if (url != '') {
													if (isFrameworkAvailable()) {
														DBJavaScriptConnInterface.getUrl(url, 'getUrlCallback', '');
													} else {
														url = 'http://data.xixo.vn/extra/proxy.php?o=js&url=' + url;
														$.getScript(url, function(d, textStatus, jqxhr) {
															getdata(data);
														});
													}
												} else {
												}
										}
										function getdata(resObj) {										
											var s = resObj['DATA'].replace(/src=/g, 'data-src=');
											var tmp = document.createElement('div');
											tmp.innerHTML = s;
											fragment = document.createDocumentFragment().appendChild(tmp);																				
											nodes = fragment.querySelectorAll('{{=it.csspathparent}}');								
											var arrlist = [];
											for (var i = 0; i<(nodes.length - 1); i++) {
												var arr = {};	
												{{~it.fieldlistData :value2:index2}}
												arr['{{=value2.title}}'] = nodes[i].querySelector('{{=value2.path}}').innerText.trim();
												{{~}}											
												arrlist.push(arr);
											}		
											return arrlist;				
										}
										===============
										<script type="text/jsx">
	/**
	 * @jsx React.DOM
	 */
	/*
	var SubmitDialogBox = React.createClass({
		render : function(){
			return (
				<div id="dialogDiv">
					<div className="modal">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<button aria-hidden="true" data-dismiss="modal" className="close" type="button" onClick={this.closeDialogSelector}>x</button>
									<h4 className="modal-title">Edit Dialog</h4>
								</div>
		
								<div className="modal-body"></div>
		
								<div className="modal-footer">
									<button data-dismiss="modal" className="btn btn-default btn-sm" type="button" onClick={this.closeDialogSelector}>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		},
		closeDialogSelector: function() {
		    $(".modal").css("display", "none");
		    $("#submitDialog").css("display", "block");
		    
		},
	});
	function RenderSubmitDialogBox(){
		React.renderComponent(
			//SubmitDialogBox({data:datareact}) ,
			<SubmitDialogBox />,
			$("body").append("<div id='dialogDiv' ></div>")
			document.getElementById('dialogDiv')
		);
		$(".modal").css("display", "block");
	}
	</script>
										//var test = String.format("function process(url){\n	if (url == undefined) {\n			url = 'http://www.5giay.vn/thoi-trang-nam.html';\n		}\n		if (url != '') {\n			if (isFrameworkAvailable()) {\n				DBJavaScriptConnInterface.getUrl(url, 'getUrlCallback', '');\n			} else {\n				url = 'http://data.xixo.vn/extra/proxy.php?o=js&url=' + url;\n				$.getScript(url, function(d, textStatus, jqxhr) {\n					getdata(data);\n				});\n			}\n		} else {\n	}\n}\nfunction getdata(resObj) {\n	var s = resObj['DATA'].replace(/src=/g, 'data-src=');\n	var tmp = document.createElement('div');\n	tmp.innerHTML = s;\n	fragment = document.createDocumentFragment().appendChild(tmp);	\n")