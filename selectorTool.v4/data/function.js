											
				
if (typeof _Event == 'undefined') _Event = _.extend({},Backbone.Events); // Tham khảo: http://backbonejs.org/
var DirectData_Aiti_List = {
	settings: {
		url: 'http://vnexpress.net/photo/the-gioi/chuyen-bay-ve-nha-cua-nan-nhan-mh17-3021702.html',
		eventName: 'Aiti_List',
	},
	process: function(url) {
		if (url == null) url = this.settings.url; 
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
	    var arr = [];                                                                   
   		
   		/*******************************************/
		var art = {};
		var dataParent = [];
		var dataChild = [];
		var nodes = fragment.querySelectorAll("div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1).width_common > div:nth-of-type(2).width_common.line_col > div:nth-of-type(1).left > div:nth-of-type(1).box_width_common > div:nth-of-type(1).w670.left > div:nth-of-type(1).main_content_detail.width_common > div:nth-of-type(2).title_news > h1:nth-of-type(1)");
		for( var j=0 ; j < nodes.length ; j++){	
			dataParent.push(this.processElement(nodes[j],"div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1).width_common > div:nth-of-type(2).width_common.line_col > div:nth-of-type(1).left > div:nth-of-type(1).box_width_common > div:nth-of-type(1).w670.left > div:nth-of-type(1).main_content_detail.width_common > div:nth-of-type(2).title_news > h1:nth-of-type(1)","innerText","innerText"));
		}
		art['dataParent'] = dataParent,
		art['titleParent'] = "title",
		art['dataChild'] = dataChild;
		arr.push(art);	
		
   		/*******************************************/
		var art = {};
		var dataParent = [];
		var dataChild = [];
		var nodes = fragment.querySelectorAll("div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1).width_common > div:nth-of-type(2).width_common.line_col > div:nth-of-type(1).left > div:nth-of-type(1).box_width_common > div:nth-of-type(1).w670.left > div:nth-of-type(1).main_content_detail.width_common > div:nth-of-type(3).short_intro.txt_666");
		for( var j=0 ; j < nodes.length ; j++){	
			dataParent.push(this.processElement(nodes[j],"div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1).width_common > div:nth-of-type(2).width_common.line_col > div:nth-of-type(1).left > div:nth-of-type(1).box_width_common > div:nth-of-type(1).w670.left > div:nth-of-type(1).main_content_detail.width_common > div:nth-of-type(3).short_intro.txt_666","innerText","innerText"));
		}
		art['dataParent'] = dataParent,
		art['titleParent'] = "sum",
		art['dataChild'] = dataChild;
		arr.push(art);	
		
		/*--------------------------------------------*/
		var art = {};
		var dataParent = [];
		var dataChild = [];
		nodes = fragment.querySelectorAll("div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1).width_common > div:nth-of-type(2).width_common.line_col > div:nth-of-type(2).right > div:nth-of-type(3).box_category.width_common > div:nth-of-type(2).content_box_category.width_common > div:nth-of-type(2).home_bright_640 > ul:nth-of-type(1).list_news_dot_3x3_300 > li");		
		for( var j=0 ; j < nodes.length ; j++){
			var artChild = {};
			
			artChild["title_1"] = this.processElement(nodes[j].querySelector("p:nth-of-type(1) > strong:nth-of-type(1) > a:nth-of-type(1)"),"p:nth-of-type(1) > strong:nth-of-type(1) > a:nth-of-type(1)","innerText","innerText");					
			
			artChild["link"] = this.processElement(nodes[j].querySelector("p:nth-of-type(1) > strong:nth-of-type(1) > a:nth-of-type(1)"),"p:nth-of-type(1) > strong:nth-of-type(1) > a:nth-of-type(1)","getAttribute","href");					
			
			dataChild.push(artChild);
		}
		art['dataParent'] = dataParent,
		art['titleParent'] = "list1",
		art['dataChild'] = dataChild;
		arr.push(art);
		
		/*--------------------------------------------*/
		var art = {};
		var dataParent = [];
		var dataChild = [];
		nodes = fragment.querySelectorAll("div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1).width_common > div:nth-of-type(2).width_common.line_col > div:nth-of-type(2).right > div:nth-of-type(6).box_category.width_common > div:nth-of-type(2).content_box_category.width_common > ul.list_new_140.list_col > li");		
		for( var j=0 ; j < nodes.length ; j++){
			var artChild = {};
			
			artChild["title_2"] = this.processElement(nodes[j].querySelector("strong:nth-of-type(1) > a:nth-of-type(1)"),"strong:nth-of-type(1) > a:nth-of-type(1)","innerText","innerText");					
			
			artChild["img_2"] = this.processElement(nodes[j].querySelector("div:nth-of-type(1).thumb_140.width_common > a:nth-of-type(1) > img:nth-of-type(1)"),"div:nth-of-type(1).thumb_140.width_common > a:nth-of-type(1) > img:nth-of-type(1)","getAttribute","src");					
			
			artChild["link_2"] = this.processElement(nodes[j].querySelector("strong:nth-of-type(1) > a:nth-of-type(1)"),"strong:nth-of-type(1) > a:nth-of-type(1)","innerText","innerText");					
			
			dataChild.push(artChild);
		}
		art['dataParent'] = dataParent,
		art['titleParent'] = "list2",
		art['dataChild'] = dataChild;
		arr.push(art);
		
	    console.log('---------------- Selector Tool:');
    	console.log(arr);
	    /*output event */ 
	    if(arr.length == 1){
	    	_Event.trigger(this.settings.eventName, JSON.stringify(arr[0].dataChild));
	    }else{
	    	_Event.trigger(this.settings.eventName, JSON.stringify(arr));
	    }
    },
    processElement: function(elem, csspath, attr, attrStyle) {
		var result = elem;
		if (result == null) return '';
		if (attr == '' || attr == null) attr = 'innerHTML';
		if (attr == 'innerHTML') return result.innerHTML;
		if (attr == 'outerHTML') return result.outerHTML;
		if (attr == 'getAttribute') {
			if (attrStyle == 'href') return this.processHref_Src(elem, csspath, attr, attrStyle);
			if (attrStyle == 'src') {
				attrStyle = 'data-src';
				return this.processHref_Src(elem, csspath, attr, attrStyle);
			}
		} 
		return result.innerText.trim();
    },
    processHref_Src : function(elem, csspath, attr, attrStyle){
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
		return data;
    },
};
										
			