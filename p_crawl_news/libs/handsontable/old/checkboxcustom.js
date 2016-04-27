//CheckboxRendererCustom 4985 
/**
 * Checkbox renderer custom
 * @param {Object} instance Handsontable instance
 * @param {Element} TD Table cell where to render
 * @param {Number} row
 * @param {Number} col
 * @param {String|Number} prop Row object property name
 * @param value Value to render (remember to escape unsafe HTML before inserting to DOM!)
 * @param {Object} cellProperties Cell properites (shared by cell renderer and editor)
 */
(function (Handsontable) {

  'use strict';

  var clonableINPUT = document.createElement('INPUT');
  clonableINPUT.className = 'htCheckboxRendererInput';
  clonableINPUT.type = 'checkbox';
  clonableINPUT.setAttribute('autocomplete', 'off');

  var CheckboxRendererCustom = function (instance, TD, row, col, prop, value, cellProperties) {

    if (typeof cellProperties.checkedTemplate === "undefined") {
      cellProperties.checkedTemplate = true;
    }
    if (typeof cellProperties.uncheckedTemplate === "undefined") {
      cellProperties.uncheckedTemplate = false;
    }

    Handsontable.Dom.empty(TD); //TODO identify under what circumstances this line can be removed

    var INPUT = clonableINPUT.cloneNode(false); //this is faster than createElement

    if (value === cellProperties.checkedTemplate || value === Handsontable.helper.stringify(cellProperties.checkedTemplate)) {
      INPUT.checked = true;
      TD.appendChild(INPUT);
    }
    else if (value === cellProperties.uncheckedTemplate || value === Handsontable.helper.stringify(cellProperties.uncheckedTemplate)) {
      TD.appendChild(INPUT);
    }
    else if (value === null) { //default value
      INPUT.className += ' noValue';
      TD.appendChild(INPUT);
    }
    else {
      Handsontable.Dom.fastInnerText(TD, '#bad value#'); //this is faster than innerHTML. See: https://github.com/handsontable/jquery-handsontable/wiki/JavaScript-&-DOM-performance-tips
    }

    var $input = $(INPUT);

    if (cellProperties.readOnly) {
      $input.on('click', function (event) {
        event.preventDefault();
      });
    }
    else {
      $input.on('mousedown', function (event) {
        event.stopPropagation(); //otherwise can confuse cell mousedown handler
      });

      $input.on('mouseup', function (event) {
        event.stopPropagation(); //otherwise can confuse cell dblclick handler
      });

      $input.on('change', function(){
        if (this.checked) {
          instance.setDataAtRowProp(row, prop, cellProperties.checkedTemplate);
        }
        else {
          instance.setDataAtRowProp(row, prop, cellProperties.uncheckedTemplate);
        }
      });
    }

    if(!instance.CheckboxRenderer || !instance.CheckboxRenderer.beforeKeyDownHookBound){
      instance.CheckboxRenderer = {
        beforeKeyDownHookBound : true
      };

      instance.addHook('beforeKeyDown', function(event){
        if(event.keyCode == Handsontable.helper.keyCode.SPACE){

          var cell, checkbox, cellProperties;

          var selRange = instance.getSelectedRange();
          var topLeft = selRange.getTopLeftCorner();
          var bottomRight = selRange.getBottomRightCorner();

          for(var row = topLeft.row; row <= bottomRight.row; row++ ){
            for(var col = topLeft.col; col <= bottomRight.col; col++){
              cell = instance.getCell(row, col);
              cellProperties = instance.getCellMeta(row, col);

              checkbox = cell.querySelectorAll('input[type=checkbox]');

              if(checkbox.length > 0 && !cellProperties.readOnly){

                if(!event.isImmediatePropagationStopped()){
                  event.stopImmediatePropagation();
                  event.preventDefault();
                }

                for(var i = 0, len = checkbox.length; i < len; i++){
                  checkbox[i].checked = !checkbox[i].checked;
                  $(checkbox[i]).trigger('change');
                }

              }

            }
          }
        }
      });
    }
  };
  Handsontable.CheckboxRendererCustom = CheckboxRendererCustom;
  Handsontable.renderers.CheckboxRendererCustom = CheckboxRendererCustom;
  Handsontable.renderers.registerRenderer('checkbox', CheckboxRendererCustom);

})(Handsontable);


//CheckboxEditorCustom 5668
(function(Handsontable){

  //Blank editor, because all the work is done by renderer
  var CheckboxEditorCustom = Handsontable.editors.BaseEditor.prototype.extend();

  CheckboxEditorCustom.prototype.beginEditing = function () {
    var checkbox = this.TD.querySelector('input[type="checkbox"]');

    if (checkbox) {
      $(checkbox).trigger('click');
    }

  };

  CheckboxEditorCustom.prototype.finishEditing = function () {};

  CheckboxEditorCustom.prototype.init = function () {};
  CheckboxEditorCustom.prototype.open = function () {};
  CheckboxEditorCustom.prototype.close = function () {};
  CheckboxEditorCustom.prototype.getValue = function () {};
  CheckboxEditorCustom.prototype.setValue = function () {};
  CheckboxEditorCustom.prototype.focus = function () {};

  Handsontable.editors.CheckboxEditor = CheckboxEditorCustom;
  Handsontable.editors.registerEditor('checkboxcustom', CheckboxEditorCustom);

})(Handsontable);


//Handsontable.CheckboxCellCustom  6447
Handsontable.CheckboxCellCustom = {
  editor: Handsontable.editors.CheckboxEditorCustom,
  renderer: Handsontable.renderers.CheckboxRendererCustom
};


//Handsontable.cellTypes 6487
Handsontable.cellTypes = {
  text: Handsontable.TextCell,
  date: Handsontable.DateCell,
  numeric: Handsontable.NumericCell,
  checkbox: Handsontable.CheckboxCell,
  checkboxcustom: Handsontable.CheckboxCellCustom,
  autocomplete: Handsontable.AutocompleteCell,
  handsontable: Handsontable.HandsontableCell,
  password: Handsontable.PasswordCell,
  dropdown: Handsontable.DropdownCell
};