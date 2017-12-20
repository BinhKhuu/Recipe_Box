import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class RecipyData extends React.Component {

}

class RecipyListItem extends React.Component {
	render() {
		return (
			<tr className ='recipy-data' onClick={this.props.show}>
				<td>{this.props.title}</td>
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
		}
		this.removeRecipy = this.removeRecipy.bind(this);
		this.addRecipy = this.addRecipy.bind(this);
		this.showRecipy = this.showRecipy.bind(this);
	}
	addRecipy(index) {
		var rows = this.state.recipyList
		rows.push('new');
		this.setState({recipyList:rows })
		console.log(this.state.recipyList);
	}
	removeRecipy(index) {
		var list = this.state.recipyList;
		list.splice(index,1);
		this.setState({recipyList: list});		
	}
	showRecipy(index) {
		console.log(index)
	}
	render() {
		return (
			<div className='background'>
				<table className='table'>
					<thead>
						<tr className='thead-light'>
							<th scope='col' width='90%' >Recipy</th>
							<th scop='col' width='10%'></th>
						</tr>
					</thead>
					<tbody>
						{this.state.recipyList.map((x,i)=> {
							return <RecipyListItem className='recipy-data' show={this.showRecipy.bind(this, i)} key={i} title={this.state.recipyList[i]} remove={this.removeRecipy.bind(this, i)} />
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
