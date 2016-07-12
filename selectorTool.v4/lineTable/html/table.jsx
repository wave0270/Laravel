/** @jsx React.DOM */

var renderTableSelector = React.createClass({
	
	render: function(){
		return(
			<table cellSpacing="0" id={this.props.data['tableName'] + "-tech-companies-1"} className="table active in table-small-font table-bordered table-striped"> 
  				<thead> 
  					<tr> 
  						<th>Name</th>
  						<th>Data</th> 
  					</tr>
  				</thead> 
  				<tbody>
  					 <renderArrSelector data={this.props.data}/>
  				</tbody> 
  			</table>
			);
	}
});

var renderArrSelector = React.createClass({
	render: function(){
		count = 1;
		var nodes = this.props.data['data'].map(function(item){
			return(
				<div>
					<tr className="indexContent">
  						<td colSpan="2" style={{textAlign:"left"}}>{count++}</td>
  					</tr>
  					<renderItemSelector item={item.element}/>
				</div>
			);
		});
		return(<div>{nodes}</div>);
	}
});
var renderItemSelector = React.createClass({
	render: function(){
		var nodes = this.props.item.map(function(item){
			
			data = item.data;
			if(item.data.slice(-5) == '.html'){ data = String.format('<a href="{0}" target="_blank">{0}</a>', data); }
			if($.inArray( item.data.slice(-4), [ ".jpg", ".JPG", '.png', ".PNG", ".gif", ".GIF" ] ) == 0){
				data = String.format('<img style="height:50px; max-width:100px;" src="{0}"></img><br />{0}',data);
			}
			
			return(
				<div>
					<tr>
						<td>{item.name}</td>
						<td><div dangerouslySetInnerHTML={{__html: data}}></div></td>
					</tr>
				</div>
			);
		});
		return(<div>{nodes}</div>);
	}
});
