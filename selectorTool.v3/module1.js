if (typeof _Event == 'undefined') _Event = _.extend({},Backbone.Events); // Tham khảo: http://backbonejs.org/
var DirectData_Aiti_List = {
	settings: {
		url: 'http://aiti.edu.vn/category/tin-tuc-su-kien/tin-khoa-hoc-cong-nghe/',
		eventName: 'Aiti_List',
	},
	process: function(url) {
		// Nếu không có url thì sẽ chạy với url mặc định 
		if (url == null) url = this.settings.url;
    	// Detect xem có Framework hay không. Nếu không có framework thì DBJavaScriptConnInterface == undefined 
	    if (typeof DBJavaScriptConnInterface != 'undefined') { 
	        console.log('Load url via framework: ' + url); 
	        DBJavaScriptConnInterface.getUrl(url, 'DirectData_Aiti_List.processHtml', ''); 
	    } else { 
	        console.log('Load url via proxy: ' + url); 
	        url = 'http://data.xixo.vn/extra/proxy.php?o=js&url=' + url; 
	        $.getScript(url, function(d, textStatus, jqxhr) { 
	            DirectData_Aiti_List.processHtml(data);
	        }); 
	    } 
    },
    
    processHtml: function(resObj) {
    	var tmp = document.createElement('div'); 
	    tmp.innerHTML = resObj['DATA'].replace(/src/g, 'data-src'); 
	    fragment = document.createDocumentFragment().appendChild(tmp);                                                                              
	    
	    nodes = fragment.querySelectorAll('.content');  // Sử dụng selector default                  
	    var arr = [];
	    for (var i = 0; i< nodes.length; i++) {
	    	var item = {}; 
	    	item['title'] = this.processElement(nodes[i], 'div:nth-child(2) h1:nth-child(1).title a:nth-child(1)', '', '');
	    	item['summary'] = this.processElement(nodes[i], 'div:nth-child(2) div:nth-child(2) p:nth-child(1)', '', '');
	    	item['linkTo'] = this.processElement(nodes[i], 'div:nth-child(2) h1:nth-child(1).title a:nth-child(1)', 'getAttribute', 'href');
	    	item['imgSrc'] = this.processElement(nodes[i], 'div:nth-child(1).image-post-thumb img:nth-child(1).attachment-post-thumbnail.wp-post-image', 'getAttribute', 'src');
	    	arr.push(item);
	    }
	    console.log('----------------');
    	console.log(arr);
	    	
	    // Bắn sự kiện ra bên ngoài để html xử lý 
	    _Event.trigger(this.settings.eventName, arr);
    },
    
    processElement: function(elem, csspath, attr, attrStyle) {
    	var result = elem.querySelector(csspath);
    	if (result == null) return '';
    	if (attr == '' || attr == null) attr = 'innerHTML';
    	if (attr == 'innerHTML') return result.innerHTML;
    	if (attr == 'outerHTML') return result.outerHTML;
    	if (attr == 'getAttribute') {
    		if (attrStyle == 'src') attrStyle = 'data-src';
    		return result.getAttribute(attrStyle);
		} 
    },
};