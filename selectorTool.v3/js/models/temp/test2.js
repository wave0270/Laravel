function process(url) {
	if (url == undefined) {
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
	nodes = fragment.querySelectorAll('#stickies .rating5');
	var arrlist = [];
	for (var i = 0; i < (nodes.length - 1); i++) {
		var arr = {};
		arr['Tiêu đề'] = nodes[i].querySelector('div:nth-child(1).threadinfo div:nth-child(2).inner h3:nth-child(1).threadtitle a:nth-child(3).title').innerText.trim();
		arr['Tóm tắt'] = nodes[i].querySelector('dl:nth-child(3).threadlastpost.td dd:nth-child(2) div:nth-child(1).popupmenu.memberaction a:nth-child(1).username strong:nth-child(1)').innerText.trim();
		arrlist.push(arr);
	}
	return arrlist;
}