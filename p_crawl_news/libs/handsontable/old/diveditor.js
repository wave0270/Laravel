//6244
(function (Handsontable) {

  var DivEditor = Handsontable.editors.BaseEditor.prototype.extend();

  DivEditor.prototype.init = function(){
    this.div = document.createElement('div');
    Handsontable.Dom.addClass(this.div, 'htdiv');
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
    for (var element in elements){
      if (elements.hasOwnProperty(element)){
        var childElement = document.createElement('li');
        
		
        Handsontable.Dom.addClass(childElement, 'licustom');
        $(childElement).html(element);
        var TD = this.TD;
        $(childElement).click( function(){
        	//console.log(DivEditor.prototype);
        	$(TD).html(this.innerHTML);
        	//DivEditor.prototype.close();
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
    return this.div.value;
  };

  DivEditor.prototype.setValue = function (value) {
    this.div.value = value;
  };

  var onBeforeKeyDown = function (event) {
    var instance = this;
    var editor = instance.getActiveEditor();

    // switch (event.keyCode){
      // case Handsontable.helper.keyCode.ARROW_UP:
// 
        // var previousOption = editor.select.find('option:selected').prev();
// 
        // if (previousOption.length == 1){
          // previousOption.prop('selected', true);
        // }
// 
        // event.stopImmediatePropagation();
        // event.preventDefault();
        // break;
// 
      // case Handsontable.helper.keyCode.ARROW_DOWN:
// 
        // var nextOption = editor.select.find('option:selected').next();
// 
        // if (nextOption.length == 1){
          // nextOption.prop('selected', true);
        // }
// 
        // event.stopImmediatePropagation();
        // event.preventDefault();
        // break;
    // }
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