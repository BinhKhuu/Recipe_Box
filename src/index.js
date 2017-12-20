import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class RecipyData extends React.Component {
	render() {
		return (
			<tr className='recipy-data' style={{display:this.props.display}}><td><a className='accordian-toggle' data-toggle='collapse'>hi</a></td></tr>
		)
	}
}

class RecipyListItem extends React.Component {
	render() {
		return (
			<tr>
				<td className ='list-item' onClick={this.props.show}>{this.props.title}</td>
				<td><button onClick={this.props.remove}>delete</button></td>
			</tr>
		)
	}
}

class RecipyList extends React.Component {
	constructor (){
		super();
		this.state = {
			recipyList: ['o hai', 'mark'],
			recipyData: ['none','none']
			//can have array that tracks which items are hidden and when are dispalyed for the RecipyData
		}
		this.removeRecipy = this.removeRecipy.bind(this);
		this.addRecipy = this.addRecipy.bind(this);
		this.showRecipy = this.showRecipy.bind(this);
	}
	addRecipy(index) {
		var rows = this.state.recipyList
		rows.push('new');
		//add recipydata array aswell
		this.setState({recipyList:rows })
	}
	removeRecipy(index) {
		var list = this.state.recipyList;
		list.splice(index,1);
		this.setState({recipyList: list});		
	}
	showRecipy(index) {
		var display = this.state.recipyData;
		var toggle = (display[index] === 'none') ? '' : 'none';
		display.splice(index,1);
		display.splice(index,0,toggle);
		this.setState({recipyData:display});
	}
	render() {
		return (
			<div className='background'>
				<table className='table'>
					<thead>
						<tr className='thead-light'>
							<th scope='col' width='90%' >Recipy</th>
							<th scope='col' width='10%'></th>
						</tr>
					</thead>
					<tbody>
						{this.state.recipyList.map((x,i)=> {
							return ([
								<RecipyListItem className='recipy-data' show={this.showRecipy.bind(this, i)} key={i} title={this.state.recipyList[i]} remove={this.removeRecipy.bind(this, i)} />,
								<RecipyData key={'row-expanded-' + i} display={this.state.recipyData[i]}/>
								])
						})}				
					</tbody>
				</table>
				<button onClick={this.addRecipy}>add</button>
			</div>
		);
	}
}

ReactDOM.render(
  <RecipyList />,
    document.getElementById('root')
);