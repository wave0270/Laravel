/** @jsx React.DOM */

var renderLineTable = React.createClass({
	render: function(){
		return(
				<table data-role='table' id='visualUnitListTable' data-mode='columntoggle' className='ui-body-b ui-shadow table-stripe ui-responsive' data-column-btn-mini='true' data-column-btn-text='Columns to Display' data-column-btn-theme='c' data-column-popup-theme='a' >
					<thead>
						<renderTitleArr titleArr={this.props.data['titleArr']}/>
					</thead>
					<tbody>
						<renderDataArr dataArr={this.props.data['dataArr']}/>
					</tbody>
				</table>
			);
	}
});

var renderTitleArr = React.createClass({
	
	render: function(){
		var count = 0;
		col = 1;
		var nodes = this.props.titleArr.map(function(item){
			return( <th id={"data-priority=" + count++  }>{item.name}</th> );
			
		});
		return(<tr> {nodes}</tr>);
	}
});
var renderDataArr = React.createClass({
	render: function(){
		var nodes = this.props.dataArr.map(function(item){
			return(<renderItemDataArr element={item.element}/>);
		});
		return(<div> {nodes}</div>);
	}
});

var renderItemDataArr = React.createClass({
	render: function(){
		count = 1;
		var nodes = this.props.element.map(function(item){
			return(<td><div dangerouslySetInnerHTML={{__html: item.data}}></div></td> );
		});
		return(<tr> {nodes}</tr>);
	}
});