/** @jsx React.DOM */

var renderLineTable = React.createClass({
	render: function(){
		return(
               <table cellspacing="0" id={this.props.data['tableName'] + "-tech-companies-1" } className="table table-small-font table-bordered table-striped">
	      			 <thead>
			             <renderTitleArr tableName={this.props.data['tableName']} titleArr={this.props.data['titleArr']}/>
			          </thead>
			          <tbody>
			          	 <renderDataArr data={this.props.data}/>
			          </tbody>
	      		</table>
			);
	}
});

var renderTitleArr = React.createClass({
	
	render: function(){
		var count = 0;
		col = 1;
		tableName = this.props.tableName;
		var nodes = this.props.titleArr.map(function(item){
			if(count == 0 ){
				return( <th id={tableName + "-tech-companies-1-col-" + count++  }>{item.name}</th> );
			}else if(count % 2 == 0){
				return( <th data-priority="6" id={tableName + "-tech-companies-1-col-" + count++  }>{item.name}</th> );
			}else {
				return( <th data-priority="3" id={tableName + "-tech-companies-1-col-" + count++  }>{item.name}</th> );
			}
			
		});
		return(<tr> {nodes}</tr>);
	}
});

var renderDataArr = React.createClass({
	render: function(){
		var nodes = this.props.data['dataArr'].map(function(item){
			return(<renderItemDataArr element={item.element}/>);
		});
		return(<div> {nodes}</div>);
	}
});
var renderItemDataArr = React.createClass({
	render: function(){
		count = 1;
		var nodes = this.props.element.map(function(item){
			data = item.data;
			if(item.data.slice(-5) == '.html'){ data = String.format('<a href="{0}" target="_blank">{0}</a>', data); }
			if($.inArray( item.data.slice(-4), [ ".jpg", ".JPG", '.png', ".PNG", ".gif", ".GIF" ] ) == 0){
				data = String.format('<img style="height:50px; max-width:100px;" src="{0}"></img><br />{0}',data);
			}
			
			if(count == 1 ){
				return(<td colspan="1" data-columns={"tech-companies-1-col-" + count++}><div dangerouslySetInnerHTML={{__html: data}}></div></td> );
			}else if(count % 2 != 0){
				return(<td data-priority="6" colspan="1" data-columns={"tech-companies-1-col-" + count++}><div dangerouslySetInnerHTML={{__html: data}}></div></td> );
			}else{
				return(<td data-priority="3" colspan="1" data-columns={"tech-companies-1-col-" + count++}><div dangerouslySetInnerHTML={{__html: data}}></div></td> );
			}
		});
		return(<tr> {nodes}</tr>);
	}
});