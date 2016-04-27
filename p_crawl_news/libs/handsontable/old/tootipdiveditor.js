//6244
(function (Handsontable) {
	var DivEditor = Handsontable.editors.BaseEditor.prototype.extend();
	DivEditor.prototype.init = function(){
	    this.div = document.createElement('div');
	    Handsontable.Dom.addClass(this.div, 'htdiv');
	    $(this.div).attr("id", 'htdiv');
	    this.div.style.display = 'none';
	    this.instance.rootElement[0].appendChild(this.div);
  	};
  	
  	DivEditor.prototype.prepare = function(){
	    Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);
	    var dataSource = this.cellProperties.dataSource;
	    var elements;
	
	    if (typeof dataSource == 'function'){
	    	elements =  this.prepareElement(dataSource(this.row, this.col, this.prop));
	    } else {
	    	elements =  this.prepareElement(dataSource);
	    }
	
	    Handsontable.Dom.empty(this.div);
	    for (var element in elements) {
	      if (elements.hasOwnProperty(element)){
	        var childElement = document.createElement('li'); 
	        Handsontable.Dom.addClass(childElement, 'licustom');
	        $(childElement).html(element);
	        
	       	var th = this; //Editor
	        $(childElement).click( function(){
	        	$(th.TD).html($(this).html()); //Set value cho td đang mở editor
				$(".licustom").each(function(){
					$(this).removeClass("active"); //Xóa trạng thái đang active trong editor
					
					//Đóng editor
					th.div.style.display = 'none';
	    			th.instance.removeHook('beforeKeyDown', onBeforeKeyDown);
				});
				$(this).addClass( "active"); //Active element vừa chọn (click)
			});
	        Handsontable.Dom.fastInnerHTML(childElement, elements[element]);
	        this.div.appendChild(childElement);
	      }
	    }
  };

  DivEditor.prototype.prepareElement = function(elementsToPrepare){
    var preparedElements = {};
    if (Handsontable.helper.isArray(elementsToPrepare)){
      for(var i = 0, len = elementsToPrepare.length; i < len; i++){
        preparedElements[elementsToPrepare[i]] = elementsToPrepare[i];
      }
    }
    else if (typeof elementsToPrepare == 'object') {
      preparedElements = elementsToPrepare;
    }
    return preparedElements;
  };
	
  DivEditor.prototype.getValue = function () {
  	var value = $("#htdiv .active").html(); //Lấy value
  	var valueCurrent = $(this.TD).html();
  	if(value === undefined) {// Khi không chọn element nào 
  		if(valueCurrent == '') // Nếu cell không có giá trị
  			value = '';
  		else
  			value = valueCurrent;
  	}
  	return value;
  };

  DivEditor.prototype.setValue = function (value) {
	$(this.TD).html(value); //Gán value cho td đang mở editor
  };

  var onBeforeKeyDown = function (event) {
    var instance = this;
    var editor = instance.getActiveEditor();
  };
  
  DivEditor.prototype.open = function () {
    var widthTD = Handsontable.Dom.outerWidth(this.TD); //important - group layout reads together for better performance
    var heightTD = Handsontable.Dom.outerHeight(this.TD);
    var heightDiv = 150;
    var widthDiv = 250;
    var rootOffset = Handsontable.Dom.offset(this.instance.rootElement[0]);
    var tdOffset = Handsontable.Dom.offset(this.TD);

    this.div.style.height = heightDiv + 'px';
    this.div.style.minWidth = widthDiv + 'px';
    this.div.style.top = tdOffset.top - rootOffset.top + heightTD + 'px';
    this.div.style.left = tdOffset.left - rootOffset.left + 'px';
    this.div.style.margin = '0px';
    this.div.style.display = '';

    this.instance.addHook('beforeKeyDown', onBeforeKeyDown);
  };

  DivEditor.prototype.close = function () {
    this.div.style.display = 'none';
    this.instance.removeHook('beforeKeyDown', onBeforeKeyDown);
  };

  DivEditor.prototype.focus = function () {
    this.div.focus();
  };

  Handsontable.editors.DivEditor = DivEditor;
  Handsontable.editors.registerEditor('diveditor', DivEditor);

})(Handsontable);