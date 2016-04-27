var $container = $("#example1"); //Khai báo id render handsontable
/*
 * Render color
 * @param instance
 * @param td
 * @param row
 * @param col
 * @param prop
 * @param value
 * @param cellProperties
 * @return td
 */
var colorRenderer = function (instance, td, row, col, prop, value, cellProperties) {
	var prop = $container.handsontable('getData')[row].name;
  	var escaped = Handsontable.helper.stringify(value);
  	escaped += "<span><div style='width:24px; height:24px; float:right; background:" + escaped + "'></div><span>";
  	td.innerHTML = escaped;
  	return td;
};
/*
 * Render background
 * @param instance
 * @param td
 * @param row
 * @param col
 * @param prop
 * @param value
 * @param cellProperties
 * @return td
 */
var backgroundRenderer = function (instance, td, row, col, prop, value, cellProperties) {
	var prop = $container.handsontable('getData')[row].name;
  	var escaped = Handsontable.helper.stringify(value);
  	
  	if (escaped.indexOf('https') === 0 || escaped.indexOf('http')  === 0){ //Neu background la 1 link image
		escaped = "<image style='float:right max-width:60px; max-height:60px ' src='" + escaped + "' />";
	}else{ // Neu la 1 ma mau
		escaped += "<div style='width:24px; height:24px; float:right; background:" + escaped + "'></div>";
	}
  	td.innerHTML = escaped;
  	return td;
};

/*
 * Render template
 * @param instance
 * @param td
 * @param row
 * @param col
 * @param prop
 * @param value
 * @param cellProperties
 * @return td
 */
var templateRenderer = function (instance, td, row, col, prop, value, cellProperties) {
  	var escaped = Handsontable.helper.stringify(value);
  	if(escaped != ''){
		escaped = "<img style='margin-top:3px' src='../img/notes_styles.png' />";
		$(td).css({
			"textAlign": "center",
		});
	}
  	td.innerHTML = escaped;
  	return td;
};